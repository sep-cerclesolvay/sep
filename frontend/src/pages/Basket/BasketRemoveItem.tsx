import { IonAlert } from '@ionic/react';
import { VFC } from 'react';
import { removeOneProductById, removeItemByProductId } from 'redux/basketSlice';
import { useAppDispatch } from 'redux/hooks';
import { EditableSaleItem } from 'types/SaleItem';

export interface BasketRemoveItemProps {
  saleItem?: EditableSaleItem;
  onDidDismiss?: () => void;
}

const BasketRemoveItem: VFC<BasketRemoveItemProps> = ({ saleItem, onDidDismiss }) => {
  const dispatch = useAppDispatch();

  return (
    <IonAlert
      isOpen={!!saleItem}
      onDidDismiss={onDidDismiss}
      header={`Supprimer ${saleItem?.product.name} ?`}
      subHeader={`Il y a ${saleItem?.quantity} ${saleItem?.product.name} dans le pannier`}
      buttons={[
        {
          text: 'Supprimer 1 seul',
          role: 'destructive',
          handler: () => {
            if (saleItem) {
              dispatch(removeOneProductById(saleItem.product.id));
            }
          },
        },
        {
          text: 'Tous supprimer',
          role: 'destructive',
          handler: () => {
            if (saleItem) {
              dispatch(removeItemByProductId(saleItem.product.id));
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
