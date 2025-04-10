---
layout: base.njk
title: Blog Archive
permalink: /posts/ # Explicitly set the URL
eleventyNavigation: # Optional: for dynamic navigation menus if you build one
  key: Blog
  order: 2
---

# Blog Posts

<ul>
{%- for post in collections.posts -%} {# Loop through all posts (already sorted by date in config) #}
  <li>
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <p class="post-meta">
        <time datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate }}</time>
    </p>
    {% if post.data.description %}
        <p>{{ post.data.description }}</p>
    {% endif %}
  </li>
{%- endfor -%}
</ul>