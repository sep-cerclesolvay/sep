import { IonButton, IonButtons, IonIcon, IonList, IonToolbar } from '@ionic/react';
import LoadingBar from 'components/LoadingBar';
import Refresher from 'components/Refresher';
import useBreakpoints from 'hooks/useBreakpoints';
import { refreshOutline, refreshSharp } from 'ionicons/icons';
import { Fragment, ReactElement, ReactNode } from 'react';

export interface StateAwareList<T> {
  state: {
    isLoading: boolean;
    error?: unknown;
    items?: T[];
  };
  toolbarButtons?: ReactNode[];
  loadingComponent: ReactNode;
  numberOfLoadingComponents?: number;
  emptyComponent: ReactNode;
  renderItem: (item: T) => ReactNode;
  renderError: (error: unknown) => ReactNode;
  keyResolver: (item: T) => string;
  onRefresh?: () => void;
}

const StateAwareList = <T,>({
  toolbarButtons,
  loadingComponent,
  numberOfLoadingComponents = 5,
  emptyComponent,
  renderItem,
  renderError,
  state,
  keyResolver,
  onRefresh,
}: StateAwareList<T>): ReactElement => {
  const { minBreakpoint } = useBreakpoints();

  let content = undefined;
  if (state.isLoading) {
    const loadingArray = new Array(numberOfLoadingComponents).fill(0);
    content = (
      <div style={{ position: 'relative' }}>
        <LoadingBar show={true} />
        <IonList>
          {loadingArray.map((_e, i) => (
            <Fragment key={i}>{loadingComponent}</Fragment>
          ))}
        </IonList>
      </div>
    );
  }

  if (!content && state.error) {
    content = <IonList>{renderError(state.error)}</IonList>;
  }

  if (!content) {
    if (!state.items || state.items.length === 0) {
      content = <IonList>{emptyComponent}</IonList>;
    } else {
      content = (
        <IonList>
          {state.items.map((item) => (
            <Fragment key={keyResolver(item)}>{renderItem(item)}</Fragment>
          ))}
        </IonList>
      );
    }
  }

  return (
    <>
      {!minBreakpoint('md') && !!onRefresh && <Refresher isLoading={state.isLoading} onRefresh={onRefresh} />}
      {((!!toolbarButtons && toolbarButtons.length > 1) || minBreakpoint('md')) && (
        <IonToolbar color="light">
          <IonButtons slot="start">
            {toolbarButtons}
            {minBreakpoint('md') && (
              <IonButton fill="clear" shape="round" onClick={() => !!onRefresh && onRefresh()}>
                <IonIcon slot="start" ios={refreshOutline} md={refreshSharp} />
                Mettre à jour
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      )}
      {content}
    </>
  );
};

export default StateAwareList;
