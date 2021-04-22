export type TStarShip = {
  name: string
  cargo_capacity: number | 'unknown'
  consumables: [string, number] | [string, string]
  cost_in_credits: number | 'unknown'
  crew: number | 'unknown'
  length: number | 'unknown'
  max_atmosphering_speed: number | 'unknown'
  passengers: number | 'unknown'
}
