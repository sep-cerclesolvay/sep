import { IonList } from '@ionic/react';
import { Fragment, ReactElement, ReactNode } from 'react';

export interface StateAwareList<T> {
  state: {
    isLoading: boolean;
    error?: unknown;
    items?: T[];
  };
  loadingComponent: ReactNode;
  numberOfLoadingComponents?: number;
  emptyComponent: ReactNode;
  renderItem: (item: T) => ReactNode;
  renderError: (error: unknown) => ReactNode;
  keyResolver: (item: T) => string;
}

const StateAwareList = <T,>({
  loadingComponent,
  numberOfLoadingComponents = 5,
  emptyComponent,
  renderItem,
  renderError,
  state,
  keyResolver,
}: StateAwareList<T>): ReactElement => {
  if (state.isLoading) {
    const loadingArray = new Array(numberOfLoadingComponents).fill(0);
    return (
      <IonList>
        {loadingArray.map((_e, i) => (
          <Fragment key={i}>{loadingComponent}</Fragment>
        ))}
      </IonList>
    );
  }

  if (state.error) {
    return <IonList>{renderError(state.error)}</IonList>;
  }

  if (!state.items || state.items.length === 0) {
    return <IonList>{emptyComponent}</IonList>;
  }

  return (
    <IonList>
      {state.items.map((item) => (
        <Fragment key={keyResolver(item)}>{renderItem(item)}</Fragment>
      ))}
    </IonList>
  );
};

export default StateAwareList;
