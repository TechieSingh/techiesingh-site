import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// Markdown → safe HTML. Raw HTML in posts is stripped down to a small allowlist, links get
// rel="noopener", and only http(s)/mailto URLs survive — so a post can never run scripts.
export function renderMarkdown(md: string): string {
  const html = marked.parse(md ?? "", { async: false, gfm: true, breaks: false }) as string;
  return sanitizeHtml(html, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "blockquote", "ul", "ol", "li", "strong", "em", "del",
      "code", "pre", "a", "img", "table", "thead", "tbody", "tr", "th", "td", "input",
    ],
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title"],
      code: ["class"],
      th: ["align"],
      td: ["align"],
      input: ["type", "checked", "disabled"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    transformTags: {
      a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, rel: "noopener noreferrer", ...(attribs.href?.startsWith("http") ? { target: "_blank" } : {}) } }),
      input: (tagName, attribs) => ({ tagName, attribs: { type: "checkbox", disabled: "", ...(attribs.checked !== undefined ? { checked: "" } : {}) } }),
    },
    allowedClasses: { code: [/^language-[\w-]+$/] },
  });
}

export function plainExcerpt(md: string, max = 220): string {
  const text = sanitizeHtml(renderMarkdown(md), { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : text;
}

export function readingMinutes(md: string): number {
  return Math.max(1, Math.round((md || "").split(/\s+/).filter(Boolean).length / 220));
}
