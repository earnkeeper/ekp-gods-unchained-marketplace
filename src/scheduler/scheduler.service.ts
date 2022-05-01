import { SCHEDULER_QUEUE } from '@earnkeeper/ekp-sdk-nestjs';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { RedisService } from 'nestjs-redis';
import {
  PROCESS_ASSETS,
  PROCESS_MARKET,
  PROCESS_ORDERS,
} from '../shared/queue/constants';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectQueue(SCHEDULER_QUEUE) private queue: Queue,
    private redisService: RedisService,
  ) {}

  async onModuleInit() {
    const client = this.redisService.getClient('DEFAULT_CLIENT');
    await client.flushall();
    await client.flushdb();

    await this.addJob(PROCESS_ORDERS, {}, 5000, PROCESS_ORDERS);
    await this.addJob(PROCESS_ASSETS, {}, 5000, PROCESS_ASSETS);
    await this.addJob(PROCESS_MARKET, {}, 5000, PROCESS_MARKET);
  }

  @Cron('0 */10 * * * *')
  async every10minutes() {
    await this.addJob(PROCESS_ORDERS, {}, 5000, PROCESS_ORDERS);
    await this.addJob(PROCESS_ASSETS, {}, 5000, PROCESS_ASSETS);
    await this.addJob(PROCESS_MARKET, {}, 5000, PROCESS_MARKET);
  }

  private async addJob<T>(
    jobName: string,
    data?: T,
    delay = 0,
    jobId?: string,
  ) {
    try {
      if (!!jobId) {
        await this.queue.add(jobName, data, {
          jobId,
          removeOnComplete: true,
          removeOnFail: true,
          delay,
        });
      } else {
        await this.queue.add(jobName, data, {
          removeOnComplete: true,
          removeOnFail: true,
          delay,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
