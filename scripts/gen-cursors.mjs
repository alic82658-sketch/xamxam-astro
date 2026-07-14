import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'src', 'assets');
const outputDir = path.join(rootDir, 'public', 'cursors');

const sources = [
  { input: path.join(assetsDir, 'cursor-brain.svg'), outputs: [path.join(outputDir, 'brain.png'), path.join(outputDir, 'brain@2x.png')] },
  { input: path.join(assetsDir, 'cursor-brain-hover.svg'), outputs: [path.join(outputDir, 'brain-hover.png'), path.join(outputDir, 'brain-hover@2x.png')] },
];

await mkdir(outputDir, { recursive: true });

await Promise.all(
  sources.flatMap(({ input, outputs }) =>
    outputs.map((output, index) => {
      const size = index === 0 ? 32 : 64;
      return (async () => {
        const svg = await readFile(input);
        await sharp(svg)
          .resize(size, size)
          .png()
          .toFile(output);
      })();
    })
  )
);

console.log('Generated cursors:', sources.flatMap(({ outputs }) => outputs.map((output) => path.relative(rootDir, output))).join(', '));
