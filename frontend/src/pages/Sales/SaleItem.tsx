import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import Accordions from 'components/Accordions';
import ListItem from 'components/ListItem';
import { VFC } from 'react';
import { Sale } from 'types/Sale';
import classes from '../Stock/Stock.module.scss';

export interface SaleItemProps {
  sale: Sale;
}

const SaleItem: VFC<SaleItemProps> = ({ sale }) => {
  const nbrOfItems = sale.items.length;
  const nbrOfProducts = sale.items.reduce((acc, item) => acc + item.quantity, 0);

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
      >
        <IonCardHeader>
          <IonCardTitle className={classes.item_title}>
            <span className={classes.text}>
              Vente {sale.id} - Total : {sale.total}€
            </span>
          </IonCardTitle>
        </IonCardHeader>
      </ListItem>
    </IonCard>
  );
};

export default SaleItem;
