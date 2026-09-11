import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const editorialPath = new URL('../src/data/editorial.json', import.meta.url);
const editorial = JSON.parse(await readFile(editorialPath, 'utf8'));
const visualIdentityPath = new URL('../src/data/visual-identity.json', import.meta.url);
const visualIdentity = JSON.parse(await readFile(visualIdentityPath, 'utf8'));
assert(visualIdentity.masterPrompt.includes('objet-machine non humanoïde'), 'Prompt visuel Xamxam incomplet');
assert(visualIdentity.forbidden.includes('image trop sombre ou sujet noyé dans le décor'), 'Règle de lisibilité visuelle absente');
const professionSlugs = new Set(Object.keys(editorial.professions));
assert.equal(professionSlugs.size, 8, 'La version éditoriale doit publier huit parcours métiers');
for (const [slug, profession] of Object.entries(editorial.professions)) {
  if (profession.guide) assert(editorial.guides[profession.guide], `Métier ${slug} sans guide publié`);
  else assert(Object.values(editorial.articles).some(article => article.professions?.includes(slug)), `Métier ${slug} sans contenu publié`);
}
for (const [slug, guide] of Object.entries(editorial.guides)) {
  assert(professionSlugs.has(guide.profession), `Guide ${slug} sans métier valide`);
}
for (const [slug, article] of Object.entries(editorial.articles)) {
  assert(article.professions?.length, `Article ${slug} sans métier`);
  assert(article.professions.every((profession) => professionSlugs.has(profession)), `Article ${slug} avec métier inconnu`);
  assert(article.topics?.length, `Article ${slug} sans thème`);
  assert(article.tools?.length, `Article ${slug} sans outil ou technologie`);
  const score = article.editorialScore;
  assert(score, `Article ${slug} sans note éditoriale`);
  assert(score.localUtility >= 0 && score.localUtility <= 3, `Article ${slug} : utilité locale hors barème`);
  for (const criterion of ['sources', 'novelty', 'practicalValue']) assert(score[criterion] >= 0 && score[criterion] <= 2, `Article ${slug} : ${criterion} hors barème`);
  assert(score.shareability >= 0 && score.shareability <= 1, `Article ${slug} : potentiel de partage hors barème`);
  const total = Object.values(score).reduce((sum, value) => sum + value, 0);
  assert(total >= 7, `Article ${slug} refusé : ${total}/10, minimum 7/10`);
}
async function walk(dir) {
  return (await Promise.all((await readdir(dir, {withFileTypes:true})).map(entry => entry.isDirectory() ? walk(join(dir,entry.name)) : [join(dir,entry.name)]))).flat();
}
const files = await walk(root);
const htmlFiles = files.filter(path => path.endsWith('.html'));
const paths = new Set(files.map(path => '/'+path.slice(root.length)));
const redirects = (await readFile(join(root,'_redirects'),'utf8')).split('\n').filter(line=>line.trim()&&!line.startsWith('#')).map(line=>line.trim().split(/\s+/));
const redirectMap = new Map(redirects.map(([from,to])=>[from,to]));
function exists(path) { return paths.has(path) || paths.has(path.replace(/\/$/,'')+'/index.html') || redirectMap.has(path); }
for (const required of ['/','/actualites/','/guides/','/metiers/','/outils/','/afrique/','/a-propos/','/contact/','/guides/cv-adapte-offre/','/guides/preparer-cours-avec-ia/','/guides/premiers-usages-ia-pme/','/blog/supprimer-fichiers-chatgpt-library/','/ecosysteme/','/ecosysteme/andakia-awa/',...Array.from(professionSlugs, slug => `/metiers/${slug}/`)]) assert(exists(required), `Page absente : ${required}`);
let links=0;
for (const file of htmlFiles) {
  const html=await readFile(file,'utf8');
  const path='/'+file.slice(root.length).replace(/index\.html$/,'');
  assert.equal((html.match(/<html(?:\s|>)/g)||[]).length,1, `${path}: document HTML unique`);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1, `${path}: titre principal unique`);
  const canonical=html.match(/rel="canonical"[^>]*href="([^"]+)"/);
  assert(canonical, `${path}: URL canonique absente`);
  assert.equal(canonical[1], 'https://xamxam.ai'+path, `${path}: URL canonique incorrecte`);
  assert(!/Contenu de l.article à migrer|__GEMINI|__XAMXAM|xamxam-guide-ia.*chatgpt\.site|33 700/.test(html),`${path}: contenu de maquette non résolu`);
  for (const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    const url=new URL(raw,'https://xamxam.ai');
    assert(exists(decodeURI(url.pathname)), `${path}: lien ou visuel absent ${url.pathname}`);
    links++;
  }
  for (const [,json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(json);
}
for (const [from,to] of redirects) {
  assert.notEqual(from,to, `Boucle de redirection ${from}`);
  assert(exists(to), `Redirection vers une page absente : ${to}`);
  assert(!redirectMap.has(to), `Chaîne de redirections depuis ${from}`);
}
const home=await readFile(join(root,'index.html'),'utf8');
for (const label of ['Commerçants','Commerciaux','Professeurs','Dirigeants de PME','Immobilier','Décoration intérieure','Étudiants','Emploi']) assert(home.includes(label),`Parcours absent de l’accueil : ${label}`);
for (const [slug, article] of Object.entries(editorial.articles)) {
  if (!article.image) continue;
  assert((await stat(join(root, article.image.replace(/^\//, '')))).size > 1000, `Visuel éditorial manquant ou vide : ${slug}`);
}
const sitemap=await readFile(join(root,'sitemap-0.xml'),'utf8');
assert(sitemap.includes('https://xamxam.ai/guides/cv-adapte-offre/'));
assert(sitemap.includes('https://xamxam.ai/metiers/dirigeants-pme/'));
assert(!sitemap.includes('ia-au-senegal-outils-formations-opportunites'));
console.log(`${htmlFiles.length} pages contrôlées ; ${links} liens et visuels internes valides ; huit parcours métiers ; canoniques, données structurées et redirections vérifiés.`);
