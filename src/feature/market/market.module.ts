import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { MarketController } from './market.contoller';
import { MarketService } from './market.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [MarketController, MarketService],
})
export class MarketModule {}
