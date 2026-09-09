# Mapping engine explainer

An interactive walkthrough of the Surpluss spreadsheet mapping engine, built around a React Flow canvas.
Standalone — it does not touch the Surpluss platform.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Using it

- **Start walkthrough** fits the graph, opens layer 1, and lets you step with Previous / Next.
- Click any node for its details. Outcome nodes and the final output are selectable too.
- Keyboard: `→` next, `←` previous, `Esc` close, `R` reset the view.
- Pan by dragging, zoom with the wheel or pinch, `Fit` in the bottom-left corner.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · `@xyflow/react` · Lucide · Framer Motion
