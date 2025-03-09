import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'CONTEXTBUILD - AI Context Documents Generator'
export const size = {
  width: 1200,
  height: 675,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #1a1a1a, #333)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            CONTEXTBUILD
          </div>
        </div>
        <div style={{ fontSize: 32, maxWidth: '80%', marginBottom: 32 }}>
          AI Context Documents Generator
        </div>
        <div
          style={{
            display: 'flex',
            padding: '12px 24px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            color: 'white',
            borderRadius: 8,
            fontWeight: 'bold',
          }}
        >
          Build better apps with minimal hallucinations
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
