---
layout: base.njk
title: Home
description: Welcome to my minimalist blog.
permalink: / # Set the URL for the home page
---

# Welcome!

This is the home page of my blog. Check out the latest [posts](/posts/) or learn more [about me](/about/).

## Recent Posts
<ul>
{%- for post in collections.posts | reverse | slice(0, 5) -%} {# Show latest 5 posts #}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> - <time datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate }}</time>
  </li>
{%- endfor -%}
</ul>