import { NextResponse } from 'next/server';
import { createProduct } from '@/lib/admin/db';

interface CsvRow {
  image?: string;
  name?: string;
  regularPrice?: string;
  salePrice?: string;
  badge?: string;
  url?: string;
}

function parseCsv(csvText: string): CsvRow[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = values[idx] || ''; });

    rows.push({
      image: row['motion-reduce src'] || row['src'] || '',
      name: row['full-unstyled-link'] || row['caption'] || '',
      regularPrice: row['price-item'] || '',
      salePrice: row['price-item '] || '',
      badge: row['badge'] || '',
      url: row['full-unstyled-link href'] || '',
    });
  }
  return rows;
}

export async function POST(request: Request) {
  try {
    const { csv } = await request.json();
    const rows = parseCsv(csv);

    let imported = 0;
    let skipped = 0;

    for (const row of rows) {
      if (!row.name || !row.regularPrice) {
        skipped++;
        continue;
      }

      const price = parseFloat(row.regularPrice.replace(/[^0-9.]/g, ''));
      const salePrice = row.salePrice ? parseFloat(row.salePrice.replace(/[^0-9.]/g, '')) : undefined;

      if (isNaN(price) || price <= 0) {
        skipped++;
        continue;
      }

      const name = row.name.trim();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      await createProduct({
        name,
        slug,
        description: `Imported from poke-collect.com`,
        productType: 'sealed',
        category: 'sealed',
        price: salePrice && salePrice > 0 ? salePrice : price,
        compareAtPrice: salePrice && salePrice > 0 ? price : undefined,
        currency: 'USD',
        stock: row.badge === 'Sold out' ? 0 : 10,
        images: row.image ? [row.image] : [],
        condition: 'Factory Sealed',
        language: 'English',
      });

      imported++;
    }

    return NextResponse.json({ success: true, imported, skipped, total: rows.length });
  } catch (error) {
    console.error('CSV import error:', error);
    return NextResponse.json({ success: false, error: 'Import failed' }, { status: 500 });
  }
}
