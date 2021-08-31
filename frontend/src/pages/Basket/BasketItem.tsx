import ListItem from 'components/ListItem';
import { VFC } from 'react';
import { SaleItem } from 'types/SaleItem';

export interface BasketListProps {
  saleItem: SaleItem;
  onRemoveButtonClick: (product: SaleItem) => void;
}

const BasketList: VFC<BasketListProps> = ({ saleItem, onRemoveButtonClick }) => {
  return (
    <ListItem key={saleItem.id} deleteButton={true} onClickDeleteButton={onRemoveButtonClick.bind(this, saleItem)}>
      {saleItem.product.name}
    </ListItem>
  );
};

export default BasketList;
