const { DateTime } = require("luxon"); // For date formatting

module.exports = function(eleventyConfig) {

  // --- Passthrough Copy ---
  // Copy static assets like CSS, JS, images directly to the output folder
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets"); // For images, fonts etc.

  // --- Collections ---
  // Create a collection of blog posts sorted by date
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md").sort((a, b) => {
      return b.date - a.date; // Sort descending (newest first)
    });
  });

  // --- Filters ---
  // Format dates nicely
  eleventyConfig.addFilter("readableDate", dateObj => {
    // Check if dateObj is valid before formatting
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLLL yyyy");
  });
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // --- Shortcodes ---
  // Example: Get current year for footer
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // --- Markdown Options ---
  // Add support for Markdown features like footnotes, etc. if needed
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor"); // Optional: For heading links
  let options = {
    html: true, // Enable HTML tags in source
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true // Autoconvert URL-like text to links
  };
  eleventyConfig.setLibrary("md", markdownIt(options)
    // .use(markdownItAnchor, { // Optional anchor plugin options
    //   permalink: markdownItAnchor.permalink.ariaHidden({
    //     placement: "after",
    //     class: "direct-link",
    //     symbol: "#"
    //   }),
    //   level: [1,2,3,4],
    //   slugify: eleventyConfig.getFilter("slugify") // Use Eleventy's slugify filter
    // })
  );

  // --- Base Config ---
  return {
    dir: {
      input: "src",       // Source directory
      output: "_site",    // Output directory (GitHub Pages default)
      includes: "_includes", // Reusable template parts
      layouts: "_layouts",  // Base page layouts
      data: "_data"       // Global data files
    },
    markdownTemplateEngine: "njk", // Use Nunjucks for Markdown files
    htmlTemplateEngine: "njk",     // Use Nunjucks for HTML files
    templateFormats: ["md", "njk", "html"] // Process these file types
  };
};

// .eleventy.js
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  // ... other config ...

  // Sitemap Plugin
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME", // CHANGE THIS!
    },
  });

  // ... rest of config ...
};

// .eleventy.js
module.exports = function(eleventyConfig) {
  // ...
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  // ...
}