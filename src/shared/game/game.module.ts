import { Module } from '@nestjs/common';
import { ApiModule } from '../api';
import { DbModule } from '../db';

@Module({
  imports: [ApiModule, DbModule],
})
export class GameModule {}
