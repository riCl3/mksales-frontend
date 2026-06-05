import { NextResponse } from 'next/server';

function extractDriveFileId(url) {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/uc\?.*id=([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isGoogleDriveUrl(url) {
  return /^https?:\/\/(drive\.google\.com|docs\.google\.com)\/.+/.test(url);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  if (!isGoogleDriveUrl(url)) {
    return NextResponse.json({ error: 'Only Google Drive URLs are allowed' }, { status: 403 });
  }

  const fileId = extractDriveFileId(url);
  if (!fileId) {
    return NextResponse.json({ error: 'Could not extract file ID from URL' }, { status: 400 });
  }

  const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const res = await fetch(directUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      redirect: 'follow',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch PDF from Google Drive' }, { status: 502 });
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      const html = await res.text();
      const confirmMatch = html.match(/confirm=([0-9A-Za-z_-]+)/);
      const uuidMatch = html.match(/id=([0-9A-Za-z_-]+)/);

      if (confirmMatch) {
        const confirmUrl = `https://drive.google.com/uc?export=download&confirm=${confirmMatch[1]}&id=${fileId}`;
        const confirmRes = await fetch(confirmUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          redirect: 'follow',
        });

        if (!confirmRes.ok) {
          return NextResponse.json({ error: 'Failed to fetch PDF after confirmation' }, { status: 502 });
        }

        const pdfBuffer = await confirmRes.arrayBuffer();
        return new NextResponse(pdfBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'Pragma': 'no-cache',
            'X-Content-Type-Options': 'nosniff',
            'Content-Disposition': 'inline',
          },
        });
      }

      return NextResponse.json({ error: 'Google Drive requires confirmation. The file may be too large or not publicly shared.' }, { status: 502 });
    }

    const pdfBuffer = await res.arrayBuffer();
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': 'inline',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
