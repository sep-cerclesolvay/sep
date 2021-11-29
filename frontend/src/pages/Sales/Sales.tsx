import { IonButton, IonIcon, IonItem, useIonRouter } from '@ionic/react';
import Page from 'components/Page';
import StateAwareList from 'components/StateAwareList';
import { addOutline, addSharp, downloadOutline, downloadSharp } from 'ionicons/icons';
import { capitalize } from 'lodash';
import { useEffect, VFC } from 'react';
import { initializeNewSale } from 'redux/basketSlice';
import { useAppDispatch } from 'redux/hooks';
import { loadSales, useSales } from 'redux/salesSlice';
import SaleEmpty from './SaleEmpty';
import SaleItem from './SaleItem';
import SaleLoading from './SaleLoading';
import { downloadSalesReport } from 'api/saleAPI';
import classes from './Sale.module.scss';

const Sales: VFC = () => {
  const sales = useSales();
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  useEffect(() => {
    dispatch(loadSales());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(loadSales());
  };

  const handleAddButtonClick = () => {
    dispatch(initializeNewSale());
    router.push('/ventes/scanner');
  };

  const handleDownloadReportButtonClick = () => {
    downloadSalesReport();
  };

  return (
    <Page title="Ventes">
      <StateAwareList
        state={{ isLoading: sales.isLoading, items: sales.data, error: sales.error }}
        toolbarButtons={[
          <IonButton key="1" fill="clear" shape="round" onClick={handleAddButtonClick}>
            <IonIcon slot="start" ios={addOutline} md={addSharp} />
            Nouvelle vente
          </IonButton>,
          <IonButton key="2" fill="clear" shape="round" onClick={handleDownloadReportButtonClick}>
            <IonIcon slot="start" ios={downloadOutline} md={downloadSharp} />
            Télécharger
          </IonButton>,
        ]}
        renderItem={(sale) => <SaleItem sale={sale} />}
        keyResolver={(sale) => `${sale.id}`}
        loadingComponent={<SaleLoading />}
        emptyComponent={<SaleEmpty />}
        renderError={(error) => <IonItem>Error: {JSON.stringify(error, undefined, 2)}</IonItem>}
        groupResolver={(sale) =>
          capitalize(
            new Date(sale.created_date).toLocaleDateString('fr-BE', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          )
        }
        renderGroup={(group, items) => (
          <div className={classes.sale_group}>
            <p>
              {group} -{' '}
              {items.reduce((acc, sale) => (acc += sale.items.reduce((acc, sale) => (acc += sale.quantity), 0)), 0)}{' '}
              produits vendus
            </p>
          </div>
        )}
        onRefresh={handleRefresh}
      />
    </Page>
  );
};

export default Sales;
