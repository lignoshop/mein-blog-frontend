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

  try {
    // API-Call zu deinem Strapi Server
    const response = await fetch('https://api.brocki.net/api/blog-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store' // Immer frische Daten
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Mein Blog
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Fehler:</strong> {error}
        </div>
      )}
      
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