import { NextResponse } from "next/server";
import { memoryClient } from "@/lib/chat";
import * as cheerio from "cheerio";
import { parseStringPromise } from "xml2js";

export async function GET() {
  try {
    console.log("Starting sitemap fetch from localhost:3000...");

    // Fetch the sitemap
    const sitemapRes = await fetch("http://localhost:3000/sitemap.xml");
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
    }

    const xml = await sitemapRes.text();
    const result = await parseStringPromise(xml);

    const urls: string[] = result.urlset.url.map(
      (u: { loc: string[] }) => u.loc[0],
    );
    console.log(`Found ${urls.length} URLs in sitemap.`);

    const ingestedData = [];

    for (const url of urls) {
      // Convert live URL to localhost for crawling
      const localUrl = url.replace(
        "https://www.shivamtaneja.com",
        "http://localhost:3000",
      );
      console.log(`Fetching ${localUrl}...`);

      try {
        const pageRes = await fetch(localUrl);
        if (!pageRes.ok) {
          console.error(`Failed to fetch ${localUrl}: ${pageRes.status}`);
          continue;
        }

        const html = await pageRes.text();
        const $ = cheerio.load(html);

        // Remove noisy elements
        $("script, style, nav, footer, header, noscript, iframe").remove();

        // Extract main text content
        // Focus on main content area if possible, otherwise use body
        const mainContent = $("main").length ? $("main") : $("body");

        // Get text and clean up whitespace
        let text = mainContent.text();
        text = text.replace(/\s+/g, " ").trim();

        if (text) {
          console.log(
            `Ingesting content for ${url} (${text.substring(0, 50)}...)`,
          );

          // Add to Mem0
          await memoryClient.add(
            [
              {
                role: "user",
                content: `Here is information about Shivam Taneja from the page ${url}: \n\n${text}`,
              },
            ],
            {
              user_id: "shivam_portfolio",
              metadata: { source: url, type: "website_content" },
            },
          );

          ingestedData.push({
            url,
            contentLength: text.length,
          });
        }
      } catch (err) {
        console.error(`Error processing ${localUrl}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ingested ${ingestedData.length} pages into Mem0`,
      details: ingestedData,
    });
  } catch (error) {
    console.error("Failed to process sitemap ingestion:", error);
    return NextResponse.json(
      { error: "Failed to process sitemap ingestion", details: String(error) },
      { status: 500 },
    );
  }
}
