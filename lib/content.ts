export type NodeKind = "input" | "layer" | "engine" | "gate" | "route" | "learning" | "output";
export type Tone = "auto" | "assisted" | "review" | "neutral";

export type NodeId =
  | "input"
  | "l0"
  | "l1"
  | "l2"
  | "l3"
  | "l4"
  | "l5"
  | "scorer"
  | "resolver"
  | "gate"
  | "auto"
  | "ai"
  | "user"
  | "remember"
  | "output";

export type IconName =
  | "file"
  | "scan"
  | "case"
  | "book"
  | "history"
  | "spell"
  | "chart"
  | "sigma"
  | "grid"
  | "scale"
  | "zap"
  | "bot"
  | "user"
  | "bookmark"
  | "package";

export interface NodeContent {
  id: NodeId;
  kind: NodeKind;
  tone: Tone;
  label: string;
  title: string;
  summary: string;
  icon: IconName;
}

export const NODES: NodeContent[] = [
  { id: "input", kind: "input", tone: "neutral", label: "Input", title: "Supplier workbook", summary: "A spreadsheet arrives in the **supplier’s own format**.", icon: "file" },
  { id: "l0", kind: "layer", tone: "auto", label: "Layer 0", title: "Read the file and locate the table", summary: "Find the right sheet, the **real header row** and where product rows begin.", icon: "scan" },
  { id: "l1", kind: "layer", tone: "auto", label: "Layer 1", title: "Normalize the header", summary: "Clean the text so labels become **comparable** — without deciding meaning.", icon: "case" },
  { id: "l2", kind: "layer", tone: "auto", label: "Layer 2", title: "Known aliases", summary: "Check the header against the **field registry** of known names.", icon: "book" },
  { id: "l3", kind: "layer", tone: "auto", label: "Layer 3", title: "Confirmed history", summary: "What **this seller** confirmed, what **all suppliers** confirmed, and similar past columns.", icon: "history" },
  { id: "l4", kind: "layer", tone: "auto", label: "Layer 4", title: "Fuzzy matching", summary: "Catch **typos and near-misses** in the wording.", icon: "spell" },
  { id: "l5", kind: "layer", tone: "auto", label: "Layer 5", title: "Value profiling", summary: "Look beneath the header at the **actual values**.", icon: "chart" },
  { id: "scorer", kind: "engine", tone: "neutral", label: "Scoring", title: "Evidence scorer", summary: "Combine every clue into **one score per candidate** field.", icon: "sigma" },
  { id: "resolver", kind: "engine", tone: "neutral", label: "Sheet check", title: "Whole-sheet resolver", summary: "Judge the columns **as a group**, not one by one.", icon: "grid" },
  { id: "gate", kind: "gate", tone: "neutral", label: "Decision", title: "Confidence gate", summary: "Choose the **safest route** for each column.", icon: "scale" },
  { id: "auto", kind: "route", tone: "auto", label: "Route A", title: "Map automatically", summary: "Strong, uncontested evidence — **no question** needed.", icon: "zap" },
  { id: "ai", kind: "route", tone: "assisted", label: "Route B", title: "Ask AI for help", summary: "Semantic retrieval, then a model — looking at **only the unresolved column**.", icon: "bot" },
  { id: "user", kind: "route", tone: "review", label: "Route C", title: "Ask the user", summary: "One focused question — the **rest of the import continues**.", icon: "user" },
  { id: "remember", kind: "learning", tone: "auto", label: "Learning", title: "Remember the confirmation", summary: "Store the approved mapping as **seller-specific memory**.", icon: "bookmark" },
  { id: "output", kind: "output", tone: "neutral", label: "Output", title: "Clean Surpluss import", summary: "Every column now has a **consistent Surpluss meaning**.", icon: "package" },
];

export const NODE_BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<NodeId, NodeContent>;

/** Order used by Previous / Next, the arrow keys and the walkthrough. */
export const SEQUENCE: NodeId[] = ["l0", "l1", "l2", "l3", "l4", "l5", "scorer", "resolver", "gate", "auto", "ai", "user", "remember", "output"];

export function progressLabel(id: NodeId): string {
  const i = SEQUENCE.indexOf(id);
  return i >= 0 ? `Step ${i + 1} of ${SEQUENCE.length}` : "Starting point";
}

/* ─── Detail panel content ─────────────────────────────────────────── */

export type Section =
  | { kind: "text"; text: string }
  | { kind: "example"; title: string; rows: [string, string][] }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "why"; text: string }
  | { kind: "grows"; text: string }
  | { kind: "note"; text: string }
  | { kind: "viz"; name: "evidence" | "matrix" | "resolver" | "gate" | "ai" | "storage" | "output" | "question" | "witnesses" | "votes" | "confidence" | "embedding" | "learning" | "uploads" | "history" };

export interface Detail {
  heading?: string;
  sections: Section[];
}

export const DETAILS: Record<NodeId, Detail> = {
  input: {
    heading: "Every supplier file looks different",
    sections: [
      { kind: "text", text: "Headers, layouts, abbreviations and workbook structures all vary. The engine treats each file as a fresh puzzle — until it recognises a supplier it has seen before." },
      {
        kind: "example",
        title: "A typical upload",
        rows: [
          ["PARTICULAR", "Fortune Sunflower Oil"],
          ["AV STK", "250"],
          ["M.R.P.", "180"],
          ["PTR", "145"],
          ["GST%", "5"],
        ],
      },
      { kind: "text", text: "There are two separate jobs. **Column mapping** answers “what does each column mean?”. **Row import** then converts and saves every row using that answer. This journey explains the first job." },
    ],
  },

  l0: {
    sections: [
      { kind: "text", text: "Before any column can be understood, the reader has to find the table. A workbook may hold a company title in the first row, blank rows, merged banners, several sheets, a summary sheet — and the actual product table starting at row 8." },
      {
        kind: "list",
        title: "What this layer decides",
        items: ["Which sheet contains inventory", "Which row is the real header", "Where product rows begin and end", "Which values belong to each column"],
      },
      {
        kind: "example",
        title: "What the next layers receive",
        rows: [
          ["Raw headers", "PARTICULAR · AV STK · M.R.P. · PTR · GST%"],
          ["Sample values", "20–100 per column, spread across the sheet"],
          ["Positions", "sheet, column index, header row"],
          ["Basic types", "text · number · date · percentage"],
        ],
      },
      { kind: "why", text: "A correct mapping is impossible if we start from the wrong row." },
      { kind: "note", text: "For PDF or scanned sources the extraction step changes; everything after it stays the same." },
    ],
  },

  l1: {
    sections: [
      { kind: "text", text: "Normalization cleans the text without deciding what it means. Capital letters, spaces, dots, hyphens, underscores and common abbreviations are made consistent so two labels can be compared fairly." },
      {
        kind: "example",
        title: "Before → after",
        rows: [
          ["“M.R.P.”", "mrp"],
          ["“  Available Stock ”", "available stock"],
          ["“GST %”", "gst"],
          ["“Product-Name”", "product name"],
          ["“AV STK”", "available stock"],
        ],
      },
      { kind: "why", text: "Formatting differences should never turn into questions for the user." },
      { kind: "note", text: "Normalization makes two labels comparable. It does not perform the mapping." },
    ],
  },

  l2: {
    sections: [
      { kind: "text", text: "The normalized header is checked against the field registry — the master list of Surpluss fields, each with the names suppliers commonly use for it." },
      {
        kind: "example",
        title: "Registry entry for Available quantity",
        rows: [
          ["Aliases", "available stock · av stk · available qty · closing stock · stock available"],
          ["Header “AV STK”", "candidate: Available quantity · evidence: exact alias"],
        ],
      },
      { kind: "text", text: "An exact alias is strong evidence, but the values and the rest of the sheet are still checked. Some words are too broad to trust alone — **rate** could mean MRP, offer price, purchase price, tax rate or a conversion rate, so it returns several weak candidates instead of one answer." },
      { kind: "grows", text: "When several different sellers confirm the same header → field, it is promoted into the shared alias list. A brand-new seller then benefits on their first upload." },
    ],
  },

  l3: {
    heading: "Three kinds of memory",
    sections: [
      { kind: "text", text: "Before making a new decision, the engine checks what has already been confirmed. **Seller history** tells us how this seller speaks. **Global history** tells us how suppliers generally speak. **Semantic history** finds similar meanings even when the wording is new." },
      { kind: "viz", name: "history" },
      { kind: "text", text: "Seller history stays the strongest. If one supplier uses **RATE** for MRP while, globally, RATE usually means Offer price, that supplier’s own confirmed meaning wins for their files. That is why both memories exist instead of one." },
      { kind: "text", text: "None of them blindly win, though. If a seller used **RATE** for a price last year but the column now holds percentages, memory gives way to the values." },
      {
        kind: "list",
        title: "What gets stored after a confirmation",
        items: [
          "The decision itself — seller, raw and normalized header, confirmed field, rejected fields — kept immutable for audit",
          "Aggregated counts per scope — global “ptr → Offer price: 82 confirmations, 4 rejections”, and the same per seller — so exact lookups are instant",
          "A historical example with its value profile, neighbouring headers and an embedding, so future columns with similar meaning can find it",
        ],
      },
      { kind: "grows", text: "Every confirmed import adds to seller memory, to the global counts, and to the pool of similar examples. Returning suppliers get quieter; new suppliers benefit from everyone before them." },
    ],
  },

  l4: {
    sections: [
      { kind: "text", text: "Fuzzy matching handles typos and small wording differences. It measures how similar two strings are, so a misspelt header can still find the right candidate." },
      {
        kind: "example",
        title: "What it catches",
        rows: [
          ["“Avilable Quantty”", "Available quantity"],
          ["“Prodct Name”", "Product name"],
          ["“Expry Dt”", "Expiry date"],
        ],
      },
      {
        kind: "list",
        title: "How we measure similarity",
        items: [
          "Jaro-Winkler for short headers — rewards matching starts of words, forgiving of a swapped or missing letter",
          "Trigram overlap for longer headers — compares three-letter chunks, robust to word order",
          "Both run against the alias list in memory and against this seller’s past headers in the database",
        ],
      },
      { kind: "text", text: "Fuzzy matching tells us which fields are worth considering. It does not know which one the supplier meant — **price** is textually close to MRP, offer price and purchase price all at once." },
      { kind: "grows", text: "The list it compares against grows with every promoted alias and every confirmed seller header." },
    ],
  },

  l5: {
    sections: [
      { kind: "text", text: "A header name can be misleading. This layer looks beneath it at representative values and asks simple questions: numbers or text? percentages? dates? mostly unique codes? currency-like amounts? whole quantities or decimal prices? a known pattern such as an EAN barcode or a GST rate?" },
      {
        kind: "example",
        title: "What the values reveal",
        rows: [
          ["GST · 5, 12, 18, 18, 5", "percentage / tax"],
          ["EAN · 8901030895484, 8901491101834", "product identifier"],
          ["Rate · 145.00, 320.50, 89.00", "a price — but which price?"],
        ],
      },
      { kind: "viz", name: "evidence" },
      { kind: "why", text: "Several supporting clues are safer than trusting one similar word." },
      { kind: "grows", text: "The expected shape of each field is tuned on real columns, so the profiles get sharper as more inventories are imported." },
    ],
  },

  scorer: {
    heading: "A judge collecting opinions from witnesses",
    sections: [
      { kind: "text", text: "Take one column: header **PTR**, values 145, 220, 88, with an MRP column beside it. We are trying to answer one question — what does PTR mean? The possible answers are MRP, Offer price, Purchase price, or unknown." },
      { kind: "text", text: "Each layer is a witness. A witness gives an opinion and a reason. **Evidence** is simply a reason that supports or rejects a mapping." },
      { kind: "viz", name: "witnesses" },
      { kind: "text", text: "Not every witness is equally trustworthy. Confirmed seller memory is more reliable than a spelling match, so it carries more weight. Think of it as weighted votes." },
      { kind: "viz", name: "votes" },
      { kind: "text", text: "So the scorer says: **“Offer price is the best candidate.”** It has not said “we are safe to import automatically.” That is the confidence gate’s job." },
      { kind: "viz", name: "matrix" },
      { kind: "grows", text: "Every confirmed mapping is kept together with the evidence behind it. Periodically, that dataset is used to check which witnesses were right most often — and their weight is adjusted, offline and versioned. Not after every upload." },
    ],
  },

  resolver: {
    sections: [
      { kind: "text", text: "Columns cannot always be mapped independently. If a sheet holds MRP, PRICE and PTR, all three contain currency values — judged one at a time, all three might claim to be MRP. The resolver looks at the combination and finds the best assignment for the whole sheet." },
      { kind: "viz", name: "resolver" },
      {
        kind: "list",
        title: "Rules it applies",
        items: [
          "Do not assign the same target field twice unless the field allows it",
          "MRP should generally be greater than or equal to offer price",
          "A percentage column cannot become a quantity; a date column cannot become a price",
          "Required fields are identified and flagged when missing",
          "Conflicting assignments reduce confidence rather than being forced",
        ],
      },
      { kind: "note", text: "A value relationship can support a mapping — MRP ≥ offer price supports the chosen pair — but it never proves one on its own." },
      { kind: "why", text: "The engine understands columns as a group, not as isolated labels." },
    ],
  },

  gate: {
    heading: "Winning is not the same as being trusted",
    sections: [
      { kind: "text", text: "The scorer answers: **which candidate is winning?** Confidence answers a different question: **do we have enough reliable evidence to trust that winner without asking?**" },
      { kind: "viz", name: "confidence" },
      { kind: "text", text: "Confidence is not another AI model. It is a short set of rules." },
      {
        kind: "list",
        title: "Map automatically only when",
        items: [
          "The winner has enough support",
          "It is clearly ahead of the second candidate",
          "At least one reliable source supports it — an exact alias, seller memory or a strong value match",
          "The values are compatible with the field",
          "No business rule is broken",
          "No other column is claiming the same field",
        ],
      },
      { kind: "text", text: "Otherwise: suggest the mapping and ask for confirmation." },
      { kind: "viz", name: "gate" },
      { kind: "why", text: "Uncertainty is handled openly instead of being hidden behind a confident-looking guess." },
      { kind: "grows", text: "The rules start strict and loosen only as real corrections show where automation is safe." },
    ],
  },

  auto: {
    heading: "Strong evidence can move forward",
    sections: [
      { kind: "text", text: "When known mappings, header meaning and sample values agree — and nothing else on the sheet contradicts them — the field is mapped without interrupting the user." },
      {
        kind: "list",
        title: "Used when",
        items: ["Evidence is strong", "The datatype fits", "No other column wants the same field", "The winning candidate is clearly ahead"],
      },
      { kind: "example", title: "Example", rows: [["M.R.P.", "MRP — exact alias, valid prices, no conflict"]] },
      { kind: "note", text: "Auto-mapped columns are still shown in the one-glance summary before anything is imported." },
    ],
  },

  ai: {
    heading: "AI is a fallback, not the foundation",
    sections: [
      { kind: "text", text: "Only the unresolved column is sent for help, together with sample values and the list of approved Surpluss fields. Two steps run, the cheap one first." },
      { kind: "viz", name: "embedding" },
      { kind: "viz", name: "ai" },
      {
        kind: "list",
        title: "Rules that keep it safe",
        items: [
          "It sees one column at a time, never the whole workbook",
          "It can only choose from the approved fields, or answer “unknown”",
          "Its answer is one more witness for the scorer — it does not decide",
          "Its self-reported confidence is not our confidence",
          "Embeddings and the model are both “meaning” systems, so together they count as one kind of evidence, not two independent proofs",
        ],
      },
      { kind: "grows", text: "As aliases and seller memory grow, fewer columns ever reach this route." },
    ],
  },

  user: {
    heading: "Show one useful question",
    sections: [
      { kind: "text", text: "If the evidence is still unclear, the user sees the original header, sample values, the suggested field and a short reason — not the whole mapping table. The rest of the import continues." },
      { kind: "viz", name: "question" },
      { kind: "list", title: "The user can", items: ["Confirm the suggestion", "Choose another field", "Leave it unmapped"] },
      { kind: "why", text: "One good question beats twenty-seven dropdowns." },
    ],
  },

  remember: {
    heading: "The next import gets easier",
    sections: [
      { kind: "text", text: "Once a person confirms a meaning, that decision becomes trusted, seller-specific memory. Two very different records are kept." },
      { kind: "viz", name: "storage" },
      {
        kind: "list",
        title: "Learning rules",
        items: [
          "Auto-mapped and imported → usage count goes up",
          "Explicitly confirmed by a person → confirmation count goes up",
          "Corrected by a person → both the confirmed and the rejected field are stored",
          "Import abandoned or validation failed → nothing is learned",
        ],
      },
      { kind: "text", text: "“Learning” means two different things here, and it helps to keep them apart." },
      { kind: "viz", name: "learning" },
      { kind: "viz", name: "uploads" },
      { kind: "why", text: "An unconfirmed suggestion never becomes a fact." },
    ],
  },

  output: {
    heading: "Consistent data, whatever the original format",
    sections: [
      { kind: "text", text: "The supplier’s original spreadsheet stays traceable, while its columns are translated into consistent Surpluss fields. Once the mapping is approved, the import pipeline applies it to every row." },
      { kind: "viz", name: "output" },
    ],
  },
};

export const GATE_QUOTE = "The goal is not to automate every decision. The goal is to automate only the decisions we can defend.";
