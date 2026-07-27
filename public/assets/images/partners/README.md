# Partner logos (homepage trust strip)

Drop each partner's logo file here to activate its slot in the homepage strip.
No code change needed — the strip renders a neutral brand-name chip until the
matching file exists, then swaps in the logo automatically.

Expected filenames (PNG, ideally transparent background, trimmed, ~160×80+):

    hul.png
    itc.png
    nestle.png
    britannia.png
    parle.png
    coca-cola.png
    pepsico.png

Use only official, licensed logo assets. Filenames must match the slugs in
`content/site.ts` → `manufacturers[].slug`.
