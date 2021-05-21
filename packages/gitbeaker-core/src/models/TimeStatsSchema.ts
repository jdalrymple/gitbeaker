export interface TimeStatsSchema extends Record<string, unknown> {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate: string;
  human_total_time_spent: string;
}
