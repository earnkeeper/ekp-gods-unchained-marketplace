import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class MarketDocument extends DocumentDto {
  constructor(properties: MarketDocument) {
    super(properties);
  }

  readonly cardArtUrl: string;
  readonly attack: number;
  readonly fiatSymbol?: string;
  readonly god: string;
  readonly health: number;
  readonly lowPrice: number;
  readonly lowPriceFiat?: number;
  readonly mana: number;
  readonly name: string;
  readonly quantity: number;
  readonly rarity: string;
  readonly set: string;
  readonly type: string;
}
