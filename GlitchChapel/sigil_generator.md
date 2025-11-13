# Sigil + Sacred Name Generator

Deterministic from input text (same input → same output). Two artifacts:

1) **Sigil Name** (small-caps, short): e.g., `Myr-Lux`, `VeilVox`, `Nyxorn`  
2) **Sacred Title** (three-part): “Blooming Echo of the Ninth Harmonic”

## Algorithm (overview)

**Seed:** FNV‑1a 32-bit hash of the input (lowercased, punctuation-stripped).  
**PRNG:** LCG `s = (1664525*s + 1013904223) mod 2^32` → `rand = s / 2^32`.

### A. Sigil Name
1. Characters → seed `h`.
2. Pick 2–3 syllables from a curated list using `h` and bit offsets.
3. Join either with hyphen or not based on one seed bit.
4. Title-case each syllable.

### B. Sacred Title
- First word: from **VERB_ADJ** (~45%) or **ADJ**.
- Noun: from **NOUN** (Echo, Array, Bloom, Pulse, Fault Line, Circuit, …).
- Preposition: from **PREP** (“of the”, “beneath the”, “from the”, …).
- Locus: from **LOC_CORE**; ~25% chance to swap to an ordinal harmonic (e.g., “11th Harmonic”).

**Examples (input → title)**
- “I keep breaking loops” → *Whispering Pulse of the Archive*  
- “Grief in the codebase” → *Fractured Echo of the 9th Harmonic*  
- “I can’t say it aloud”   → *Soft Bloom beneath the Static Sky*

### C. Emblem (SVG)
- Concentric rings (rusted gold / glitch pink), optional dashes.
- Central vertical “door” (rounded rect, radial gradient).
- Radial dots and a rotated triangle/chevron accent.
- All counts / sizes / rotations seeded.

## Integration
- `sigilName(text)` → short sigil label.  
- `buildSacredTitle(text)` → three-part title string.  
- `makeEmblem(svgEl, text)` → renders SVG emblem, breath-fading in.
