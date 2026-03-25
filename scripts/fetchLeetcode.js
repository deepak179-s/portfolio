const fs = require('fs');
const https = require('https');

async function fetchGraphQL(query, variables) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({ query, variables });
        const options = {
            hostname: 'leetcode.com',
            port: 443,
            path: '/graphql',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://leetcode.com',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error('Failed to parse JSON: ' + data));
                    }
                } else {
                    reject(new Error('HTTP Error: ' + res.statusCode + ' ' + data));
                }
            });
        });

        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

async function main() {
    try {
        const username = "deepak0179";
        
        // 1. Solved Problems
        const qSolved = `query userProblemsSolved($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } } }`;
        const solvedRes = await fetchGraphQL(qSolved, { username });
        const allSolved = solvedRes.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(d => d.difficulty === "All")?.count || 0;
        
        // 2. Contest Rating
        const qContest = `query userContestRankingInfo($username: String!) { userContestRanking(username: $username) { rating topPercentage } }`;
        const contestRes = await fetchGraphQL(qContest, { username });
        const rating = contestRes.data?.userContestRanking?.rating || 0;
        const topPercentage = contestRes.data?.userContestRanking?.topPercentage || 0;

        // 3. Calendar
        const qCal = `query userProfileCalendar($username: String!) { matchedUser(username: $username) { userCalendar { submissionCalendar } } }`;
        const calRes = await fetchGraphQL(qCal, { username });
        const submissionCalendar = calRes.data?.matchedUser?.userCalendar?.submissionCalendar || "{}";

        const responseData = {
            userData: { solvedProblem: allSolved },
            contestData: { contestRating: rating, contestTopPercentage: topPercentage },
            calData: { submissionCalendar }
        };

        fs.writeFileSync("./src/data/leetcode-cache.json", JSON.stringify(responseData, null, 2));
        console.log("LeetCode cache populated successfully!");
        console.log(JSON.stringify(responseData));
    } catch (error) {
        console.error("Failed to populate:", error);
    }
}

main();
