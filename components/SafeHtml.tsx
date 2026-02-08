'use client';

import { useEffect, useState } from 'react';
import createDOMPurify from 'dompurify';

export default function SafeHtml({ html }: { html: string }) {
  const [cleanHtml, setCleanHtml] = useState('');

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    setCleanHtml(
      DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
      })
    );
  }, [html]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
