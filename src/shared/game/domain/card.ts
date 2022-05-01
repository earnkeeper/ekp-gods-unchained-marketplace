import { Prototype } from './prototype';

export type Card = Readonly<{
  prototype: Prototype;
  purity: number;
}>;
