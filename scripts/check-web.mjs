import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const pages = ['index.html', 'admin.html', 'reset-password.html', 'privacy.html', 'account-deletion.html'];
let checkedScripts = 0;

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  if (!/^<!doctype html>/i.test(html.trimStart())) {
    throw new Error(page + ': missing HTML doctype');
  }
  if (!/<html[^>]+lang="de"/i.test(html)) {
    throw new Error(page + ': German document language is missing');
  }

  const scripts = html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi);
  let inlineIndex = 0;
  for (const match of scripts) {
    if (/\bsrc\s*=/i.test(match[1])) continue;
    const source = match[2].trim();
    if (!source) continue;
    inlineIndex += 1;
    new vm.Script(source, { filename: page + ':inline-script-' + inlineIndex });
    checkedScripts += 1;
  }
}

for (const asset of ['manifest.webmanifest', 'sw.js', 'icons/icon.svg']) {
  await readFile(asset);
}

console.log('Web checks passed: ' + pages.length + ' HTML pages and ' + checkedScripts + ' inline scripts parsed, PWA assets present.');
