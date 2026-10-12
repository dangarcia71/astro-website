import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const fixture = 'src/content/blog/pt/prototype-validation-fixture.md';
assert(!existsSync(fixture), 'O ficheiro de teste já existe; abortar sem o alterar.');
mkdirSync('output/validation', { recursive: true });
const original = `---
title: "Teste de publicação automática"
slug: "prototype-validation-fixture"
date: "2026-10-12"
excerpt: "Conteúdo temporário para validar o workflow editorial."
category: "Categoria de teste"
tags: ["Ação editorial"]
image: "/images/blog/skill-placeholder.svg"
language: "pt-PT"
status: "draft"
---

## Conteúdo temporário

Este artigo deve aparecer apenas quando publicado.
`;
const read = (path) => readFileSync(`dist/${path}`, 'utf8');
const publicFiles = ['blog/index.html', 'blog/pt/index.html', 'blog/en/index.html', 'rss.xml', 'sitemap-0.xml'];
const astroBin = JSON.parse(readFileSync('node_modules/astro/package.json', 'utf8')).bin.astro;

function build(name, expected = 0, message) {
  // Executa o CLI instalado, sem depender de shell ou de instalações globais.
  const result = spawnSync(process.execPath, [`node_modules/astro/${astroBin}`, 'build'], { encoding: 'utf8' });
  const log = (result.stdout || '') + (result.stderr || '');
  writeFileSync(`output/validation/${name}.log`, log);
  assert.equal(result.error, undefined, log);
  if (expected === 0) assert.equal(result.status, 0, log);
  else {
    assert.notEqual(result.status, 0, 'O build devia rejeitar este conteúdo.');
    assert.match(log, message);
  }
  console.log(`OK: ${name}`);
}

let testError;
try {
  writeFileSync(fixture, original);
  build('draft-excluded');
  assert(!existsSync('dist/blog/pt/prototype-validation-fixture/index.html'));
  assert(!existsSync('dist/blog/category/categoria-de-teste/index.html'));
  assert(!existsSync('dist/blog/tag/acao-editorial/index.html'));
  for (const path of publicFiles) assert(!read(path).includes('prototype-validation-fixture'), path);

  const published = original.replace('status: "draft"', 'status: "published"');
  writeFileSync(fixture, published);
  build('new-markdown-published');
  assert(read('blog/pt/prototype-validation-fixture/index.html').includes('Conteúdo temporário'));
  assert(read('blog/category/categoria-de-teste/index.html').includes('prototype-validation-fixture'));
  assert(read('blog/tag/acao-editorial/index.html').includes('prototype-validation-fixture'));
  for (const path of publicFiles.filter((path) => path !== 'blog/en/index.html')) {
    assert(read(path).includes('prototype-validation-fixture'), path);
  }
  assert(!read('blog/en/index.html').includes('prototype-validation-fixture'));

  writeFileSync(fixture, published.replace('status: "published"', 'status: "review"'));
  build('invalid-frontmatter-rejected', 1, /status/);
  writeFileSync(fixture, published.replace('date: "2026-10-12"', 'date: "2026-02-30"'));
  build('invalid-date-rejected', 1, /date/);
  writeFileSync(fixture, published.replace('slug: "prototype-validation-fixture"', 'slug: "anatomia-de-uma-skill"'));
  build('duplicate-slug-rejected', 1, /Slug duplicado/);
  writeFileSync(fixture, published.replace('status: "published"', 'translation: "missing-translation"\nstatus: "published"'));
  build('missing-translation-rejected', 1, /tradução inexistente/);
} catch (error) {
  testError = error;
} finally {
  if (existsSync(fixture)) unlinkSync(fixture);
  build('restored-valid-content');
  for (const path of publicFiles) assert(!read(path).includes('prototype-validation-fixture'), path);
}
if (testError) throw testError;
console.log('Todos os testes editoriais passaram; conteúdo válido restaurado.');
