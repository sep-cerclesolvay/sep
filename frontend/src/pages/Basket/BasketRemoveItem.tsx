import { IonAlert } from '@ionic/react';
import { VFC } from 'react';
import { removeAll, removeOne } from 'redux/basketSlice';
import { useAppDispatch } from 'redux/hooks';
import { Product } from 'types/Product';

export interface BasketRemoveItemProps {
  product?: Product;
  onDidDismiss?: () => void;
}

const BasketRemoveItem: VFC<BasketRemoveItemProps> = ({ product, onDidDismiss }) => {
  const dispatch = useAppDispatch();

  return (
    <IonAlert
      isOpen={!!product}
      onDidDismiss={onDidDismiss}
      header={`Supprimer ${product?.name} ?`}
      subHeader={`Il y a ${product?.quantity} ${product?.name} dans le pannier`}
      buttons={[
        {
          text: 'Supprimer 1 seul',
          role: 'destructive',
          handler: () => {
            if (product) {
              dispatch(removeOne({ id: product.id }));
            }
          },
        },
        {
          text: 'Tous supprimer',
          role: 'destructive',
          handler: () => {
            if (product) {
              dispatch(removeAll({ id: product.id }));
            }
          },
        },
        {
          text: 'Annuler',
          role: 'cancel',
        },
      ]}
    />
  );
};

export default BasketRemoveItem;
