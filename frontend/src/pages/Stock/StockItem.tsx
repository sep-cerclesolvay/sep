import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import EditDeleteIonItem from 'components/EditDeleteIonItem';
import { VFC } from 'react';
import { Product } from 'types/Product';
import { removeDecimalZeros } from 'utils/math';
import classes from './Stock.module.scss';

export interface BasketListProps {
  product: Product;
  onEditButtonClick: (product: Product) => void;
}

const BasketList: VFC<BasketListProps> = ({ product, onEditButtonClick }) => {
  return (
    <IonCard>
      <EditDeleteIonItem
        key={product.id}
        card={true}
        editButton={true}
        onClickEditButton={onEditButtonClick.bind(this, product)}
      >
        <IonCardHeader>
          <IonCardTitle>{product.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className={classes.item}>
            <p>Prix de vente {removeDecimalZeros(product.sell_price)}€</p>
            <p>Prix d&apos;achat {removeDecimalZeros(product.buy_price)}€</p>
            <p>Quantité en stock : {product.quantity}</p>
          </div>
        </IonCardContent>
      </EditDeleteIonItem>
    </IonCard>
  );
};

export default BasketList;
