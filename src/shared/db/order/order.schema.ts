import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryColumn()
  readonly id: number;

  @Column()
  readonly user: string;

  @Column()
  readonly token_id: string;

  @Column()
  readonly quantity: number;

  @Column({ nullable: true })
  readonly name?: string;

  @Column()
  readonly buy_token_address: string;

  @Column()
  readonly buy_token_decimals: number;

  @Column()
  readonly buy_token_quantity: string;

  @Column({ nullable: true })
  readonly amount_sold?: number;

  @Column()
  readonly timestamp: string;

  @Index()
  @Column()
  readonly updated_timestamp: string;

  @Column({ nullable: true })
  readonly expiration_timestamp?: string;

  readonly proto?: number;

  readonly quality?: number;
}
