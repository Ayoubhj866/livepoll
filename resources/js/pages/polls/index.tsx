import { useState } from "react";
import { Plus } from "lucide-react";
import PollCard from "@/components/poll/poll-card";
import { Poll, PollStatus } from "@/types/poll";

/**
 * Polls/Index — creator dashboard listing every poll they've created.
 * Card rendering lives in components/poll/poll-card.tsx; this page owns
 * layout, filtering, and data. All colors come from the shadcn theme
 * (bg-background, text-foreground, bg-primary, etc.) — no custom hex values.
 */

const MOCK_POLLS: Poll[] = [
  {
    id: 1,
    uuid: "a1b2",
    question: "Quel framework backend préfères-tu ?",
    status: "live",
    totalVotes: 184,
    endsAt: "2 août 2026",
    topOption: { label: "Laravel", percentage: 62 },
  },
  {
    id: 2,
    uuid: "c3d4",
    question: "Ton éditeur de code au quotidien ?",
    status: "live",
    totalVotes: 97,
    endsAt: "30 juil. 2026",
    topOption: { label: "VS Code", percentage: 48 },
  },
  {
    id: 3,
    uuid: "e5f6",
    question: "Meilleur moment pour la réunion d'équipe ?",
    status: "scheduled",
    totalVotes: 0,
    endsAt: "Débute le 1 août 2026",
    topOption: null,
  },
  {
    id: 4,
    uuid: "g7h8",
    question: "Faut-il migrer vers Laravel 12 ce trimestre ?",
    status: "ended",
    totalVotes: 312,
    endsAt: "Clôturé le 20 juil. 2026",
    topOption: { label: "Oui", percentage: 71 },
  },
];

type FilterKey = "all" | PollStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "scheduled", label: "Scheduled" },
  { key: "ended", label: "Ended" },
];

interface PollsIndexProps {
  polls?: Poll[];
}

export default function PollsIndex({ polls = MOCK_POLLS }: PollsIndexProps) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const filtered = filter === "all" ? polls : polls.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full mx-auto p-4">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-foreground">My Polls</h1>
            <p className="text-sm text-muted-foreground">
              {polls.length} created {polls.length > 1 ? "s" : ""} polls{polls.length > 1 ? "s" : ""}
            </p>
          </div>

          <a
            href="/polls/create"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus size={16} />
            New Poll
          </a>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                filter === f.key
                  ? "bg-secondary text-secondary-foreground border-border"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl max-w-3xl mx-auto border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              Any poll in this category. Create a new one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
