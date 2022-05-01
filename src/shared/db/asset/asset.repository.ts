import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './asset.schema';

@Injectable()
export class AssetRepository {
  constructor(
    @InjectRepository(Asset)
    public assetRepository: Repository<Asset>,
  ) {}

  async findLatest(): Promise<Asset> {
    const results = await this.assetRepository.find({
      order: { updated_at: 'DESC' },
      take: 1,
    });

    if (!results?.length) {
      return undefined;
    }

    return results[0];
  }

  async save(models: Asset[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.assetRepository.upsert(models, ['id']);
  }
}
