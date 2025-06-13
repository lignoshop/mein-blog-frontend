// src/app/blog/page.tsx
import Link from 'next/link';

export const runtime = 'edge';

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface BlogPost {
  id: number;
  documentId: string;
  Text: string;
  slug: string;
  excerpt: string;
  Content: string;
  Date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: Category;
  tags: Tag[];
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
    const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*', {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Mein Blog
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Gedanken, Ideen und Geschichten aus der digitalen Welt
          </p>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            <span className="text-sm font-medium">
              {posts.length} {posts.length === 1 ? 'Artikel' : 'Artikel'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-8">
            <div className="font-medium">Fehler beim Laden der Artikel</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        )}
        
        {posts.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Noch keine Artikel
            </h3>
            <p className="text-gray-600">
              Bald gibt es hier spannende Inhalte zu entdecken!
            </p>
          </div>
        )}
        
        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Article Header */}
              <div className="p-6 pb-4">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-4">
                  {post.category ? (
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: post.category.color || '#3B82F6' }}
                    >
                      {post.category.name}
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Allgemein
                    </span>
                  )}
                  <time className="text-sm text-gray-500 font-medium">
                    {new Date(post.Date).toLocaleDateString('de-DE')}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                  {post.Text}
                </h2>
                
                {/* Excerpt or Content Preview */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt || (post.Content.length > 150 
                    ? `${post.Content.substring(0, 150)}...` 
                    : post.Content)
                  }
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag.id}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                      >
                        #{tag.name}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-gray-400 text-xs font-medium">
                        +{post.tags.length - 3} mehr
                      </span>
                    )}
                  </div>
                )}

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-105">
                    Weiterlesen
                  </button>
                  
                  <span className="text-sm text-gray-400 font-medium">
                    {Math.max(1, Math.ceil((post.excerpt || post.Content).split(' ').length / 200))} Min. Lesezeit
                  </span>
                </div>
              </div>

              {/* Article Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Veröffentlicht</span>
                  <time className="text-gray-700 font-medium" dateTime={post.publishedAt}>
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
        <div className="text-center mt-16">
          <Link 
            href="/" 
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}