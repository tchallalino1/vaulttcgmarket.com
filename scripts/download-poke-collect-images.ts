import { pokeCollectProducts } from '@/seed/poke-collect-products';
import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGE_DIR = path.join(process.cwd(), 'public', 'products', 'poke-collect');

async function downloadImage(url: string, filename: string): Promise<string> {
  const filePath = path.join(IMAGE_DIR, filename);
  
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(`/products/poke-collect/${filename}`);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  console.log('Downloading images from poke-collect.com...\n');

  for (const product of pokeCollectProducts) {
    console.log(`Processing: ${product.name}`);
    
    const localImages: string[] = [];
    
    for (let i = 0; i < product.images.length; i++) {
      const imageUrl = product.images[i];
      const filename = `${product.slug}-${i + 1}.png`;
      
      try {
        const localPath = await downloadImage(imageUrl, filename);
        localImages.push(localPath);
        console.log(`  Downloaded: ${filename}`);
      } catch (error) {
        console.log(`  Failed to download: ${filename}`);
        localImages.push(imageUrl);
      }
    }
    
    product.images = localImages;
  }

  const outputPath = path.join(process.cwd(), 'src', 'seed', 'poke-collect-products-with-local-images.ts');
  const content = `import { Product } from '@/types';

export const pokeCollectProducts: Product[] = ${JSON.stringify(pokeCollectProducts, null, 2)};
`;
  
  fs.writeFileSync(outputPath, content);
  console.log(`\nSaved updated products to: ${outputPath}`);
}

main().catch(console.error);
