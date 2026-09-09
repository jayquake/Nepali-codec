import { instagramFollow, instagramPosts } from '../data/instagram';

function shortcode(url: string): { type: string; code: string } | null {
  const m = url.match(/\/(p|reel|tv)\/([^/?#]+)/);
  return m ? { type: m[1], code: m[2] } : null;
}

export function InstagramStrip() {
  if (instagramPosts.length === 0 && instagramFollow.length === 0) return null;

  return (
    <div style={{ marginBottom: 14 }}>
      <div className="section-title" style={{ marginTop: 4 }}>
        📸 From Instagram
      </div>

      {instagramFollow.length > 0 && (
        <div className="chips">
          {instagramFollow.map((f) => (
            <a
              key={f.url}
              className="chip"
              href={f.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {f.handle}
            </a>
          ))}
        </div>
      )}

      {instagramPosts.length > 0 && (
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
          {instagramPosts.map((url) => {
            const sc = shortcode(url);
            if (!sc) return null;
            return (
              <iframe
                key={url}
                src={`https://www.instagram.com/${sc.type}/${sc.code}/embed`}
                title="Instagram post"
                loading="lazy"
                scrolling="no"
                style={{
                  flex: '0 0 320px',
                  width: 320,
                  height: 430,
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  background: '#fff',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
