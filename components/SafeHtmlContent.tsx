"use client";
import React from "react";

interface SafeHtmlContentProps {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}

const SafeHtmlContent: React.FC<SafeHtmlContentProps> = ({ html, className, style }) => {
  const [sanitized, setSanitized] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;
    import("dompurify").then((DOMPurify) => {
      if (isMounted) {
        setSanitized(DOMPurify.default.sanitize(html));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [html]);

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default SafeHtmlContent;
