"use client";
import DOMPurify from 'dompurify';

export default function ClientSanitizedContent({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}
