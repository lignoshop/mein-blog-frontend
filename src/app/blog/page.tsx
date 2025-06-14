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
  const [error, setError] = useState<string>('');
  const [debug, setDebug] = useState<string[]>([]);

  const addDebug = (msg: string) => {
    setDebug(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  useEffect(() => {
    async function loadPosts() {
      addDebug('Starting API call...');
      
      try {
        addDebug('Fetching from API...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        addDebug(`Response status: ${response.status}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        addDebug(`Got data: ${data.data?.length || 0} posts`);
        
        setPosts(data.data || []);
        setLoading(false);
        
      } catch (err) {
        addDebug(`Error: ${err instanceof Error ? err.message : 'Unknown'}`);
        
        // FALLBACK: Static test data for mobile
        const fallbackPosts = [
          { Text: 'Test Post 1', Date: '2025-06-14', excerpt: 'Mobile Fallback Test' },
          { Text: 'Test Post 2', Date: '2025-06-13', excerpt: 'API nicht erreichbar' },
          { Text: 'Test Post 3', Date: '2025-06-12', excerpt: 'Statische Daten' }
        ];
        
        setPosts(fallbackPosts);
        setError('API nicht erreichbar - Fallback-Daten');
        setLoading(false);
      }
    }

    // Kurze Verzögerung, dann versuchen
    setTimeout(loadPosts, 500);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>🚀 Brocki.net Blog</h1>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>Lade...</div>
        
        {/* Debug Info */}
        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
          <strong>Debug Log:</strong>
          {debug.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        🚀 Brocki.net Blog
      </h1>
      
      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>
          ⚠️ {error}
        </div>
      )}
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {posts.map((post, index) => (
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
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Posts: {posts.length} • Mobile Version
      </div>
      
      {/* Debug Info */}
      <details style={{ marginTop: '20px', fontSize: '12px' }}>
        <summary>Debug Info</summary>
        {debug.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </details>
    </div>
  );
}
