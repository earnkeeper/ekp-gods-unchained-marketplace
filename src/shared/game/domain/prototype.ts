export type Prototype = Readonly<{
  id: number;
  name: string;
  effect: string;
  god: string;
  rarity: string;
  tribe: string;
  mana: number;
  attack: number;
  health: number;
  type: string;
  set: string;
  collectable: boolean;
  live: boolean;
  artId: string;
  libId: string;
}>;
