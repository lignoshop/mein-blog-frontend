'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  Text?: string;
  Date?: string;
  excerpt?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SOFORT laden, kein setTimeout
    fetch('https://api.brocki.net/api/blog-posts?populate=*')
      .then(response => response.json())
      .then(data => {
        setPosts(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <h1 style={{ marginBottom: '20px' }}>🚀 Brocki.net Blog</h1>
        <div>Lade...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        🚀 Brocki.net Blog
      </h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Keine Posts gefunden</p>
            <button 
              onClick={() => window.location.reload()}
              style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px' }}
            >
              Neu laden
            </button>
          </div>
        ) : (
          posts.map((post, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              marginBottom: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
                {post.Text || `Post ${index + 1}`}
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
                📅 {post.Date ? new Date(post.Date).toLocaleDateString('de-DE') : 'Kein Datum'}
              </div>
              {post.excerpt && (
                <p style={{ color: '#333', lineHeight: '1.5' }}>{post.excerpt}</p>
              )}
            </div>
          ))
        )}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Posts: {posts.length} • Mobile Version
      </div>
    </div>
  );
}
