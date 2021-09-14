import ListItem from 'components/ListItem';
import { VFC } from 'react';
import { EditableSaleItem } from 'types/SaleItem';

export interface BasketListProps {
  saleItem: EditableSaleItem;
  onRemoveButtonClick: (saleItem: EditableSaleItem) => void;
}

const BasketList: VFC<BasketListProps> = ({ saleItem, onRemoveButtonClick }) => {
  return (
    <ListItem
      key={saleItem.product.id}
      deleteButton={true}
      onClickDeleteButton={onRemoveButtonClick.bind(this, saleItem)}
    >
      {saleItem.product.name}
    </ListItem>
  );
};

export default BasketList;
