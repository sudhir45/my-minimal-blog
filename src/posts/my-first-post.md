---
layout: post.njk {# Use the post layout #}
title: My First Blog Post
date: 2025-04-10 # Or use "git Last Modified" in Eleventy config for auto-dates
description: A short summary of this post for SEO and previews.
tags: ["introduction", "tech"] # Optional tags
# Add other metadata like featured images if needed
---

## Introduction

This is my first post on my new blog! It's built using **Eleventy**.

### Features Supported

*   Lists
*   **Bold** and *Italic* text
*   `Inline code`
*   [Links](https://example.com)
*   Images:
    ![Example Alt Text](/assets/placeholder.jpg) <!-- Store images in src/assets -->

```javascript
// Code blocks work too
function greet(name) {
  console.log(`Hello, ${name}!`);
}

/*You can embed content using standard HTML <iframe> tags if needed, for example, YouTube videos:
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Supports all standard HTML media like <audio>, <video>.*/
