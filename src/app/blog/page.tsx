// src/app/blog/page.tsx
export const runtime = 'edge';

export default function BlogPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🔧 Debug Test</h1>
      <p>Wenn du das siehst, funktioniert das Edge Runtime!</p>
    </div>
  );
}