import { AbstractApiService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import axios from 'axios-https-proxy-fix';
import { AssetDto, CardDto } from './dto';
import { ProtoDto } from './dto/proto.dto';
//URL for API
const BASE_URL = 'https://api.godsunchained.com/v0/';
const IMX_URL = 'https://api.x.immutable.com/v1/';

@Injectable()
export class ApiService extends AbstractApiService {
  private readonly proxy: { host: string; port: number };

  constructor() {
    super({
      name: 'GodsUnchainedApiService',
    });

    if (process.env.PROXY_HOST) {
      this.proxy = {
        host: process.env.PROXY_HOST,
        port: !!process.env.PROXY_PORT ? Number(process.env.PROXY_PORT) : 3128,
      };
    }
  }

  async getOrders(
    updatedMinTimestamp?: string,
    pageSize = 200,
    status = 'active',
  ) {
    let url = `${IMX_URL}orders?sell_token_address=0xacb3c6a43d15b907e8433077b6d38ae40936fe2c&page_size=${pageSize}&order_by=updated_at&direction=asc&status=${status}`;

    if (!!updatedMinTimestamp) {
      url = `${url}&updated_min_timestamp=${updatedMinTimestamp}`;
    }

    return this.handleCall({ url }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });

      return response.data.result;
    });
  }

  async getAssets(
    updatedMinTimestamp?: string,
    pageSize = 200,
  ): Promise<AssetDto[]> {
    let url = `${IMX_URL}assets?collection=0xacb3c6a43d15b907e8433077b6d38ae40936fe2c&page_size=${pageSize}&order_by=updated_at&direction=asc`;

    if (!!updatedMinTimestamp) {
      url = `${url}&updated_min_timestamp=${updatedMinTimestamp}`;
    }

    return this.handleCall({ url }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });

      return response.data.result;
    });
  }

  async fetchCards(playerAddress: string): Promise<CardDto[]> {
    const url = `${BASE_URL}card?user=${playerAddress}`;

    return this.handleCall({ url, ttl: 15 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }

  async fetchAllCards(): Promise<CardDto[]> {
    const url = `${BASE_URL}card?perPage=105315`;

    return this.handleCall({ url, ttl: 15 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }

  async fetchAllProtos(): Promise<ProtoDto[]> {
    const url = `${BASE_URL}proto?perPage=10000`;

    return this.handleCall({ url, ttl: 86400 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }
  async fetchProtos(): Promise<ProtoDto[]> {
    const url = `${BASE_URL}proto?perPage=10000`;
    return this.handleCall({ url, ttl: 86400 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }
}
