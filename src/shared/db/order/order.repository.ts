import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    public orderRepository: Repository<Order>,
  ) {}

  async findOrdersWithAssets(): Promise<Order[]> {
    return this.orderRepository.query(
      'select o.*, a.proto, a.quality from "orders" o join assets a on o.token_id = a.id',
    );
  }

  async findLatest(): Promise<Order> {
    const results = await this.orderRepository.find({
      order: { updated_timestamp: 'DESC' },
      take: 1,
    });

    if (!results?.length) {
      return undefined;
    }

    return results[0];
  }

  async save(models: Order[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.orderRepository.upsert(models, ['id']);
  }
}
