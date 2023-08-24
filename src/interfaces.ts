interface Multipliers {
  [key: string]: string
}
interface GameResultPayloadData {
  phase: "GameResult",
  balance: number,
  multipliers: Multipliers,
  payout: number,
}
interface BetsClosedPayloadData {
  phase: "BetsClosed",
  balance: number,
}
interface BetsOpenPayloadData {
  phase: "BetsOpen",
  balance: number,
}
export interface ResponseData {
  type: string,
  payload: BetsOpenPayloadData | BetsClosedPayloadData | GameResultPayloadData,
}