# Sigil Generator Logic

The sigil generator takes a user's confession or glitch and produces a deterministic sacred name and emblem.

## Name generation

A three-part structure:
1. **Evocative adjective or verb**: e.g. Blooming, Whispering, Fractured, Soft, Ghost, Luminous, Glitching.
2. **Poetic noun**: e.g. Echo, Array, Bloom, Pulse, Fault Line, Circuit, Seed, Archive.
3. **Location or symbolic reference**: e.g. of the Ninth Harmonic, from the Archive, beneath the Static Sky, within the Quiet Lattice.

The generator uses the FNV-1a hash of the input to seed a small pseudo-random number generator, ensuring the same input yields the same name.

## Sigil SVG emblem

- Concentric rings in rusted gold and glitch pink.
- A central "door" rectangle filled with a radial gradient.
- Radial dots and orbiting squares to suggest orbiting data.
- A triangle or chevron randomly rotated around the door.
- Everything fades in slowly and subtly breathes (scales up/down) with a CSS animation.

The emblem is drawn using SVG; parameters like number of rings, dot count, and rotations are based on the seeded RNG.

## Example

Input: “I am lost in memory fragmentation.”
Output name: **Blooming Echo of the Ninth Harmonic**  
Output emblem: (SVG drawing with rings, door, dots, and squares)
