import {
  ApmService,
  CacheService,
  CoingeckoService,
  logger,
  SCHEDULER_QUEUE,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Process, Processor } from '@nestjs/bull';
import { ethers } from 'ethers';
import _ from 'lodash';
import moment from 'moment';
import { MarketDocument } from '../../../feature/market/ui/market.document';
import { ApiService } from '../../api';
import { OrderRepository } from '../../db';
import { CardMapper, Prototype } from '../../game';
import { CACHE_MARKET_DOCUMENTS, PROCESS_MARKET } from '../constants';

@Processor(SCHEDULER_QUEUE)
export class MarketProcessor {
  constructor(
    private apiService: ApiService,
    private apmService: ApmService,
    private cacheService: CacheService,
    private orderRepository: OrderRepository,
    private coingeckoService: CoingeckoService,
  ) {}

  @Process(PROCESS_MARKET)
  async processMarket() {
    try {
      const orders = await this.orderRepository.findOrdersWithAssets();

      const protoDtos = await this.apiService.fetchAllProtos();

      const prototypesById: Record<number, Prototype> = _.chain(protoDtos)
        .keyBy('id')
        .mapKeys((_value, key) => Number(key))
        .mapValues((protoDto) => CardMapper.mapToPrototype(protoDto))
        .value();

      const now = moment().unix();

      const documents = _.chain(orders)
        .groupBy('proto')
        .mapValues((orders) => {
          const proto = orders[0].proto;

          const prototype = prototypesById[proto];

          if (!prototype) {
            logger.warn(`Could not find prototype for id: ${proto}`);
            return undefined;
          }

          const lowPrice = _.chain(orders)
            .map((order) =>
              Number(
                ethers.utils.formatUnits(
                  order.buy_token_quantity,
                  order.buy_token_decimals,
                ),
              ),
            )
            .min()
            .value();

          const quantity = _.chain(orders)
            .map((order) => order.quantity)
            .sum()
            .value();

          const document: MarketDocument = {
            id: prototype.id.toString(),
            updated: now,
            cardArtUrl: `https://images.godsunchained.com/art2/500/${prototype.id?.toString()}.webp`,
            attack: prototype.attack,
            god: _.startCase(prototype.god),
            health: prototype.health,
            mana: prototype.mana,
            name: prototype.name,
            rarity: _.startCase(prototype.rarity),
            set: _.startCase(prototype.set),
            type: _.startCase(prototype.type),
            lowPrice,
            quantity,
          };

          return document;
        })
        .values()
        .filter((document) => !!document)
        .value();

      await this.cacheService.set(CACHE_MARKET_DOCUMENTS, documents);
    } catch (error) {
      this.apmService.captureError(error);
      logger.error(error);
    }
  }
}
