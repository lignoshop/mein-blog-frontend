'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  documentId: string;
  Text: string;
  Content: string;
  Date: string;
  excerpt?: string | null;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('https://api.brocki.net/api/blog-posts');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setPosts(data.data || []);
      } catch (err) {
        setError('Fehler beim Laden der Blog-Posts');
      } finally {
        setLoading(false);
      }
    }
    setTimeout(loadPosts, 100);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
          <p>Lade Blog-Posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '16px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>Fehler</h2>
          <p style={{ marginBottom: '16px' }}>{error}</p>
          <button onClick={() => window.location.reload()} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '48px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            🚀 Brocki.net Blog
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Neueste Artikel und Updates</p>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '8px' }}>{posts.length} Blog-Posts gefunden</p>
        </header>

        {posts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {posts.map((post) => (
              <article key={post.id} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px', transition: 'box-shadow 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'; }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>
                  {post.Text}
                </h2>
                {post.excerpt && (
                  <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {post.excerpt}
                  </p>
                )}
                <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '16px' }}>
                  📅 {new Date(post.Date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div style={{ paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: '0.75rem', color: '#d1d5db' }}>
                    ID: {post.documentId?.slice(0, 8)}...
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📝</div>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Keine Blog-Posts vorhanden.</p>
          </div>
        )}

        <footer style={{ textAlign: 'center', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Powered by Strapi & Next.js • API Status: ✅ Connected</p>
        </footer>
      </div>
    </div>
  );
}
