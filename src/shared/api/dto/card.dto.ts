import { WrappedInt64Dto } from './wrapped-types.dto';

export type CardDto = Readonly<{
  id: WrappedInt64Dto;
  user: string;
  proto: number;
  purity: number;
}>;
