import { Users, Calendar, Radio, Clock3, CheckCircle2, ArrowUpRight, LucideIcon } from "lucide-react";
import { Poll, PollStatus } from "@/types/poll";

/**
 * PollCard — a single poll rendered as a raffle/ballot ticket stub.
 * A perforated tear-line separates the question from its live stats,
 * echoing the app's own subject matter (voting) rather than a generic card.
 *
 * Colors come exclusively from shadcn's semantic tokens (bg-card, text-muted-foreground,
 * chart-1/chart-2 for status accents, etc.) — no hardcoded hex values.
 */

interface StatusConfigEntry {
  label: string;
  icon: LucideIcon;
  badgeClass: string; // background + text color for the status pill
  textClass: string; // text-only color, reused for the vote percentage
  dotClass: string; // background color for the live pulse dot / progress bar
}

export const STATUS_CONFIG: Record<PollStatus, StatusConfigEntry> = {
  live: {
    label: "Live",
    icon: Radio,
    badgeClass: "bg-chart-1/10 text-chart-1",
    textClass: "text-chart-1",
    dotClass: "bg-chart-1",
  },
  scheduled: {
    label: "Scheduled",
    icon: Clock3,
    badgeClass: "bg-chart-2/10 text-chart-2",
    textClass: "text-chart-2",
    dotClass: "bg-chart-2",
  },
  ended: {
    label: "Ended",
    icon: CheckCircle2,
    badgeClass: "bg-muted text-muted-foreground",
    textClass: "text-muted-foreground",
    dotClass: "bg-muted-foreground",
  },
};

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  const config = STATUS_CONFIG[poll.status] ?? STATUS_CONFIG.ended;
  const StatusIcon = config.icon;
  const isLive = poll.status === "live";

  return (
    <div className="relative bg-card text-card-foreground rounded-2xl overflow-hidden border border-border hover:bg-accent/40 transition-colors">
      {/* Info zone */}
      <div className="p-5 pb-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.badgeClass}`}
          >
            {isLive ? (
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotClass}`}
                />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dotClass}`} />
              </span>
            ) : (
              <StatusIcon size={12} />
            )}
            {config.label}
          </span>

          <a
            href={`/poll/${poll.uuid}/results`}
            className="text-xs flex items-center gap-1 text-muted-foreground opacity-70 hover:opacity-100 hover:text-foreground transition-opacity"
          >
            Results
            <ArrowUpRight size={13} />
          </a>
        </div>

        <h3 className="text-lg font-semibold leading-snug mb-4 text-foreground">{poll.question}</h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={13} />
          <span>{poll.endsAt}</span>
        </div>
      </div>

      {/* Perforated tear-line */}
      <div className="relative h-0">
        <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-background" />
        <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-background" />
        <div className="mx-5 border-t border-dashed border-border" />
      </div>

      {/* Stats stub */}
      <div className="p-5 pt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users size={13} />
            <span className="text-xs">Votes</span>
          </div>
          <span className="text-base font-mono tabular-nums text-foreground">{poll.totalVotes}</span>
        </div>

        {poll.topOption ? (
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="text-muted-foreground">{poll.topOption.label}</span>
              <span className={`font-mono ${config.textClass}`}>{poll.topOption.percentage}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${config.dotClass}`}
                style={{ width: `${poll.topOption.percentage}%` }}
              />
            </div>
          </div>
        ) : (
          <p className="text-xs italic text-muted-foreground">Pending for the first vote.</p>
        )}
      </div>
    </div>
  );
}
