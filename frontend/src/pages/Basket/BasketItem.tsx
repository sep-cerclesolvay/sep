import EditDeleteIonItem from 'components/EditDeleteIonItem';
import { VFC } from 'react';
import { Product } from 'types/Product';

export interface BasketListProps {
  product: Product;
  onRemoveButtonClick: (product: Product) => void;
}

const BasketList: VFC<BasketListProps> = ({ product, onRemoveButtonClick }) => {
  return (
    <EditDeleteIonItem
      key={product.id}
      deleteButton={true}
      onClickDeleteButton={onRemoveButtonClick.bind(this, product)}
    >
      {product.name}
    </EditDeleteIonItem>
  );
};

export default BasketList;
