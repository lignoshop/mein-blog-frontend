import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.brocki.net/api/blog-posts?populate=*');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
