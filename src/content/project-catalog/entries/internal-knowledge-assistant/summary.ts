import type { CatalogEntrySummary } from "../../types";

export const INTERNAL_KNOWLEDGE_ASSISTANT: CatalogEntrySummary = {
  id: "internal-knowledge-assistant",
  title: "Internal knowledge AI Agent",
  purpose: "Answer employee questions from approved internal procedures and guides.",
  category: "operations",
  toolsLine:
    "n8n / Internal chat / Document storage / Vector search / SQL database / Google Sheets / AI agent",
  problem:
    "Employees need answers buried across internal procedures and guides. A search can miss the current instruction, while an unsupported answer can send work the wrong way.",
  built:
    "An interactive workflow model showing how an AI agent answers employee questions from approved documents, records question outcomes, and prepares an FAQ and knowledge-gap report.",
  hardPart:
    "Keeping answers tied to one approved document snapshot while separating missing guidance from answers employees repeatedly need help finding.",
  phases: [
    {
      id: "P1",
      title: "Refresh approved knowledge",
      description:
        "Build a searchable snapshot of approved documents and switch to it only after the refresh passes checks.",
    },
    {
      id: "P2",
      title: "Receive the employee question",
      description:
        "Take the question from internal chat without opening the knowledge base to public visitors.",
    },
    {
      id: "P3",
      title: "Find supporting information",
      description: "Search the active document snapshot for passages that address the question.",
    },
    {
      id: "P4",
      title: "Return a sourced answer",
      description:
        "Answer with document references, or say what cannot be confirmed and where to ask.",
    },
    {
      id: "P5",
      title: "Prepare the knowledge report",
      description:
        "Group related questions, count distinct verified employees, and flag missing or repeatedly sought guidance for review.",
    },
  ],
};
