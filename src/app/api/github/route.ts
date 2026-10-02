import { NextResponse } from "next/server";

export async function GET() {
    const username = "deepak179-s";
    const token = process.env.GITHUB_TOKEN;

    try {
        if (token) {
            // Option B: Authenticated fetch using GraphQL
            const query = `
                {
                    viewer {
                        contributionsCollection {
                            contributionCalendar {
                                totalContributions
                            }
                        }
                        repositories(first: 100, ownerAffiliations: OWNER) {
                            totalCount
                            nodes {
                                stargazerCount
                            }
                        }
                    }
                }
            `;

            const res = await fetch("https://api.github.com/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query }),
                next: { revalidate: 3600 },
            });

            if (res.ok) {
                const json = await res.json();
                const viewer = json.data?.viewer;

                if (viewer) {
                    const repos = viewer.repositories.totalCount || 0;
                    const contributions = viewer.contributionsCollection.contributionCalendar.totalContributions || 0;
                    
                    // Sum up stars
                    const stars = viewer.repositories.nodes.reduce(
                        (acc: number, repo: any) => acc + (repo.stargazerCount || 0),
                        0
                    );

                    return NextResponse.json({ repos, stars, contributions });
                }
            } else {
                console.warn("GraphQL API failed, falling back to public APIs. Status:", res.status);
            }
        }

        // Fallback: Unauthenticated fetch (what was in the frontend previously)
        let repos = 0;
        let stars = 0;
        let contributions = 0;

        try {
            const userRes = await fetch(`https://api.github.com/users/${username}`);
            if (userRes.ok) {
                const userData = await userRes.json();
                repos = userData.public_repos || 0;
            }
        } catch (e) {
            console.warn("Public user fetch failed");
        }

        try {
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            if (reposRes.ok) {
                const reposData = await reposRes.json();
                if (Array.isArray(reposData)) {
                    stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                }
            }
        } catch (e) {
            console.warn("Public repos fetch failed");
        }

        try {
            const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
            if (contribRes.ok) {
                const contribData = await contribRes.json();
                contributions = contribData?.total?.lastYear || contribData?.total || 0;
            }
        } catch (e) {
            console.warn("Public contributions fetch failed");
        }

        return NextResponse.json({ repos, stars, contributions });

    } catch (error) {
        console.error("Internal Server Error in GitHub API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
