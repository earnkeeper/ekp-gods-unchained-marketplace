export type AssetDto = Readonly<{
  token_address: string;
  token_id: string;
  id: string;
  user: string;
  status: string;
  uri: string;
  name: string;
  description: string;
  image_url: string;
  metadata: {
    god: string;
    set: string;
    mana: number;
    name: string;
    type: string;
    image: string;
    proto: number;
    tribe: string;
    attack: number;
    effect: string;
    health: number;
    rarity: string;
    quality: string;
  };
  collection: {
    name: string;
    icon_url: string;
  };
  created_at: string;
  updated_at: string;
}>;
