import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import ListItem, { ListItemButton } from 'components/ListItem';
import { qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import { VFC } from 'react';
import { Product } from 'types/Product';
import { removeDecimalZeros } from 'utils/math';
import classes from './Stock.module.scss';

export interface BasketListProps {
  product: Product;
  onQrCodeButtonClick: (product: Product) => void;
  onEditButtonClick: (product: Product) => void;
}

const BasketList: VFC<BasketListProps> = ({ product, onQrCodeButtonClick, onEditButtonClick }) => {
  const customButtons: ListItemButton[] = [
    {
      id: 'qr-code',
      iosIcon: qrCodeOutline,
      mdIcon: qrCodeSharp,
      onClick: () => onQrCodeButtonClick(product),
      color: 'secondary',
    },
  ];

  return (
    <IonCard>
      <ListItem
        key={product.id}
        card={true}
        editButton={true}
        onClickEditButton={onEditButtonClick.bind(this, product)}
        customButtons={customButtons}
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
      </ListItem>
    </IonCard>
  );
};

export default BasketList;
