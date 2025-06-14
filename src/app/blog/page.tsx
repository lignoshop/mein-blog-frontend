'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  documentId: string;
  Text: string;
  Content: string;
  Date: string;
  excerpt: string | null;
  slug: string | null;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function loadPosts() {
      try {
        console.log('Loading posts...');
        
        // Erstmal ohne Token versuchen (da curl funktioniert)
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blog-posts`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Error response:', errorText);
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('API Data:', data);
        setPosts(data.data || []);
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [mounted]);

  // Don't render until mounted (fixes hydration)
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Blog-Posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md mx-auto text-center bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">❌ Fehler beim Laden</h2>
          <p className="text-gray-700 mb-4 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            🔄 Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Brocki.net Blog
          </h1>
          <p className="text-xl text-gray-600">
            Neueste Artikel und Updates
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {posts.length} Blog-Posts gefunden
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-600">
                  {post.Text}
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 text-sm">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="text-gray-500 text-sm mb-4">
                  📅 {new Date(post.Date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    ID: {post.documentId?.slice(0, 8)}...
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 text-lg">
              Keine Blog-Posts vorhanden.
            </p>
          </div>
        )}

        <footer className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Powered by Strapi & Next.js • API Status: ✅ Connected
          </p>
        </footer>
      </div>
    </div>
  );
}
