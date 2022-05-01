import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CacheService, CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { CACHE_MARKET_DOCUMENTS } from '../../shared/queue';
import { MarketDocument } from './ui/market.document';

@Injectable()
export class MarketService {
  constructor(
    private cacheService: CacheService,
    private coingeckoService: CoingeckoService,
  ) {}

  async getMarketDocuments(currency: CurrencyDto): Promise<MarketDocument[]> {
    const documents = await this.cacheService.get<MarketDocument[]>(
      CACHE_MARKET_DOCUMENTS,
    );

    if (!documents?.length) {
      return [];
    }

    const prices = await this.coingeckoService.latestPricesOf(
      ['ethereum'],
      currency.id,
    );

    const ethPrice = prices.find((it) => it.coinId === 'ethereum');

    return _.chain(documents)
      .map((document) => ({
        ...document,
        fiatSymbol: currency.symbol,
        lowPriceFiat: ethPrice.price * document.lowPrice,
      }))
      .value();
  }
}
