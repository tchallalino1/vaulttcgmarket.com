'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function ImportPage() {
  const [csvData, setCsvData] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ imported?: number; skipped?: number; total?: number; error?: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCsvData(text);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!csvData.trim()) return;
    setImporting(true);
    setResult(null);
    try {
      const res = await fetch('/api/import/csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: csvData }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: 'Failed to import' });
    }
    setImporting(false);
  };

  const rowCount = csvData ? csvData.split('\n').length - 1 : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Import Products</h2>
        <Link href="/admin/products" className="text-sm text-purple-600 hover:text-purple-700">← Back to Products</Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        <h3 className="font-semibold text-lg mb-2">CSV Import</h3>
        <p className="text-sm text-gray-500 mb-6">Upload a CSV file exported from Instant Data Scraper or paste CSV data directly.</p>

        {/* File upload */}
        <div className="mb-6">
          <input ref={fileRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            <p className="text-sm font-medium text-gray-700">Click to upload CSV file</p>
            <p className="text-xs text-gray-400 mt-1">or paste CSV data below</p>
          </button>
        </div>

        {/* Or paste */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Or paste CSV data</label>
          <textarea
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            placeholder="Paste your CSV data here..."
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
          />
        </div>

        {/* Preview */}
        {csvData && (
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700">Preview: {rowCount} rows detected</p>
            <p className="text-xs text-gray-500 mt-1">First row will be used as headers</p>
          </div>
        )}

        {/* Import button */}
        <button
          onClick={handleImport}
          disabled={!csvData.trim() || importing}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {importing ? 'Importing...' : `Import ${rowCount} Products`}
        </button>

        {/* Result */}
        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            {result.error ? (
              <p className="text-sm text-red-700">{result.error}</p>
            ) : (
              <div>
                <p className="text-sm font-medium text-green-700">Import complete!</p>
                <p className="text-xs text-green-600 mt-1">
                  {result.imported} products imported, {result.skipped} skipped, {result.total} total rows
                </p>
                <Link href="/admin/products" className="inline-block mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">View Products →</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
