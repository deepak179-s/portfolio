import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define the path to our local cache file
const CACHE_FILE_PATH = path.join(process.cwd(), "src/data/leetcode-cache.json");

export async function GET() {
    try {
        const [userRes, contestRes, calRes] = await Promise.all([
            fetch("https://alfa-leetcode-api.onrender.com/deepak0179/solved", { next: { revalidate: 3600 } }),
            fetch("https://alfa-leetcode-api.onrender.com/deepak0179/contest", { next: { revalidate: 3600 } }),
            fetch("https://alfa-leetcode-api.onrender.com/deepak0179/calendar", { next: { revalidate: 3600 } })
        ]);

        if (!userRes.ok || !contestRes.ok || !calRes.ok) {
            console.error("LeetCode API returned an error:", userRes.status, contestRes.status, calRes.status);
            
            // On failure, try to serve data from our local cache
            try {
                const fallbackData = await fs.readFile(CACHE_FILE_PATH, "utf-8");
                return NextResponse.json(JSON.parse(fallbackData));
            } catch (fsError) {
                console.error("Failed to read fallback data:", fsError);
                return NextResponse.json({ error: "Failed to fetch from external API and no fallback available" }, { status: 502 });
            }
        }

        const userData = await userRes.json();
        const contestData = await contestRes.json();
        const calData = await calRes.json();

        const responseData = {
            userData,
            contestData,
            calData
        };

        // If the request was successful, save this fresh data to our cache file
        // so it can be used next time the API goes down
        try {
            // Ensure directory exists
            await fs.mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true });
            await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(responseData, null, 2));
        } catch (fsWriteError) {
            console.error("Failed to write to fallback cache:", fsWriteError);
        }

        return NextResponse.json(responseData);
    } catch (error) {
        console.error("Internal Server Error in LeetCode API route:", error);
        
        // Catch network errors (e.g., DNS issues) and fallback to cache
        try {
            const fallbackData = await fs.readFile(CACHE_FILE_PATH, "utf-8");
            return NextResponse.json(JSON.parse(fallbackData));
        } catch (fsError) {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }
}
