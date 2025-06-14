export const runtime = 'edge';

interface BlogPost {
  id: number;
  attributes: {
    Text?: string;
    Date?: string;
    excerpt?: string;
  };
}

// Statische Posts (als Fallback)
const staticPosts: BlogPost[] = [
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

// Main Page Component
export default function BlogPage() {
  const posts = staticPosts;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        🚀 Brocki.net Blog
      </h1>
      
      <div style={{ 
        backgroundColor: '#dcfce7',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '8px',
        color: '#16a34a',
        textAlign: 'center'
      }}>
        ✅ {posts.length} Posts geladen • Statische Version für Mobile 📱
      </div>

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
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Statische Version • Funktioniert auf Desktop + Mobile ✅
      </div>
    </div>
  );
}
