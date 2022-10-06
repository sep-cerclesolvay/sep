import { IonItem, IonText } from '@ionic/react';
import Page from 'components/Page';
import StateAwareList from 'components/StateAwareList';
import { useEffect, FC } from 'react';
import { loadEvents, useEvents } from 'redux/eventsSlice';
import { useAppDispatch } from 'redux/hooks';
import EventItem from './EventItem';
import EventLoading from './EventLoading';
import classes from './Events.module.scss';

const Events: FC = () => {
  const events = useEvents();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(loadEvents());
  };

  return (
    <Page title="Événements">
      <StateAwareList
        tips={
          <IonText className={classes.tips} color="dark">
            Croissiez l&apos;événement pour lequel vous aller scanner les tickets.
          </IonText>
        }
        state={{ isLoading: events.isLoading, items: events.data, error: events.error }}
        renderItem={(event) => <EventItem event={event} />}
        keyResolver={(event) => `${event.id}`}
        loadingComponent={<EventLoading />}
        emptyComponent={'Aucun événement'}
        renderError={(error) => <IonItem>Error: {JSON.stringify(error, undefined, 2)}</IonItem>}
        onRefresh={handleRefresh}
      />
    </Page>
  );
};

export default Events;
