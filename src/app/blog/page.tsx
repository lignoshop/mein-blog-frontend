import { Suspense } from 'react';

interface BlogPost {
  id: number;
  attributes: {
    Text?: string;
    Date?: string;
    excerpt?: string;
  };
}

interface BlogData {
  data: BlogPost[];
}

// Server-Side Component
async function BlogPosts() {
  let posts: BlogPost[] = [];
  let error = '';

  try {
    // Fetch direkt server-side
    const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*', {
      cache: 'no-store' // Immer fresh data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data: BlogData = await response.json();
    posts = data.data || [];
  } catch (err) {
    error = `Fehler beim Laden: ${(err as Error).message}`;
    
    // Fallback zu statischen Posts
    posts = [
      {
        id: 1,
        attributes: {
          Text: 'teste',
          Date: '2025-06-12',
          excerpt: ''
        }
      },
      {
        id: 2,
        attributes: {
          Text: 'Teste 4',
          Date: '2025-06-13',
          excerpt: ''
        }
      },
      {
        id: 3,
        attributes: {
          Text: '2 Post strapi teste 3',
          Date: '2025-06-12',
          excerpt: 'das ist die kurze beschreibung'
        }
      },
      {
        id: 4,
        attributes: {
          Text: 'Blog test 4',
          Date: '2025-06-10',
          excerpt: 'das ist eine weiter Kurz beschreibung'
        }
      },
      {
        id: 5,
        attributes: {
          Text: 'teste 5',
          Date: '',
          excerpt: 'kurztext'
        }
      }
    ];
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {error && (
        <div style={{ 
          backgroundColor: '#fecaca',
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '8px',
          color: '#dc2626'
        }}>
          ⚠️ {error} (Fallback zu statischen Posts)
        </div>
      )}
      
      <div style={{ 
        backgroundColor: '#dcfce7',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '8px',
        color: '#16a34a'
      }}>
        ✅ {posts.length} Posts geladen • Server-Side Rendering 🚀
      </div>

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
    </div>
  );
}

// Loading Component
function BlogLoading() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        backgroundColor: 'lightyellow',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        ⏳ Lade Blog-Posts...
      </div>
      
      {[1,2,3,4,5].map((i) => (
        <div key={i} style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            backgroundColor: '#d1d5db',
            height: '20px',
            marginBottom: '10px',
            borderRadius: '4px'
          }}></div>
          <div style={{ 
            backgroundColor: '#e5e7eb',
            height: '14px',
            marginBottom: '10px',
            borderRadius: '4px',
            width: '60%'
          }}></div>
        </div>
      ))}
    </div>
  );
}

// Main Page Component
export default function BlogPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        🚀 Brocki.net Blog
      </h1>
      
      <Suspense fallback={<BlogLoading />}>
        <BlogPosts />
      </Suspense>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Server-Side Rendering • Mobile Compatible ✅
      </div>
    </div>
  );
}
