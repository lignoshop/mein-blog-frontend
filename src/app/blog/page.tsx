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
    const response = await fetch('https://api.brocki.net/api/blog-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Mein Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Gedanken, Ideen und Geschichten aus der digitalen Welt
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium">
                {posts.length} {posts.length === 1 ? 'Artikel' : 'Artikel'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-12 bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-red-800 font-medium">Fehler beim Laden der Artikel</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {posts.length === 0 && !error && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Noch keine Artikel</h3>
            <p className="mt-2 text-gray-500">Bald gibt es hier spannende Inhalte zu entdecken!</p>
          </div>
        )}
        
        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Post Header */}
              <div className="p-8">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
                    Artikel #{index + 1}
                  </span>
                  <div className="text-sm text-gray-500">
                    {new Date(post.Date).toLocaleDateString('de-DE')}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {post.Text}
                </h2>
                
                {/* Content Preview */}
                <div className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {post.Content.length > 120 
                    ? `${post.Content.substring(0, 120)}...` 
                    : post.Content
                  }
                </div>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-all duration-300">
                    Weiterlesen
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  {/* Reading time estimate */}
                  <span className="text-sm text-gray-400">
                    {Math.max(1, Math.ceil(post.Content.split(' ').length / 200))} Min.
                  </span>
                </div>
              </div>

              {/* Post Footer */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Veröffentlicht</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}