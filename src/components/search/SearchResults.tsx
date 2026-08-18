'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getSearchSuggestions } from '@/lib/search';

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

export function SearchResults({ query, onClose }: SearchResultsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const results = getSearchSuggestions(query);
      setSuggestions(results);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!query || query.length < 2) return null;

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {isLoading ? (
        <div className="p-6 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
            </svg>
            Searching...
          </div>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="max-h-80 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <Link
                key={`${suggestion}-${index}`}
                href={`/search?q=${encodeURIComponent(suggestion)}`}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span className="text-sm text-gray-700 truncate">{suggestion}</span>
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 p-2">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              View all results for &ldquo;{query}&rdquo;
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 mb-3">No suggestions found for &ldquo;{query}&rdquo;</p>
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            Search anyway
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
