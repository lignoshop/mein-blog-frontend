'use client';
import { useState } from 'react';

interface BlogPost {
  id: number;
  attributes: {
    Text?: string;
    Date?: string;
    excerpt?: string;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Direkter Button-Click statt useEffect
  const loadPosts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data.data || []);
      setLoading(false);
    } catch (err) {
      setError('Fehler beim Laden: ' + (err as Error).message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        🚀 Brocki.net Blog
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button 
          onClick={loadPosts}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          📱 Mobile Posts laden (ohne useEffect)
        </button>
      </div>

      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: 'lightyellow',
          marginBottom: '20px',
          borderRadius: '8px'
        }}>
          ⏳ Lade Posts...
        </div>
      )}

      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: '#fecaca',
          marginBottom: '20px',
          borderRadius: '8px',
          color: '#dc2626'
        }}>
          ❌ {error}
        </div>
      )}

      {posts.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '10px',
          backgroundColor: '#dcfce7',
          marginBottom: '20px',
          borderRadius: '8px',
          color: '#16a34a'
        }}>
          ✅ {posts.length} Posts erfolgreich geladen!
        </div>
      )}
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            marginBottom: '20px', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
              {post.attributes.Text || 'Kein Titel'}
            </h2>
            {post.attributes.Date && (
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
                📅 {new Date(post.attributes.Date).toLocaleDateString('de-DE')}
              </div>
            )}
            {post.attributes.excerpt && (
              <p style={{ color: '#333', lineHeight: '1.5' }}>
                {post.attributes.excerpt}
              </p>
            )}
          </div>
        ))}
        
        {/* Fallback statische Posts falls API nicht funktioniert */}
        {posts.length === 0 && !loading && !error && (
          <>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              marginBottom: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
                teste
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
                📅 12. Juni 2025
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              marginBottom: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
                Teste 4
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
                📅 13. Juni 2025
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              marginBottom: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
                2 Post strapi teste 3
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
                📅 12. Juni 2025
              </div>
              <p style={{ color: '#333', lineHeight: '1.5' }}>
                das ist die kurze beschreibung
              </p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              marginBottom: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
                Blog test 4
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
                📅 10. Juni 2025
              </div>
              <p style={{ color: '#333', lineHeight: '1.5' }}>
                das ist eine weiter Kurz beschreibung
              </p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              marginBottom: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
                teste 5
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
                📅 Kein Datum
              </div>
              <p style={{ color: '#333', lineHeight: '1.5' }}>
                kurztext
              </p>
            </div>
          </>
        )}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Mobile Test • Button-basiertes Laden
      </div>
    </div>
  );
}
