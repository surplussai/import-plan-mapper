import type { NodeId } from "./content";

export interface Scenario {
  id: string;
  title: string;
  column: string;
  path: NodeId[];
  steps: string[];
  message: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "known",
    title: "Known header",
    column: "M.R.P.",
    path: ["input", "l0", "l1", "l2", "l5", "scorer", "resolver", "gate", "auto", "remember", "output"],
    steps: ["Normalized to “mrp”", "Exact alias exists in the registry", "Values are valid prices", "No conflict with other columns", "Auto-mapped to MRP"],
    message: "Easy, well-understood columns move through silently.",
  },
  {
    id: "returning",
    title: "Returning supplier",
    column: "AV STK",
    path: ["input", "l0", "l1", "l3", "l5", "scorer", "resolver", "gate", "auto", "remember", "output"],
    steps: ["This seller previously confirmed Available quantity — seller history wins over everything else", "Values are whole numbers", "No conflict", "Auto-mapped"],
    message: "The engine remembers the supplier’s language, so repeat imports become easier.",
  },
  {
    id: "ambiguous",
    title: "Ambiguous column",
    column: "PTR",
    path: ["input", "l0", "l1", "l2", "l5", "scorer", "resolver", "gate", "user", "remember", "output"],
    steps: [
      "Alias suggests Offer price",
      "Values show it is a price",
      "MRP exists beside it, and MRP values are higher",
      "Offer price becomes the strongest candidate",
      "First time seen — not enough for auto-mapping",
      "One question is asked; after confirmation, PTR → Offer price is stored for this seller",
    ],
    message: "The engine collects enough evidence to ask a useful question instead of guessing.",
  },
  {
    id: "conflict",
    title: "Conflicting prices",
    column: "MRP · RATE · PRICE",
    path: ["input", "l0", "l1", "l5", "scorer", "resolver", "gate", "user", "remember", "output"],
    steps: [
      "All three columns look price-related",
      "Judged alone, each could claim MRP",
      "The resolver forbids the same target twice and finds the best sheet-wide assignment",
      "MRP → MRP, RATE → Offer price; PRICE stays open",
      "Anything still ambiguous is reviewed",
    ],
    message: "The engine understands columns as a group, not as isolated labels.",
  },
  {
    id: "abandoned",
    title: "Abandoned import",
    column: "any",
    path: ["input", "l0", "l1", "l2", "l5", "scorer", "resolver", "gate", "user"],
    steps: ["Suggestions are shown", "The user closes the import without confirming", "Nothing is written into seller memory"],
    message: "An unconfirmed suggestion never becomes a fact.",
  },
];
