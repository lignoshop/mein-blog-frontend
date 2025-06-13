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
  let debugInfo = '';

  try {
    const apiUrl = 'http://128.140.68.0/api/blog-posts';
    debugInfo += `Trying to fetch: ${apiUrl}\n`;
    
    // API-Call zu deinem Strapi Server
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'CloudflarePages/1.0',
      },
      cache: 'no-store' // Immer frische Daten
    });
    
    debugInfo += `Response status: ${response.status}\n`;
    debugInfo += `Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}\n`;
    
    if (!response.ok) {
      const errorText = await response.text();
      debugInfo += `Error response body: ${errorText}\n`;
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }
    
    const data: StrapiResponse = await response.json();
    posts = data.data;
    debugInfo += `Successfully loaded ${posts.length} posts\n`;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unbekannter Fehler';
    console.error('Fehler beim Laden der Posts:', err);
    debugInfo += `Error: ${error}\n`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Mein Blog
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Fehler:</strong> {error}
        </div>
      )}
      
      {/* Debug-Informationen */}
      <details className="mb-6 p-4 bg-gray-100 rounded">
        <summary className="cursor-pointer font-bold">Debug-Informationen</summary>
        <pre className="mt-2 text-xs overflow-auto">{debugInfo}</pre>
      </details>
      
      {posts.length === 0 && !error && (
        <p className="text-center text-gray-600">Keine Blog-Posts gefunden.</p>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              {post.Text}
            </h2>
            
            <div className="text-gray-600 mb-4">
              {post.Content}
            </div>
            
            <div className="text-sm text-gray-500 border-t pt-3">
              <p>📅 Datum: {new Date(post.Date).toLocaleDateString('de-DE')}</p>
              <p>🕒 Veröffentlicht: {new Date(post.publishedAt).toLocaleDateString('de-DE')}</p>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          ← Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}