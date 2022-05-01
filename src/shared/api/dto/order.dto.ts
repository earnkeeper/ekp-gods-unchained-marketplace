export type OrderDto = Readonly<{
  order_id: number;
  status: string;
  user: string;
  sell: Readonly<{
    type: string;
    data: Readonly<{
      token_id: string;
      id: string;
      token_address: string;
      quantity: string;
      properties: Readonly<{
        name: string;
        image_url: string;
        collection: {
          name: string;
          icon_url: string;
        };
      }>;
    }>;
  }>;
  buy: Readonly<{
    type: string;
    data: Readonly<{
      token_address: string;
      decimals: number;
      quantity: string;
    }>;
  }>;
  amount_sold: number;
  expiration_timestamp: string;
  timestamp: string;
  updated_timestamp: string;
}>;
