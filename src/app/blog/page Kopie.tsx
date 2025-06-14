// src/app/blog/page.tsx
import Link from 'next/link';

export const runtime = 'edge';

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface BlogPost {
  id: number;
  documentId: string;
  Text: string;
  slug: string;
  excerpt: string;
  Content: string;
  Date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: Category;
  tags: Tag[];
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
    const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*', {
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
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #dbeafe 100%)'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #4f46e5 100%)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Mein Blog
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '1.5rem',
            opacity: '0.9',
            maxWidth: '600px',
            margin: '0 auto 1.5rem'
          }}>
            Gedanken, Ideen und Geschichten aus der digitalen Welt
          </p>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {posts.length} {posts.length === 1 ? 'Artikel' : 'Artikel'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {error && (
          <div style={{
            background: '#fef2f2',
            borderLeft: '4px solid #ef4444',
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '0 0.5rem 0.5rem 0'
          }}>
            <div style={{ fontWeight: '600', color: '#dc2626' }}>Fehler beim Laden der Artikel</div>
            <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#991b1b' }}>{error}</div>
          </div>
        )}
        
        {posts.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
              Noch keine Artikel
            </h3>
            <p style={{ color: '#6b7280' }}>
              Bald gibt es hier spannende Inhalte zu entdecken!
            </p>
          </div>
        )}
        
        {/* Blog Posts Grid */}
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
        }}>
          {posts.map((post) => (
            <article 
              key={post.id} 
              style={{
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Article Header */}
              <div style={{ padding: '1.5rem', paddingBottom: '1rem' }}>
                {/* Category & Date */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  {post.category ? (
                    <span 
                      style={{
                        backgroundColor: post.category.color || '#3b82f6',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}
                    >
                      {post.category.name}
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: '#6b7280',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Allgemein
                    </span>
                  )}
                  <time style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                    {new Date(post.Date).toLocaleDateString('de-DE')}
                  </time>
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3',
                  transition: 'color 0.3s ease'
                }}>
                  {post.Text}
                </h2>
                
                {/* Excerpt or Content Preview */}
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {post.excerpt || (post.Content.length > 150 
                    ? `${post.Content.substring(0, 150)}...` 
                    : post.Content)
                  }
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag.id}
                        style={{
                          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                          color: '#374151',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                        }}
                      >
                        #{tag.name}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: '500' }}>
                        +{post.tags.length - 3} mehr
                      </span>
                    )}
                  </div>
                )}

                {/* Read More Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    Weiterlesen
                  </button>
                  
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: '500' }}>
                    {Math.max(1, Math.ceil((post.excerpt || post.Content).split(' ').length / 200))} Min. Lesezeit
                  </span>
                </div>
              </div>

              {/* Article Footer */}
              <div style={{
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                padding: '1rem 1.5rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem'
                }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Veröffentlicht</span>
                  <time style={{ color: '#374151', fontWeight: '500' }} dateTime={post.publishedAt}>
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

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link 
            href="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}