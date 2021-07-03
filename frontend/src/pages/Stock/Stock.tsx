import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import Page from 'components/Page';
import useProducts from 'hooks/useProducts';
import { VFC } from 'react';
import classes from './Stock.module.scss';

const Stock: VFC = () => {
  const products = useProducts();
  return (
    <Page title="Stock">
      <IonItem>
        <IonLabel>Trier par</IonLabel>
        <IonSelect interface="popover" placeholder="Select One" onIonChange={(e) => console.log(e.detail.value)}>
          <IonSelectOption value="female">Female</IonSelectOption>
          <IonSelectOption value="male">Male</IonSelectOption>
        </IonSelect>
      </IonItem>
      {products.map((product) => (
        <IonCard key={product.id}>
          <IonCardHeader>
            <IonCardTitle>{product.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className={classes.item}>
              <p>Prix de vente {product.sellPrice}€</p>
              <p>Prix d&apos;achat {product.buyPrice}€</p>
              <p>Quantité en stock : {product.quantity}</p>
            </div>
          </IonCardContent>
        </IonCard>
      ))}
    </Page>
  );
};

export default Stock;
