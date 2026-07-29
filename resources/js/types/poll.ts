export type PollStatus = "live" | "scheduled" | "ended";

export interface TopOption {
  label: string;
  percentage: number;
}

export interface Poll {
  id: number;
  uuid: string;
  question: string;
  status: PollStatus;
  totalVotes: number;
  endsAt: string;
  topOption: TopOption | null;
}
