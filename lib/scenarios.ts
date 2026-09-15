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
    path: ["input", "l0", "l1", "l2", "l3", "router", "scorer", "resolver", "gate", "auto", "remember", "output"],
    steps: ["Normalized to “mrp”", "Exact alias gives trusted evidence", "The router sees a clear winner and no contradiction", "Fuzzy, deep profiling and AI are skipped", "The resolver confirms no conflict", "Auto-mapped to MRP"],
    message: "Easy columns take the short path, while the global check remains in place.",
  },
  {
    id: "returning",
    title: "Returning supplier",
    column: "AV STK",
    path: ["input", "l0", "l1", "l2", "l3", "router", "scorer", "resolver", "gate", "auto", "remember", "output"],
    steps: ["This seller previously confirmed Available quantity", "Seller history gives trusted +4 evidence", "The router sees a clear margin and takes the short path", "The resolver confirms no conflict", "Auto-mapped"],
    message: "Confirmed seller language makes repeat imports both faster and safer.",
  },
  {
    id: "ambiguous",
    title: "Ambiguous column",
    column: "PTR",
    path: ["input", "l0", "l1", "l2", "l3", "router", "l4", "l5", "scorer", "resolver", "gate", "user", "remember", "output"],
    steps: [
      "Alias suggests Offer price",
      "The router sees competing price meanings, so it unlocks deeper evidence",
      "Values show it is a price",
      "MRP exists beside it, and MRP values are higher",
      "Offer price becomes the strongest candidate",
      "First time seen, so not enough for auto-mapping",
      "One question is asked; after confirmation, PTR → Offer price is stored for this seller",
    ],
    message: "The engine collects enough evidence to ask a useful question instead of guessing.",
  },
  {
    id: "conflict",
    title: "Conflicting prices",
    column: "MRP · RATE · PRICE",
    path: ["input", "l0", "l1", "l2", "l3", "router", "l4", "l5", "scorer", "resolver", "gate", "user", "remember", "output"],
    steps: [
      "All three columns look price-related",
      "The router sends the price group through deeper evidence",
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
    path: ["input", "l0", "l1", "l2", "l3", "router", "l4", "l5", "scorer", "resolver", "gate", "user"],
    steps: ["Suggestions are shown", "The user closes the import without confirming", "Nothing is written into seller memory"],
    message: "An unconfirmed suggestion never becomes a fact.",
  },
];
