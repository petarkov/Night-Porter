// Build-time text formatting (replaces the prototype's in-browser seg()):
// every number goes in IBM Plex Mono, every [bracketed placeholder] or [[unconfirmed value]] renders as a mono placeholder tag.
// [[...]] must never ship: the final check greps the build for it.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TOKEN = /(\[\[[^\]]+\]\]|\[[^\]]+\]|\$?\d+(?:[.,:/]\d+)*k?(?:-\d+)?)/;

export function rich(text: string): string {
  return text
    .split(TOKEN)
    .filter(Boolean)
    .map((t) => {
      if (t.startsWith('[')) return `<span class="ph">${esc(t)}</span>`;
      if (/\d/.test(t)) return `<span class="n">${esc(t)}</span>`;
      return esc(t);
    })
    .join('');
}
