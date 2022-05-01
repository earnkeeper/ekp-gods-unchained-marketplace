import { OrderDto } from '../../api';
import { Order } from '../../db';

export class OrderMapper {
  static mapToOrder(orderDto: OrderDto): Order {
    return {
      amount_sold: orderDto.amount_sold,
      buy_token_address: orderDto.buy?.data?.token_address,
      buy_token_decimals: orderDto.buy?.data?.decimals,
      buy_token_quantity: orderDto.buy?.data?.quantity,
      expiration_timestamp: orderDto.expiration_timestamp,
      id: orderDto.order_id,
      name: orderDto.sell?.data?.properties?.name,
      quantity: Number(orderDto.sell?.data?.quantity),
      timestamp: orderDto.timestamp,
      token_id: orderDto.sell?.data?.token_id,
      updated_timestamp: orderDto.updated_timestamp,
      user: orderDto.user,
    };
  }
}
