import { readFile } from 'node:fs/promises';

const pages = ['index.html', 'admin.html', 'reset-password.html'];

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  if (!/^<!doctype html>/i.test(html.trimStart())) {
    throw new Error(page + ': missing HTML doctype');
  }
  if (!/<html[^>]+lang="de"/i.test(html)) {
    throw new Error(page + ': German document language is missing');
  }
  if (!/<script\b/i.test(html)) {
    throw new Error(page + ': no script element found');
  }
}

for (const asset of ['manifest.webmanifest', 'sw.js', 'icons/icon.svg']) {
  await readFile(asset);
}

console.log('Web checks passed: ' + pages.length + ' HTML pages and all PWA assets are present.');
