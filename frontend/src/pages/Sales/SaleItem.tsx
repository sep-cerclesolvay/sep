import { IonCard, IonCardHeader, IonCardTitle, useIonRouter } from '@ionic/react';
import Accordions from 'components/Accordions';
import ListItem from 'components/ListItem';
import { FC } from 'react';
import { loadSaleIntoBasket } from 'redux/basketSlice';
import { useAppDispatch } from 'redux/hooks';
import { Sale } from 'types/Sale';
import { removeDecimalZeros } from 'utils/math';
import classes from '../Stock/Stock.module.scss';

export interface SaleItemProps {
  sale: Sale;
}

const SaleItem: FC<SaleItemProps> = ({ sale }) => {
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  const nbrOfItems = sale.items.length;
  const nbrOfProducts = sale.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleEditButtonClick = () => {
    dispatch(loadSaleIntoBasket(sale));
    router.push('/ventes/pannier/');
  };

  return (
    <IonCard>
      <ListItem
        key={sale.id}
        card={true}
        after={
          <Accordions
            accordions={[
              {
                key: 'products',
                title: `${nbrOfProducts} Produit${
                  nbrOfProducts > 1 ? `s (${nbrOfItems > 1 ? `${nbrOfItems} différents` : 'tous les mêmes'})` : ''
                }`,
                children: (
                  <>
                    {sale.items.map((item) => (
                      <p key={item.id}>
                        {item.quantity}x {item.product.name}
                      </p>
                    ))}
                  </>
                ),
              },
            ]}
          />
        }
        onClickEditButton={handleEditButtonClick}
      >
        <IonCardHeader>
          <IonCardTitle className={classes.item_title}>
            <span className={classes.text}>
              Vente {sale.id} - Total : {removeDecimalZeros(sale.total)}€
            </span>
          </IonCardTitle>
        </IonCardHeader>
      </ListItem>
    </IonCard>
  );
};

export default SaleItem;
