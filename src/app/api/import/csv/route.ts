import { NextResponse } from 'next/server';
import { createProduct } from '@/lib/admin/db';

interface CsvRow {
  image: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  badge: string;
  available: boolean;
  url: string;
}

function parseCsv(csvText: string): CsvRow[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Extract image URL - first quoted string that looks like a URL
    const imageMatch = line.match(/"(https:\/\/poke-collect\.com\/cdn\/shop\/files\/[^"]+)"/);
    const image = imageMatch ? imageMatch[1] : '';
    
    // Extract product name - look for the pattern after the href
    const nameMatch = line.match(/products\/[a-z0-9-]+","([^"]+)","/);
    const name = nameMatch ? nameMatch[1] : '';
    
    // Extract price from the JavaScript code - "price":"12395" format (in cents)
    const priceMatch = line.match(/"price":"(\d+)"/);
    const priceInCents = priceMatch ? parseInt(priceMatch[1]) : 0;
    const price = priceInCents / 100;
    
    // Extract availability from JavaScript
    const availMatch = line.match(/"available":(true|false)/);
    const available = availMatch ? availMatch[1] === 'true' : true;
    
    // Extract badge (Sold out, -23%, etc.)
    const badgeMatch = line.match(/"(Sold out|-?\d+%?)"/);
    const badge = badgeMatch ? badgeMatch[1] : '';
    
    // Extract product URL
    const urlMatch = line.match(/"(https:\/\/poke-collect\.com\/collections\/[^"]+)"/);
    const url = urlMatch ? urlMatch[1] : '';
    
    if (name && price > 0) {
      rows.push({ image, name, price, badge, available, url });
    }
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
      if (!row.name || row.price <= 0) {
        skipped++;
        continue;
      }

      const slug = row.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Determine stock based on availability
      const stock = row.available ? 10 : 0;

      // Determine if there's a compare price (original price before discount)
      let compareAtPrice: number | undefined;
      if (row.badge && row.badge.startsWith('-')) {
        // If there's a discount badge, the current price is the sale price
        // We don't have the original price from the scraper, so skip compareAtPrice
        // unless we can calculate it from the percentage
        const pct = parseInt(row.badge.replace(/[^0-9]/g, ''));
        if (pct > 0 && pct < 100) {
          compareAtPrice = Math.round((row.price / (1 - pct / 100)) * 100) / 100;
        }
      }

      await createProduct({
        name: row.name.trim(),
        slug,
        description: `Imported from poke-collect.com. ${row.url ? `Original listing: ${row.url}` : ''}`,
        productType: 'sealed',
        category: 'sealed',
        price: row.price,
        compareAtPrice,
        currency: 'USD',
        stock,
        images: row.image ? [row.image] : [],
        condition: 'Factory Sealed',
        language: 'English',
      });

      imported++;
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: rows.length,
    });
  } catch (error) {
    console.error('CSV import error:', error);
    return NextResponse.json(
      { success: false, error: 'Import failed' },
      { status: 500 }
    );
  }
}
