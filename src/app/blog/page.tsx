'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  Text: string;
  Date: string;
  excerpt?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*');
        const data = await response.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error('Loading error:', error);
        setError('Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    }
    
    // Längere Verzögerung für Mobile
    setTimeout(loadPosts, 1000);
  }, []);

  // Simple Mobile-First Styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '100%',
      margin: '0 auto',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '30px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '10px'
    },
    postCard: {
      backgroundColor: 'white',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    postTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#111827'
    },
    postDate: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '10px'
    },
    postExcerpt: {
      fontSize: '0.875rem',
      color: '#374151',
      lineHeight: '1.5'
    },
    loader: {
      textAlign: 'center' as const,
      padding: '50px',
      fontSize: '1.2rem'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          <div>🔄</div>
          <div>Lade Blog-Posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          <div>❌</div>
          <div>{error}</div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 Brocki.net Blog</h1>
        <p style={{ color: '#6b7280' }}>Neueste Artikel und Updates</p>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
          {posts.length} Blog-Posts gefunden
        </p>
      </header>

      {posts.map((post) => (
        <article key={post.id} style={styles.postCard}>
          <h2 style={styles.postTitle}>{post.Text}</h2>
          <div style={styles.postDate}>
            📅 {new Date(post.Date).toLocaleDateString('de-DE')}
          </div>
          {post.excerpt && (
            <p style={styles.postExcerpt}>{post.excerpt}</p>
          )}
        </article>
      ))}

      <footer style={{ textAlign: 'center', marginTop: '40px', padding: '20px' }}>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
          Powered by Strapi & Next.js
        </p>
      </footer>
    </div>
  );
}
