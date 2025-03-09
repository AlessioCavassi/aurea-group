import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../src/assets/images/image_fx_ (4).jpg');
const outputPath = join(__dirname, '../public/images/hero-bg.webp');

try {
  const info = await sharp(inputPath)
    .resize(2000, 2000, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log('Immagine ottimizzata con successo!');
  console.log('Info:', info);
} catch (err) {
  console.error('Errore durante l\'ottimizzazione:', err);
}
