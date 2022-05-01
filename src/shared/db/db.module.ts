import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset, AssetRepository } from './asset';
import { Order, OrderRepository } from './order';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Order])],
  providers: [AssetRepository, OrderRepository],
  exports: [AssetRepository, OrderRepository],
})
export class DbModule {}
