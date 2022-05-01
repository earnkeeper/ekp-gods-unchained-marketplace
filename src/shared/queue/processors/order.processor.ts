import {
  ApmService,
  logger,
  SCHEDULER_QUEUE,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Process, Processor } from '@nestjs/bull';
import _ from 'lodash';
import { ApiService } from '../../api';
import { OrderRepository } from '../../db';
import { OrderMapper } from '../../game';
import { PROCESS_ORDERS } from '../constants';

const PAGE_SIZE = 200;

@Processor(SCHEDULER_QUEUE)
export class OrderProcessor {
  constructor(
    private apiService: ApiService,
    private apmService: ApmService,
    private orderRepository: OrderRepository,
  ) {}

  @Process(PROCESS_ORDERS)
  async processOrders() {
    try {
      const latestOrder = await this.orderRepository.findLatest();

      let latestUpdatedTimestamp = latestOrder?.updated_timestamp;

      while (true) {
        const orderDtos = await this.apiService.getOrders(
          latestUpdatedTimestamp,
          PAGE_SIZE,
        );

        if (!orderDtos?.length) {
          break;
        }

        const orders = _.chain(orderDtos)
          .map((orderDto) => OrderMapper.mapToOrder(orderDto))
          .value();

        await this.orderRepository.save(orders);

        if (orders.length < PAGE_SIZE) {
          break;
        }

        latestUpdatedTimestamp = _.chain(orders)
          .map((order) => order.updated_timestamp)
          .max()
          .value();
      }
    } catch (error) {
      this.apmService.captureError(error);
      logger.error(error);
    }
  }
}
