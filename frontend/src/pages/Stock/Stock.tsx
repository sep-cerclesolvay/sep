import { IonItem, IonLabel, IonSelect, IonSelectOption, useIonRouter } from '@ionic/react';
import Page from 'components/Page';
import StateAwareList from 'components/StateAwareList';
import { useEffect, VFC } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { loadProducts, useProducts } from 'redux/productsSlice';
import { Product } from 'types/Product';
import StockEmpty from './StockEmpty';
import StockItem from './StockItem';
import StockLoading from './StockLoading';

const Stock: VFC = () => {
  const router = useIonRouter();
  const products = useProducts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleEditButtonClick = (product: Product) => {
    console.log('edit', product);
  };

  const handleQrCodeButtonClick = (product: Product) => {
    router.push(`/qr/${product.id}`);
  };

  return (
    <Page title="Stock">
      <IonItem>
        <IonLabel>Trier par</IonLabel>
        <IonSelect interface="popover" placeholder="Select One" onIonChange={(e) => console.log(e.detail.value)}>
          <IonSelectOption value="female">Female</IonSelectOption>
          <IonSelectOption value="male">Male</IonSelectOption>
        </IonSelect>
      </IonItem>
      <StateAwareList
        state={{ isLoading: products.isLoading, items: products.data, error: products.error }}
        renderItem={(product) => (
          <StockItem
            product={product}
            onQrCodeButtonClick={handleQrCodeButtonClick}
            onEditButtonClick={handleEditButtonClick}
          />
        )}
        keyResolver={(product) => `${product.id}`}
        loadingComponent={<StockLoading />}
        emptyComponent={<StockEmpty />}
        renderError={(error) => <IonItem>Error: {JSON.stringify(error, undefined, 2)}</IonItem>}
      />
    </Page>
  );
};

export default Stock;
