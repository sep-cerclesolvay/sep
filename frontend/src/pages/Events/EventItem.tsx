import { IonCard, IonCardHeader, IonCardTitle, useIonRouter } from '@ionic/react';
import ListItem from 'components/ListItem';
import { FC } from 'react';
import classes_stock from '../Stock/Stock.module.scss';
import { Event } from 'types/Event';

export interface EntriesItemProps {
  event: Event;
}

const EventItem: FC<EntriesItemProps> = ({ event }) => {
  const router = useIonRouter();

  const handleClick = () => {
    router.push(`/events/${event.id}/`);
  };

  return (
    <IonCard onClick={handleClick}>
      <ListItem card={true}>
        <IonCardHeader>
          <IonCardTitle className={classes_stock.item_title}>
            <span className={classes_stock.text}>{event.name}</span>
          </IonCardTitle>
        </IonCardHeader>
      </ListItem>
    </IonCard>
  );
};

export default EventItem;
