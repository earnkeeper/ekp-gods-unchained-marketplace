import _ from 'lodash';
import { CardDto, ProtoDto } from '../../../shared/api';
import { Card, Prototype } from '../domain';

export class CardMapper {
  static mapToCard(
    cardDto: CardDto,
    protoMap: Record<number, Prototype>,
  ): Card {
    const prototype = protoMap[cardDto.proto];

    return {
      prototype,
      purity: cardDto.purity,
    };
  }

  static mapToPrototype(protoDto: ProtoDto): Prototype {
    return {
      ..._.pick(protoDto, [
        'id',
        'name',
        'effect',
        'god',
        'rarity',
        'mana',
        'type',
        'set',
        'collectable',
        'live',
      ]),
      tribe: protoDto.tribe?.String,
      attack: protoDto.attack?.Int64,
      health: protoDto.health?.Int64,
      artId: protoDto.art_id,
      libId: protoDto.lib_id,
    };
  }
}
