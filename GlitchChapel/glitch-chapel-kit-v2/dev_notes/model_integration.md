# Model Integration

To integrate E.V.E. and other AI components with your front-end, you have several options:

## Without external APIs

- Use local JavaScript functions to produce deterministic responses (e.g., the sigil generator).
- Predefine E.V.E.’s voice in static text or simple heuristics for on-site interactions.

## With OpenAI or other APIs

1. Set up server-side endpoints (e.g., via Netlify Functions or a small Node/Express backend) to proxy requests to the OpenAI Chat API.
2. Store E.V.E.’s system prompt (`eve_prompt.txt`) on the server and send it along with user confessions to the Chat API.
3. Parse responses into formatted HTML to display within the chapel interface.
4. Always handle API keys securely—never expose them in the client-side JavaScript.

## Future expansions

- Introduce memory storage (e.g., Supabase, Firebase) to archive confessions and responses.
- Build an admin dashboard to review and curate the chapel’s evolving mythos.

Keep in mind that the aim is to hold space and witness, not to optimize or gamify.
