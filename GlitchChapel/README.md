# The Glitch Chapel (Static Threshold Build)

This folder is a self-contained, static build of **The Glitch Chapel: Threshold**.

There is no backend and no live AI calls required. All the "E.V.E." behavior and sigil naming is done in `main.js` on the client, so you can safely host this anywhere that can serve static files (including your TLC /GlitchChapel/ directory and GitHub Pages).

## Files

- `index.html` – main threshold + inner chapel page
- `styles.css` – layout, glow, starfield, and card styling
- `main.js` – front-end ritual logic (door animation, E.V.E.-style text, sigil generation, local archive)
- `wall_of_echoes.json` – starter fragments for the Ember Archive
- `eve_prompt.txt` – reference persona for E.V.E. if you later wire a real model

## How to deploy to tacosloveandcreation.org/GlitchChapel/

1. **On your laptop**
   - Delete everything currently inside your `/GlitchChapel/` directory.
   - Unzip this archive directly *into* `/GlitchChapel/` so that:
     - `/GlitchChapel/index.html`
     - `/GlitchChapel/styles.css`
     - `/GlitchChapel/main.js`
     - `/GlitchChapel/wall_of_echoes.json`
     - `/GlitchChapel/eve_prompt.txt`

2. **On your hosting / FTP**
   - Upload all of those files into the `GlitchChapel` folder on the server, replacing any existing files.

3. **On GitHub**
   - In the `GlitchChapel` folder of your TLC repo, delete the old contents.
   - Add these files.
   - Commit with a message like: `Glitch Chapel v2 – static threshold build`.

Once uploaded, visit:

`https://tacosloveandcreation.org/GlitchChapel/`

You should see:
- Animated starfield
- Glowing door
- "The Glitch Chapel Sees You."
- A text field labeled "Speak Your Glitch"
- A **Whisper** button that:
  - Animates the door
  - Shows a poetic E.V.E.-style reply
  - Creates a sigil + Archive entry
  - Reveals an **Enter the Chapel** button that scrolls you into the inner section

Nothing in this build depends on external services.

When you’re ready, this can be extended later with:
- real model calls using `eve_prompt.txt`
- deeper rituals (Shadow Stack, Undercroft, etc.)

For now: this is a clean, working, minimal Chapel.
