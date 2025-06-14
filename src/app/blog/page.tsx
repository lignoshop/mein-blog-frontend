'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  documentId: string;
  Text: string;
  Content: string;
  Date: string;
  excerpt?: string | null;
  Bild?: {
    url: string;
    alternativeText?: string;
  } | null;
  category?: {
    name: string;
    color: string;
  } | null;
  tags?: Array<{
    name: string;
  }>;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        // Mit populate=* um alle Relationen zu laden
        const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // API-Daten zu unserem Interface mappen
        const mappedPosts = data.data.map((post: any) => ({
          id: post.id,
          documentId: post.documentId,
          Text: post.Text,
          Content: post.Content,
          Date: post.Date,
          excerpt: post.excerpt,
          Bild: post.Bild ? {
            url: `https://api.brocki.net${post.Bild.url}`,
            alternativeText: post.Bild.alternativeText
          } : null,
          category: post.category ? {
            name: post.category.name,
            color: post.category.color || '#8B5CF6'
          } : null,
          tags: post.tags || []
        }));
        
        setPosts(mappedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
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
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            🚀 Brocki.net Blog
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Neueste Artikel und Updates</p>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '8px' }}>{posts.length} Blog-Posts gefunden</p>
        </header>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '32px' 
          }}>
            {posts.map((post) => (
              <article 
                key={post.id} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                {/* Bild */}
                {post.Bild && (
                  <div style={{ 
                    width: '100%', 
                    height: '200px', 
                    overflow: 'hidden',
                    backgroundColor: '#f3f4f6'
                  }}>
                    <img 
                      src={post.Bild.url} 
                      alt={post.Bild.alternativeText || post.Text}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                )}
                
                {/* Content */}
                <div style={{ padding: '24px' }}>
                  {/* Kategorie Badge */}
                  {post.category && (
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{
                        backgroundColor: post.category.color,
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {post.category.name}
                      </span>
                    </div>
                  )}

                  {/* Titel */}
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: '#111827',
                    lineHeight: '1.3'
                  }}>
                    {post.Text}
                  </h2>
                  
                  {/* Excerpt */}
                  {post.excerpt && (
                    <p style={{
                      color: '#6b7280',
                      marginBottom: '16px',
                      fontSize: '0.875rem',
                      lineHeight: '1.6'
                    }}>
                      {post.excerpt}
                    </p>
                  )}
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          style={{
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            marginRight: '6px',
                            marginBottom: '4px',
                            display: 'inline-block'
                          }}
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Datum */}
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                    borderTop: '1px solid #f3f4f6',
                    paddingTop: '16px'
                  }}>
                    📅 {new Date(post.Date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
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

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Powered by Strapi & Next.js • API Status: ✅ Connected
          </p>
        </footer>
      </div>
    </div>
  );
}
