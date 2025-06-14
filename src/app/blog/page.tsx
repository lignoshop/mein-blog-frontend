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
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  // Test 1: Originale API
  const testOriginalAPI = async () => {
    setLoading(true);
    addTestResult('🔄 Test 1: Originale API...');
    
    try {
      const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*');
      addTestResult(`📡 Response Status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      addTestResult(`✅ Daten erhalten: ${data.data?.length || 0} Posts`);
      setPosts(data.data || []);
    } catch (err) {
      addTestResult(`❌ Fehler: ${(err as Error).message}`);
    }
    setLoading(false);
  };

  // Test 2: Direkt über Pages URL
  const testDirectAPI = async () => {
    setLoading(true);
    addTestResult('🔄 Test 2: Direct Pages API...');
    
    try {
      const response = await fetch('https://mein-blog-frontend-v2.pages.dev/api/test');
      addTestResult(`📡 Direct Response Status: ${response.status}`);
      addTestResult(`✅ Direct API erreichbar`);
    } catch (err) {
      addTestResult(`❌ Direct Fehler: ${(err as Error).message}`);
    }
    setLoading(false);
  };

  // Test 3: Simple HTTP Test
  const testSimpleHTTP = async () => {
    setLoading(true);
    addTestResult('🔄 Test 3: Simple HTTP...');
    
    try {
      const response = await fetch('https://httpbin.org/json');
      addTestResult(`📡 HTTP Status: ${response.status}`);
      const data = await response.json();
      addTestResult(`✅ HTTP Test erfolgreich`);
    } catch (err) {
      addTestResult(`❌ HTTP Fehler: ${(err as Error).message}`);
    }
    setLoading(false);
  };

  const clearTests = () => {
    setTestResults([]);
    setPosts([]);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        🚀 Mobile API Debug
      </h1>
      
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={testOriginalAPI}
            disabled={loading}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            Test 1: Original Strapi API
          </button>
          
          <button 
            onClick={testDirectAPI}
            disabled={loading}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            Test 2: Direct Pages
          </button>
          
          <button 
            onClick={testSimpleHTTP}
            disabled={loading}
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            Test 3: HTTP Test
          </button>
          
          <button 
            onClick={clearTests}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}
          >
            🗑️ Tests löschen
          </button>
        </div>
      </div>

      {/* Test Results */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>🔍 Test Ergebnisse:</h3>
        {testResults.length === 0 ? (
          <div style={{ color: '#666', fontStyle: 'italic' }}>
            Noch keine Tests durchgeführt
          </div>
        ) : (
          <div style={{ 
            fontFamily: 'monospace', 
            fontSize: '0.9rem',
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {testResults.map((result, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loaded Posts */}
      {posts.length > 0 && (
        <div style={{ 
          backgroundColor: '#dcfce7',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#16a34a', marginBottom: '10px' }}>
            ✅ {posts.length} Posts erfolgreich geladen!
          </h3>
          {posts.map((post, index) => (
            <div key={post.id} style={{ 
              backgroundColor: 'white',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              <strong>{post.attributes.Text || `Post ${index + 1}`}</strong>
              {post.attributes.Date && (
                <div style={{ color: '#666', fontSize: '0.8rem' }}>
                  {post.attributes.Date}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Mobile API Debug • Verschiedene Tests
      </div>
    </div>
  );
}
