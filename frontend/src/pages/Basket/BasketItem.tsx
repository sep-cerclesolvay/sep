import ListItem from 'components/ListItem';
import { VFC } from 'react';
import { EditableSaleItem } from 'types/SaleItem';
import { removeDecimalZeros } from 'utils/math';
import classes from './Basket.module.scss';

export interface BasketListProps {
  saleItem: EditableSaleItem;
  onRemoveButtonClick: (saleItem: EditableSaleItem) => void;
}

const BasketList: VFC<BasketListProps> = ({ saleItem, onRemoveButtonClick }) => {
  return (
    <ListItem deleteButton={true} onClickDeleteButton={onRemoveButtonClick.bind(this, saleItem)}>
      <div className={classes.basket_item}>
        <span>{saleItem.product.name}</span>
        <span>{removeDecimalZeros(saleItem.product.sell_price)}€</span>
        <span>x{saleItem.quantity}</span>
      </div>
    </ListItem>
  );
};

export default BasketList;
