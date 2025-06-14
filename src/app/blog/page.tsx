'use client';
import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [testState, setTestState] = useState('Mobile JS Test funktioniert! ✅');
  const [effectTest, setEffectTest] = useState('useEffect lädt...');

  useEffect(() => {
    setEffectTest('useEffect funktioniert auch! 🚀');
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        🚀 Brocki.net Blog
      </h1>
      
      <div style={{ 
        backgroundColor: 'yellow', 
        padding: '10px', 
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '1.2rem'
      }}>
        {testState}
      </div>

      <div style={{ 
        backgroundColor: 'lightblue', 
        padding: '10px', 
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '1.2rem'
      }}>
        {effectTest}
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
            teste
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
            📅 12. Juni 2025
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Teste 4
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
            📅 13. Juni 2025
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
            2 Post strapi teste 3
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
            📅 12. Juni 2025
          </div>
          <p style={{ color: '#333', lineHeight: '1.5' }}>
            das ist die kurze beschreibung
          </p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Blog test 4
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
            📅 10. Juni 2025
          </div>
          <p style={{ color: '#333', lineHeight: '1.5' }}>
            das ist eine weiter Kurz beschreibung
          </p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
            teste 5
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>
            📅 Kein Datum
          </div>
          <p style={{ color: '#333', lineHeight: '1.5' }}>
            kurztext
          </p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Posts: 5 • useEffect Test Version
      </div>
    </div>
  );
}
