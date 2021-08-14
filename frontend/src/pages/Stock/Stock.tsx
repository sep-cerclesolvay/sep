import { IonItem, useIonRouter } from '@ionic/react';
import Fab from 'components/Fab';
import Page from 'components/Page';
import StateAwareList from 'components/StateAwareList';
import { addCircleOutline, addCircleSharp } from 'ionicons/icons';
import { useEffect, VFC } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { loadProducts, useProducts } from 'redux/productsSlice';
import { Product } from 'types/Product';
import { Base58 } from 'utils/base58';
import StockEmpty from './StockEmpty';
import StockItem from './StockItem';
import StockLoading from './StockLoading';

const base58 = new Base58();

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
    router.push(`/qr/product/${base58.encode(product.id)}`);
  };

  return (
    <Page title="Stock">
      {/* <IonItem>
        <IonLabel>Trier par</IonLabel>
        <IonSelect interface="popover" placeholder="Select One" onIonChange={(e) => console.log(e.detail.value)}>
          <IonSelectOption value="female">Female</IonSelectOption>
          <IonSelectOption value="male">Male</IonSelectOption>
        </IonSelect>
      </IonItem> */}
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
      <Fab text="Ajouter un produit" iosIcon={addCircleOutline} mdIcon={addCircleSharp} />
    </Page>
  );
};

export default Stock;
