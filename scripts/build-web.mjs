import { cp, mkdir, copyFile } from 'node:fs/promises';

const files = [
  'index.html',
  'admin.html',
  'reset-password.html',
  'manifest.webmanifest',
  'sw.js'
];

await mkdir('www', { recursive: true });
for (const file of files) await copyFile(file, `www/${file}`);
await cp('icons', 'www/icons', { recursive: true, force: true });
console.log('TABA web bundle prepared in ./www');

