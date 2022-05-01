import { Module } from '@nestjs/common';
import { ApiModule } from '../api';
import { DbModule } from '../db';
import { GameModule } from '../game/game.module';
import { AssetProcessor, OrderProcessor } from './processors';
import { MarketProcessor } from './processors/market.processor';
import { QueueEventsService } from './queue-events.service';

@Module({
  imports: [ApiModule, DbModule, GameModule],
  providers: [
    AssetProcessor,
    MarketProcessor,
    OrderProcessor,
    QueueEventsService,
  ],
})
export class QueueModule {}
