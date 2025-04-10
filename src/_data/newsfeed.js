// src/_data/newsfeeds.js
const EleventyFetch = require("@11ty/eleventy-fetch");
const Parser = require('rss-parser');
const parser = new Parser();

// List of RSS feeds to fetch
const FEED_URLS = [
  "https://feeds.feedburner.com/TheHackersNews", // Example: The Hacker News
  "https://www.bleepingcomputer.com/feed/",       // Example: Bleeping Computer
  // Add more feeds here
];

// Limit the number of items per feed and total items
const MAX_ITEMS_PER_FEED = 5;
const MAX_TOTAL_ITEMS = 15;

module.exports = async function() {
  console.log("Fetching news feeds...");
  let allItems = [];

  for (const feedUrl of FEED_URLS) {
    try {
      // Use EleventyFetch for caching (fetches once per build unless cache expires)
      // Cache duration: e.g., "1h" for 1 hour, "1d" for 1 day
      let feedContent = await EleventyFetch(feedUrl, {
        duration: "4h", // Cache for 4 hours
        type: "text"    // Fetch as text to parse with rss-parser
      });

      let feed = await parser.parseString(feedContent);
      console.log(`Fetched ${feed.items.length} items from ${feed.title || feedUrl}`);

      // Add source title and limit items per feed
      feed.items.slice(0, MAX_ITEMS_PER_FEED).forEach(item => {
        allItems.push({
          title: item.title,
          link: item.link,
          pubDate: item.isoDate ? new Date(item.isoDate) : (item.pubDate ? new Date(item.pubDate) : new Date()), // Standardize date
          sourceTitle: feed.title || new URL(item.link).hostname, // Add source website title
          snippet: item.contentSnippet || item.content?.substring(0, 150) || "" // Get a snippet
        });
      });

    } catch (error) {
      console.error(`Error fetching or parsing feed ${feedUrl}:`, error.message);
    }
  }

  // Sort all combined items by date, newest first
  allItems.sort((a, b) => b.pubDate - a.pubDate);

  // Limit the total number of items
  return allItems.slice(0, MAX_TOTAL_ITEMS);
};