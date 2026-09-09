// Curated Instagram content for the News tab.
//
// A live #manaslu feed isn't possible from a static app (Instagram has no public
// API for it and scraping breaks their terms). Instead, paste specific PUBLIC post
// URLs below and they render as official Instagram embeds. Add "follow" links to
// point people at accounts or the hashtag.
//
// Edit this file anytime and push — the change deploys automatically.

/** Public Instagram post / reel permalinks, e.g. 'https://www.instagram.com/p/Cxxxxxxxxxx/'. */
export const instagramPosts: string[] = [
  // 'https://www.instagram.com/p/PASTE_SHORTCODE/',
];

/** Accounts or hashtags to link out to. */
export const instagramFollow: { handle: string; url: string }[] = [
  { handle: '#manaslu', url: 'https://www.instagram.com/explore/tags/manaslu/' },
  { handle: '#manaslucircuit', url: 'https://www.instagram.com/explore/tags/manaslucircuit/' },
];
