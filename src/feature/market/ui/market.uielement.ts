import {
  Col,
  collection,
  Container,
  Datatable,
  documents,
  formatCurrency,
  Fragment,
  GridTile,
  Image,
  isBusy,
  PageHeaderTile,
  Row,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { commify } from '../../../util/ekp/rpc/commify.rpc';
import { imageLabelCell } from '../../../util/ui/imageLabelCell';
import { MarketDocument } from './market.document';
export default function element(): UiElement {
  return Container({
    children: [
      titleRow(),
      Span({
        className: 'd-block mt-1 mb-2',
        content: 'Browse and filter current market prices of cards',
      }),
      tableRow(),
    ],
  });
}

function titleRow() {
  return Fragment({
    children: [
      Row({
        className: 'mb-2',
        children: [
          Col({
            className: 'col-auto',
            children: [
              PageHeaderTile({
                title: 'Marketplace',
                icon: 'cil-cart',
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function tableRow() {
  return Fragment({
    children: [
      Datatable({
        defaultSortFieldId: 'lowPriceFiat',
        data: documents(MarketDocument),
        pointerOnHover: true,
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(MarketDocument)),
        filters: [
          {
            columnId: 'god',
            type: 'checkbox',
          },
          {
            columnId: 'rarity',
            type: 'checkbox',
          },
          {
            columnId: 'set',
            type: 'checkbox',
          },
          {
            columnId: 'type',
            type: 'checkbox',
          },
        ],
        defaultView: {
          xs: 'grid',
          lg: 'column',
        },
        gridView: {
          tileWidth: [12, 6, 4, 3],
          tile: GridTile({
            image: Image({
              className: 'card-img-top',
              src: '$.cardArtUrl',
            }),
            details: [
              {
                label: 'Name',
                value: '$.name',
              },
              {
                label: 'God',
                value: '$.god',
              },
              {
                label: 'Rarity',
                value: '$.rarity',
              },
              {
                label: 'Mana',
                value: '$.mana',
              },
              {
                label: 'Type',
                value: '$.type',
              },
              {
                label: 'Set',
                value: '$.set',
              },
            ],
          }),
        },
        columns: [
          {
            id: 'name',
            searchable: true,
            sortable: true,
            cell: imageLabelCell('$.cardArtUrl', '$.name'),
            minWidth: '300px',
          },
          {
            id: 'lowPriceFiat',
            title: 'Min Price',
            format: formatCurrency('$.lowPriceFiat', '$.fiatSymbol'),
            sortable: true,
            width: '120px',
          },
          {
            id: 'quantity',
            format: commify('$.quantity'),
            sortable: true,
            width: '120px',
          },
          {
            id: 'god',
            sortable: true,
            width: '140px',
          },
          {
            id: 'rarity',
            sortable: true,
            width: '140px',
          },
          {
            id: 'set',
            sortable: true,
            width: '140px',
          },
          {
            id: 'type',
            sortable: true,
            width: '140px',
          },
          {
            id: 'mana',
            sortable: true,
            width: '80px',
          },
          {
            id: 'health',
            sortable: true,
            width: '80px',
          },
          {
            id: 'attack',
            sortable: true,
            width: '80px',
          },
        ],
      }),
    ],
  });
}
