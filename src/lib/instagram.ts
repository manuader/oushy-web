/**
 * Reads the studio's own Instagram media through the Instagram Graph API.
 *
 * Meta shut the old Instagram Basic Display API down in December 2024, so this
 * goes through `graph.instagram.com` with a long-lived token obtained via
 * Instagram Login. That requires a Professional (Business or Creator) account.
 *
 * Every failure path returns an empty array rather than throwing: the feed is
 * decoration, and a missing token or a rate limit must never take the page
 * down or break the build.
 */

const GRAPH_VERSION = "v21.0";
const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";

/** Seconds before the cached response is refetched. */
const REVALIDATE = 3600;

export interface InstagramPost {
  id: string;
  permalink: string;
  imageUrl: string;
  caption: string;
  timestamp: string;
  isVideo: boolean;
}

interface GraphMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

/** First line of the caption, trimmed — used as the image's alt text. */
function toAlt(caption: string | undefined, fallbackIndex: number): string {
  const firstLine = caption?.split("\n")[0]?.trim();
  if (!firstLine) return `Publicación ${fallbackIndex + 1} de OUSHY Studio en Instagram`;
  return firstLine.length > 120 ? `${firstLine.slice(0, 117)}…` : firstLine;
}

export async function getInstagramPosts(limit = 10): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const url = new URL(`https://graph.instagram.com/${GRAPH_VERSION}/me/media`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE } });

    if (!response.ok) {
      // The token expiring is the expected failure here — long-lived tokens
      // last 60 days — so make it obvious in the logs rather than silent.
      console.error(
        `[instagram] ${response.status} ${response.statusText}: ${await response.text()}`,
      );
      return [];
    }

    const { data } = (await response.json()) as { data?: GraphMedia[] };
    if (!Array.isArray(data)) return [];

    return data
      .map((media, index) => {
        // Videos and reels only expose a poster frame; albums report the
        // first child as their media_url.
        const imageUrl = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
        if (!imageUrl) return null;

        return {
          id: media.id,
          permalink: media.permalink,
          imageUrl,
          caption: toAlt(media.caption, index),
          timestamp: media.timestamp,
          isVideo: media.media_type === "VIDEO",
        } satisfies InstagramPost;
      })
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, limit);
  } catch (error) {
    console.error("[instagram] fetch failed:", error);
    return [];
  }
}
