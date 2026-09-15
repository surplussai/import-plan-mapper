export type NodeKind = "input" | "layer" | "engine" | "gate" | "route" | "learning" | "output";
export type Tone = "auto" | "assisted" | "review" | "neutral";

export type NodeId =
  | "input"
  | "l0"
  | "l1"
  | "l2"
  | "l3"
  | "router"
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
  | "route"
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
  { id: "l1", kind: "layer", tone: "auto", label: "Layer 1", title: "Normalize the header", summary: "Clean the text so labels become **comparable** before meaning is decided.", icon: "case" },
  { id: "l2", kind: "layer", tone: "auto", label: "Layer 2", title: "Known aliases", summary: "Check the header against the **field registry** of known names.", icon: "book" },
  { id: "l3", kind: "layer", tone: "auto", label: "Layer 3", title: "Confirmed history", summary: "What **this seller** confirmed, what **all suppliers** confirmed, and similar past columns.", icon: "history" },
  { id: "router", kind: "gate", tone: "neutral", label: "Routing gate", title: "Fast evidence router", summary: "Decide whether this column needs a **short or deeper path**.", icon: "route" },
  { id: "l4", kind: "layer", tone: "auto", label: "Layer 4", title: "Fuzzy matching", summary: "Catch **typos and near-misses** in the wording.", icon: "spell" },
  { id: "l5", kind: "layer", tone: "auto", label: "Layer 5", title: "Value profiling", summary: "Look beneath the header at the **actual values**.", icon: "chart" },
  { id: "scorer", kind: "engine", tone: "neutral", label: "Scoring", title: "Evidence scorer", summary: "Combine the clues that ran into **one score per candidate** field.", icon: "sigma" },
  { id: "resolver", kind: "engine", tone: "neutral", label: "Sheet check", title: "Whole-sheet resolver", summary: "Judge the columns **as a group**, not one by one.", icon: "grid" },
  { id: "gate", kind: "gate", tone: "neutral", label: "Decision", title: "Confidence gate", summary: "Choose the **safest route** for each column.", icon: "scale" },
  { id: "auto", kind: "route", tone: "auto", label: "Route A", title: "Map automatically", summary: "Strong, uncontested evidence. **No question** needed.", icon: "zap" },
  { id: "ai", kind: "route", tone: "assisted", label: "Route B", title: "Ask AI for help", summary: "Semantic retrieval, then a model, looking at **only the unresolved column**.", icon: "bot" },
  { id: "user", kind: "route", tone: "review", label: "Route C", title: "Ask the user", summary: "One focused question. The **rest of the import continues**.", icon: "user" },
  { id: "remember", kind: "learning", tone: "auto", label: "Learning", title: "Remember the confirmation", summary: "Store the approved mapping as **seller-specific memory**.", icon: "bookmark" },
  { id: "output", kind: "output", tone: "neutral", label: "Output", title: "Clean Surpluss import", summary: "Every column now has a **consistent Surpluss meaning**.", icon: "package" },
];

export const NODE_BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<NodeId, NodeContent>;

/** Order used by Previous / Next, the arrow keys and the walkthrough. */
export const SEQUENCE: NodeId[] = ["l0", "l1", "l2", "l3", "router", "l4", "l5", "scorer", "resolver", "gate", "auto", "ai", "user", "remember", "output"];

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
  | { kind: "viz"; name: "evidence" | "matrix" | "resolver" | "gate" | "ai" | "storage" | "output" | "question" | "witnesses" | "votes" | "confidence" | "embedding" | "learning" | "uploads" | "history" | "router" };

export interface Detail {
  heading?: string;
  sections: Section[];
}

export const DETAILS: Record<NodeId, Detail> = {
  input: {
    heading: "Every supplier file looks different",
    sections: [
      { kind: "text", text: "The supplier uploads inventory in their own format. The engine does not assume column order, header names or even that the first row is the header." },
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
      {
        kind: "list",
        title: "Two jobs stay separate",
        items: [
          "Column mapping: decide what each column means",
          "Row import: convert rows only after mapping is approved",
          "Raw supplier values stay traceable",
        ],
      },
    ],
  },

  l0: {
    heading: "Find the real table first",
    sections: [
      { kind: "text", text: "Before mapping starts, the engine finds the sheet, header row and product rows. This protects every later step from reading the wrong row as a header." },
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
          ["Sample values", "20 to 100 per column, spread across the sheet"],
          ["Positions", "sheet, column index, header row"],
          ["Basic types", "text · number · date · percentage"],
        ],
      },
      { kind: "why", text: "A correct mapping is impossible if we start from the wrong row." },
      { kind: "note", text: "For PDF or scanned sources the extraction step changes; everything after it stays the same." },
    ],
  },

  l1: {
    heading: "Make headers comparable",
    sections: [
      { kind: "text", text: "Normalization cleans text only. It does not map the column yet." },
      {
        kind: "example",
        title: "Before and after",
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
    heading: "Check approved field names",
    sections: [
      { kind: "text", text: "The field registry is the approved list of Surpluss inventory meanings. Each field has aliases, expected datatype and basic rules." },
      {
        kind: "example",
        title: "Registry entry for Available quantity",
        rows: [
          ["Aliases", "available stock · av stk · available qty · closing stock · stock available"],
          ["Header “AV STK”", "candidate: Available quantity · evidence: exact alias"],
        ],
      },
      {
        kind: "list",
        title: "Score impact",
        items: [
          "Exact safe alias: usually +4",
          "Ambiguous alias like rate: weak candidate only",
          "Datatype mismatch later can still block it",
        ],
      },
      { kind: "grows", text: "When several different sellers confirm the same header to field mapping, it can be promoted into the shared alias list. A brand-new seller then benefits on their first upload." },
    ],
  },

  l3: {
    heading: "Confirmed mapping memory",
    sections: [
      { kind: "text", text: "This step checks confirmed imports. It uses memory only after a previous import was completed or committed." },
      { kind: "viz", name: "history" },
      { kind: "why", text: "Seller history is strongest because it captures one supplier’s language. Global and semantic history help when the seller is new, but they do not decide alone." },
    ],
  },

  router: {
    heading: "Spend effort only where it is needed",
    sections: [
      { kind: "viz", name: "router" },
      { kind: "why", text: "Clear columns stay fast. Ambiguous columns receive deeper reasoning. Unknown columns are preserved instead of being forced into the schema." },
    ],
  },

  l4: {
    heading: "Catch spelling near misses",
    sections: [
      { kind: "text", text: "Fuzzy matching catches headers that are close to known aliases but not exact." },
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
        title: "Score impact",
        items: [
          "Very close spelling match: usually +1",
          "Low similarity: no points",
          "Ambiguous word like price: creates candidates, not a decision",
        ],
      },
      { kind: "grows", text: "The list it compares against grows with every promoted alias and every confirmed seller header." },
    ],
  },

  l5: {
    heading: "Look at the actual values",
    sections: [
      { kind: "text", text: "A header can be vague or wrong. Value profiling checks the cells under the header." },
      {
        kind: "example",
        title: "What the values reveal",
        rows: [
          ["GST · 5, 12, 18, 18, 5", "percentage / tax"],
          ["EAN · 8901030895484, 8901491101834", "product identifier"],
          ["Rate · 145.00, 320.50, 89.00", "a price, but which price?"],
        ],
      },
      { kind: "viz", name: "evidence" },
      {
        kind: "list",
        title: "Score impact",
        items: [
          "Values fit the candidate field: usually +2",
          "Values are weak but possible: usually +1",
          "Values contradict the field type: blocker, usually -4",
        ],
      },
      { kind: "grows", text: "The expected shape of each field is tuned on real columns, so the profiles get sharper as more inventories are imported." },
    ],
  },

  scorer: {
    heading: "Turn clues into a score",
    sections: [
      { kind: "text", text: "The scorer takes one source column and asks: which Surpluss field is most likely?" },
      { kind: "example", title: "Column being scored", rows: [["Header", "PTR"], ["Values", "145, 220, 88"], ["Nearby column", "MRP"], ["Candidates", "Offer price, Purchase price, MRP"]] },
      { kind: "text", text: "Each evidence source that the router unlocked adds or subtracts points. We start with a simple baseline." },
      { kind: "viz", name: "witnesses" },
      { kind: "text", text: "Now apply that baseline to PTR." },
      { kind: "viz", name: "votes" },
      {
        kind: "list",
        title: "What the scorer returns",
        items: [
          "Winning field: Offer price",
          "Total score: 9",
          "Next best score: 3",
          "Margin: 6 points",
          "Reason: alias, price-like values, lower than MRP, similar confirmed examples",
        ],
      },
      {
        kind: "list",
        title: "How this moves forward",
        items: [
          "High total and clear margin: send to confidence gate for possible auto-map",
          "Close scores: ask the user",
          "Any blocker: do not auto-map",
        ],
      },
      { kind: "grows", text: "The +4/+2/+1 baseline is the starting policy. Later, confirmed imports are used offline to calibrate it: evidence that often predicts correct mappings can be strengthened, and evidence that causes corrections is weakened." },
    ],
  },

  resolver: {
    sections: [
      { kind: "text", text: "The scorer gives candidate scores for each column. The resolver uses those scores to choose a sheet-wide mapping that makes sense together." },
      { kind: "example", title: "Why it comes after scoring", rows: [["Before scorer", "We only have raw columns and clues"], ["After scorer", "Every column has candidate fields with points"], ["Resolver job", "Pick the best non-conflicting combination"]] },
      { kind: "viz", name: "resolver" },
      {
        kind: "list",
        title: "Rules it applies after scores exist",
        items: [
          "Do not assign the same target field twice unless the field allows it",
          "MRP should generally be greater than or equal to offer price",
          "A percentage column cannot become a quantity; a date column cannot become a price",
          "Required fields are identified and flagged when missing",
          "Conflicting assignments reduce confidence rather than being forced",
        ],
      },
      { kind: "text", text: "We do not run the resolver before the scorer because it needs numbers to compare. Without candidate scores, it cannot know whether RATE should be MRP, Offer price, Purchase price or unknown." },
      { kind: "note", text: "A value relationship can support a mapping. MRP ≥ offer price supports the chosen pair, but it never proves one on its own." },
      { kind: "why", text: "The engine understands columns as a group, not as isolated labels." },
    ],
  },

  gate: {
    heading: "Choose the safest route",
    sections: [
      { kind: "text", text: "The scorer and resolver tell us the current best mapping. The gate decides what should happen next." },
      { kind: "example", title: "Input to the gate", rows: [["Column", "PTR"], ["Winner", "Offer price"], ["Score", "+9"], ["Margin", "+6"], ["Blockers", "none from Layer 5, resolver or validation"]] },
      { kind: "viz", name: "confidence" },
      { kind: "text", text: "The gate is not another AI model. It is a safety checklist." },
      {
        kind: "list",
        title: "Auto-map only when",
        items: [
          "Score is high enough",
          "Winner is clearly ahead of the next candidate",
          "At least one reliable source supports it",
          "Layer 5 says values fit the selected field",
          "Whole-sheet resolver says there is no duplicate field conflict",
          "Validation says no business rule fails",
        ],
      },
      { kind: "text", text: "If any check is weak, the engine does not silently import. It either asks AI for one more constrained clue, asks the user, or leaves the column unmapped." },
      { kind: "viz", name: "gate" },
      { kind: "why", text: "Uncertainty is handled openly instead of being hidden behind a confident-looking guess." },
      { kind: "grows", text: "The rules start strict and loosen only as real corrections show where automation is safe." },
    ],
  },

  auto: {
    heading: "Auto-map when it is safe",
    sections: [
      { kind: "text", text: "This route is used only after the gate passes. The user is not interrupted for obvious columns." },
      {
        kind: "list",
        title: "What must be true",
        items: ["High score", "Clear margin", "Layer 5 values fit", "Resolver finds no duplicate conflict", "Validation finds no business blocker"],
      },
      { kind: "example", title: "Example", rows: [["M.R.P.", "MRP. Exact alias, valid prices, no conflict"]] },
      { kind: "note", text: "Auto-mapped columns are still shown in the one-glance summary before anything is imported." },
    ],
  },

  ai: {
    heading: "AI is a fallback, not the foundation",
    sections: [
      { kind: "text", text: "AI runs only when deterministic evidence is not enough. It does not receive the whole workbook." },
      { kind: "viz", name: "embedding" },
      { kind: "viz", name: "ai" },
      {
        kind: "list",
        title: "How AI affects scoring",
        items: [
          "Embedding retrieval creates a shortlist",
          "The model can only choose from approved fields or unknown",
          "AI evidence is usually +1 unless other layers agree",
          "AI confidence is not used as our confidence",
          "The result returns to the scorer and gate",
        ],
      },
      { kind: "grows", text: "As aliases and seller memory grow, fewer columns ever reach this route." },
    ],
  },

  user: {
    heading: "Show one useful question",
    sections: [
      { kind: "text", text: "This route is used when the gate cannot safely auto-map. The user sees one focused question, not every column." },
      { kind: "viz", name: "question" },
      { kind: "list", title: "What happens after the answer", items: ["Confirm: mapping can be used for this import", "Choose another: rejected candidate is recorded", "Leave unmapped: raw data is preserved in extra attributes"] },
      { kind: "why", text: "One good question beats twenty-seven dropdowns." },
    ],
  },

  remember: {
    heading: "The next import gets easier",
    sections: [
      { kind: "text", text: "Learning happens only after a successful import. A temporary suggestion is not enough." },
      { kind: "viz", name: "storage" },
      {
        kind: "list",
        title: "Learning rules",
        items: [
          "Auto-mapped and imported: usage count goes up",
          "Explicitly confirmed by a person: confirmation count goes up",
          "Corrected by a person: confirmed and rejected fields are stored",
          "Import abandoned or validation failed: nothing is learned",
        ],
      },
      { kind: "text", text: "Learning has two levels: memory for future imports and offline calibration for scorer weights." },
      { kind: "viz", name: "learning" },
      { kind: "viz", name: "uploads" },
      { kind: "why", text: "An unconfirmed suggestion never becomes a fact." },
    ],
  },

  output: {
    heading: "Consistent data, whatever the original format",
    sections: [
      { kind: "text", text: "After mapping is approved, each supplier column has a Surpluss meaning. The row importer can now normalize and save the inventory." },
      { kind: "viz", name: "output" },
      { kind: "note", text: "Unmapped columns are not thrown away. They stay traceable as raw source data or extra attributes." },
    ],
  },
};

export const GATE_QUOTE = "The goal is not to automate every decision. The goal is to automate only the decisions we can defend.";
