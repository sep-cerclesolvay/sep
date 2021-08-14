import ListItem from 'components/ListItem';
import { VFC } from 'react';
import { Product } from 'types/Product';

export interface BasketListProps {
  product: Product;
  onRemoveButtonClick: (product: Product) => void;
}

const BasketList: VFC<BasketListProps> = ({ product, onRemoveButtonClick }) => {
  return (
    <ListItem key={product.id} deleteButton={true} onClickDeleteButton={onRemoveButtonClick.bind(this, product)}>
      {product.name}
    </ListItem>
  );
};

export default BasketList;
