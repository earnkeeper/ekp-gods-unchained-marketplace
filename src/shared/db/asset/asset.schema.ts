import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'assets' })
export class Asset {
  @PrimaryColumn()
  readonly id: string;

  @Index()
  @Column()
  readonly proto: number;

  @Column()
  readonly quality: string;

  @Index()
  @Column()
  readonly updated_at: string;
}
