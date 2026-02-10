"use client";
import React from "react";
import DOMPurify from "dompurify";

interface SafeHtmlContentProps {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}

const SafeHtmlContent: React.FC<SafeHtmlContentProps> = ({ html, className, style }) => {
  // Sanitize HTML only on client
  const sanitized = React.useMemo(() => DOMPurify.sanitize(html), [html]);
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default SafeHtmlContent;
