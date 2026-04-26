import React from "react";

const iconMap = {
  google: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12.2c0-.6-.1-1-.2-1.5H12v2.7h4.9c-.1.8-.5 1.7-1.2 2.3v1.9h1.9c1.2-1.1 1.9-2.9 1.9-5.4z" fill="#4285F4"/>
      <path d="M12 22c2.7 0 5-0.9 6.6-2.5l-1.9-1.9c-1 0.7-2.3 1.1-4.7 1.1-3.6 0-6.6-2.4-7.7-5.7H2.3v1.8C3.9 19.9 7.7 22 12 22z" fill="#34A853"/>
      <path d="M4.3 13.9A8.4 8.4 0 0 1 4 12c0-.7.1-1.4.3-2.1v-1.8H2.3A11 11 0 0 0 1 12c0 1.2.2 2.4.6 3.5l2.7-1.6z" fill="#FBBC05"/>
      <path d="M12 6.2c1.5 0 2.9.5 4 1.5l3-3A10 10 0 0 0 12 2 9.9 9.9 0 0 0 4.3 6.1l2.7 1.7C7.4 6.6 9.6 6.2 12 6.2z" fill="#EA4335"/>
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5A12 12 0 0 0 0 12.6c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.1-1.7-1.1-1.7-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2A11.2 11.2 0 0 1 12 7.7c1 .1 2 .2 3 .2s2-.1 3-.2c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>
    </svg>
  ),
  microsoft: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" fill="#f35325"/>
      <rect x="13" y="3" width="8" height="8" fill="#81BC06"/>
      <rect x="3" y="13" width="8" height="8" fill="#05A6F0"/>
      <rect x="13" y="13" width="8" height="8" fill="#FFBA08"/>
    </svg>
  )
};

export default function SocialButton({ provider = "google", onClick }) {
  const label = provider[0].toUpperCase() + provider.slice(1);
  return (
    <button
      onClick={onClick}
      className="flex-1 inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition text-sm"
      aria-label={`Sign in with ${label}`}
    >
      <span className="flex items-center">{iconMap[provider]}</span>
      <span className="text-slate-700 hidden sm:inline">Continue with {label}</span>
    </button>
  );
}
