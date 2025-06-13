// src/app/blog/page.tsx
import Link from 'next/link';

export const runtime = 'edge';

interface BlogPost {
  id: number;
  documentId: string;
  Text: string;
  Content: string;
  Date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error = null;

  try {
    const response = await fetch('https://api.brocki.net/api/blog-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StrapiResponse = await response.json();
    posts = data.data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unbekannter Fehler';
    console.error('Fehler beim Laden der Posts:', err);
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #6366f1 100%)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Mein Blog
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            opacity: '0.9',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Gedanken, Ideen und Geschichten aus der digitalen Welt
          </p>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {posts.length} {posts.length === 1 ? 'Artikel' : 'Artikel'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
        {error && (
          <div style={{
            background: '#fef2f2',
            borderLeft: '4px solid #f87171',
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '0.5rem'
          }}>
            <strong style={{ color: '#dc2626' }}>Fehler:</strong>
            <span style={{ color: '#991b1b', marginLeft: '0.5rem' }}>{error}</span>
          </div>
        )}

        {posts.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Keine Blog-Posts gefunden.
            </p>
          </div>
        )}

        {/* Blog Grid */}
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
        }}>
          {posts.map((post, index) => (
            <article 
              key={post.id}
              style={{
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ padding: '2rem' }}>
                {/* Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 100%)',
                    color: '#4338ca',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    Artikel #{index + 1}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {new Date(post.Date).toLocaleDateString('de-DE')}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {post.Text}
                </h2>

                {/* Content */}
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {post.Content.length > 120 
                    ? `${post.Content.substring(0, 120)}...` 
                    : post.Content
                  }
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}>
                    Weiterlesen →
                  </button>
                  
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    {Math.max(1, Math.ceil(post.Content.split(' ').length / 200))} Min.
                  </span>
                </div>
              </div>

              {/* Post Footer */}
              <div style={{
                background: '#f9fafb',
                padding: '1rem 2rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  <span>Veröffentlicht</span>
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Back Button */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}