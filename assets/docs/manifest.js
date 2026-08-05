// Kütüphanedeki belgeler. Sıra = görünme sırası.
window.MANIFEST = [
 {
  "id": "jadr-2022",
  "file": "jadr-2022.js",
  "group": "Makaleler"
 },
 {
  "id": "net-feasibility",
  "file": "net-feasibility.js",
  "group": "Makaleler"
 },
 {
  "id": "doc-net-tr",
  "file": "doc-net-tr.js",
  "group": "Makaleler"
 },
 {
  "id": "doc-b89f",
  "file": "doc-b89f.js",
  "group": "Makaleler"
 }
];
// Sıra: makaleler → tam kitaplar → kısa metinler.
if (window.MANIFEST_NOTES) window.MANIFEST = window.MANIFEST.concat(window.MANIFEST_NOTES);
if (window.MANIFEST_FULL) window.MANIFEST = window.MANIFEST.concat(window.MANIFEST_FULL);
if (window.MANIFEST_BOOKS) window.MANIFEST = window.MANIFEST.concat(window.MANIFEST_BOOKS);
