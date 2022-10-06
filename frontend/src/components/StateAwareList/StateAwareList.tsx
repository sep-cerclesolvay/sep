import { IonButton, IonButtons, IonIcon, IonList, IonToolbar } from '@ionic/react';
import LoadingBar from 'components/LoadingBar';
import Refresher from 'components/Refresher';
import useBreakpoints from 'hooks/useBreakpoints';
import { refreshOutline, refreshSharp } from 'ionicons/icons';
import { groupBy } from 'lodash';
import { ReactElement, ReactNode, useMemo, useState } from 'react';
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso';
import Empty from './Empty';
import classes from './StateAwareList.module.scss';

export interface StateAwareList<Item> {
  state: {
    isLoading: boolean;
    error?: unknown;
    items?: Item[];
  };
  toolbarButtons?: ReactNode[];
  tips?: ReactNode;
  loadingComponent: ReactNode;
  numberOfLoadingComponents?: number;
  emptyComponent: string | ReactNode;
  renderItem: (item: Item) => ReactNode;
  renderError: (error: unknown) => ReactNode;
  keyResolver: (item: Item) => string;
  groupResolver?: (item: Item) => string;
  renderGroup?: (group: string, items: Item[]) => ReactNode;
  onRefresh?: () => void;
}

const StateAwareList = <Item,>({
  toolbarButtons,
  tips,
  loadingComponent,
  numberOfLoadingComponents = 5,
  emptyComponent,
  renderItem,
  renderError,
  state,
  keyResolver,
  groupResolver,
  renderGroup,
  onRefresh,
}: StateAwareList<Item>): ReactElement => {
  const { minBreakpoint } = useBreakpoints();
  const [atTop, setAtTop] = useState(true);

  const groups = useMemo(() => groupBy(state.items, groupResolver), [groupResolver, state.items]);
  const groupCounts = useMemo(() => Object.keys(groups).map((index) => groups[index].length), [groups]);

  let content = undefined;
  let showLoading = false;
  if (state.isLoading) {
    showLoading = true;
    content = <Virtuoso totalCount={numberOfLoadingComponents} itemContent={() => loadingComponent} />;
  }

  if (!content && state.error) {
    content = renderError(state.error);
  }

  if (!content) {
    if (!state.items || state.items.length === 0) {
      content = typeof emptyComponent === 'string' ? <Empty message={emptyComponent} /> : emptyComponent;
    } else {
      const data = state.items;
      const commonVirtuosoProps = {
        itemContent: (index: number) => renderItem(data[index]),
        computeItemKey: (index: number, item: Item) => (item ? keyResolver(item) : index),
        atTopStateChange: (atTop: boolean) => setAtTop(atTop),
      };
      content =
        groupResolver && renderGroup ? (
          <GroupedVirtuoso
            groupCounts={groupCounts}
            groupContent={(index) => <>{renderGroup(Object.keys(groups)[index], groups[Object.keys(groups)[index]])}</>}
            {...commonVirtuosoProps}
          />
        ) : (
          <Virtuoso totalCount={data.length} {...commonVirtuosoProps} />
        );
    }
  }

  if (minBreakpoint('md') && !!onRefresh)
    toolbarButtons = [
      ...(toolbarButtons || []),
      <IonButton key="refresher" fill="clear" shape="round" onClick={onRefresh}>
        <IonIcon slot="start" ios={refreshOutline} md={refreshSharp} />
        Mettre à jour
      </IonButton>,
    ];

  return (
    <>
      {!minBreakpoint('md') && !!onRefresh && (
        <Refresher isLoading={state.isLoading} onRefresh={onRefresh} disabled={!atTop} />
      )}
      {!!toolbarButtons && toolbarButtons.length > 0 && (
        <IonToolbar color="light">
          <IonButtons slot="start">{toolbarButtons}</IonButtons>
        </IonToolbar>
      )}
      <div className={classes.container}>
        <LoadingBar show={showLoading} />
        {tips}
        <IonList className={classes.list}>{content}</IonList>
      </div>
    </>
  );
};

export default StateAwareList;
