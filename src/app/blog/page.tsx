'use client';

import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebug = (msg: string) => {
    console.log(msg);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  useEffect(() => {
    async function loadPosts() {
      try {
        addDebug('🔍 Starting API test...');
        addDebug(`🌍 Current URL: ${window.location.href}`);
        addDebug(`🔧 Environment: ${process.env.NODE_ENV || 'unknown'}`);
        
        const apiUrl = 'https://api.brocki.net/api/blog-posts';
        addDebug(`📡 Fetching: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        addDebug(`📊 Response status: ${response.status}`);
        addDebug(`📊 Response ok: ${response.ok}`);
        
        const responseText = await response.text();
        addDebug(`📄 Response length: ${responseText.length} chars`);
        addDebug(`📄 Response start: ${responseText.substring(0, 100)}...`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${responseText.substring(0, 200)}`);
        }
        
        const data = JSON.parse(responseText);
        addDebug(`✅ Parsed data: ${data.data?.length || 0} posts found`);
        setPosts(data.data || []);
        
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        addDebug(`❌ Error caught: ${errorMsg}`);
        setError(errorMsg);
      } finally {
        setLoading(false);
        addDebug('🏁 Loading finished');
      }
    }

    const timer = setTimeout(loadPosts, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>🔍 API Debug Test</h1>
        <div>🔄 Loading...</div>
        <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
          {debugInfo.map((info, i) => (
            <div key={i}>{info}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔍 API Debug Results</h1>
      
      {error ? (
        <div style={{ backgroundColor: '#fee', padding: '10px', border: '1px solid #fcc', marginBottom: '20px' }}>
          <h2>❌ Error:</h2>
          <div style={{ fontSize: '12px' }}>{error}</div>
        </div>
      ) : (
        <div style={{ backgroundColor: '#efe', padding: '10px', border: '1px solid #cfc', marginBottom: '20px' }}>
          <h2>✅ Success!</h2>
          <div>Posts loaded: {posts.length}</div>
        </div>
      )}

      <h3>📋 Debug Log:</h3>
      <div style={{ backgroundColor: '#f5f5f5', padding: '10px', fontSize: '12px', marginBottom: '20px' }}>
        {debugInfo.map((info, i) => (
          <div key={i}>{info}</div>
        ))}
      </div>

      {posts.length > 0 && (
        <div>
          <h3>📄 Posts Preview:</h3>
          <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontSize: '12px' }}>
            <pre>{JSON.stringify(posts.slice(0, 2), null, 2)}</pre>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => window.location.reload()}
        style={{ padding: '10px 20px', marginTop: '20px' }}
      >
        🔄 Reload Test
      </button>
    </div>
  );
}
