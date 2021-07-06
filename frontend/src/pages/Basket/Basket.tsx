import { IonButton, IonFab, IonFabButton, IonIcon, IonItem } from '@ionic/react';
import Page from 'components/Page';
import { qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import { useEffect, useState, VFC } from 'react';
import { loadBasket, selectBasket } from 'redux/basketSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Product } from 'types/Product';
import BasketEmpty from './BasketEmpty';
import BasketLoading from './BasketLoading';
import BasketRemoveItem from './BasketRemoveItem';
import classes from './Basket.module.scss';
import StateAwareList from 'components/StateAwareList';
import BasketItem from './BasketItem';

const Basket: VFC = () => {
  const [removeProduct, setRemoveProduct] = useState<Product | undefined>();
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBasket());
  }, [dispatch]);

  const handleRemoveButtonClick = (product: Product) => {
    setRemoveProduct(product);
  };

  return (
    <Page title="Pannier">
      <div className={classes.basket}>
        <p>Total: 10€</p>
        <StateAwareList
          state={{ isLoading: basket.isLoading, items: basket.data, error: basket.error }}
          renderItem={(product) => (
            <BasketItem product={product} onRemoveButtonClick={handleRemoveButtonClick.bind(this, product)} />
          )}
          keyResolver={(product) => `${product.id}`}
          loadingComponent={<BasketLoading />}
          emptyComponent={<BasketEmpty />}
          renderError={(error) => <IonItem>Error: {JSON.stringify(error, undefined, 2)}</IonItem>}
        />
        <div className={classes.save_btn}>
          <IonButton expand="block">Sauvegarder</IonButton>
        </div>
      </div>
      <BasketRemoveItem product={removeProduct} onDidDismiss={() => setRemoveProduct(undefined)} />
      <IonFab className={classes.scanner_btn} vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/ventes/scanner">
          <IonIcon ios={qrCodeOutline} md={qrCodeSharp} />
        </IonFabButton>
      </IonFab>
    </Page>
  );
};

export default Basket;
