import { WrappedInt64Dto, WrappedStringDto } from './wrapped-types.dto';

export type ProtoDto = Readonly<{
  id: number;
  name: string;
  effect: string;
  god: string;
  rarity: string;
  tribe: WrappedStringDto;
  mana: number;
  attack: WrappedInt64Dto;
  health: WrappedInt64Dto;
  type: string;
  set: string;
  collectable: boolean;
  live: boolean;
  art_id: string;
  lib_id: string;
}>;
