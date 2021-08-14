import Fab from 'components/Fab';
import Page from 'components/Page';
import { addCircleOutline, addCircleSharp } from 'ionicons/icons';
import { VFC } from 'react';

const Sales: VFC = () => {
  return (
    <Page title="Ventes">
      <Fab text="Ajouter une vente" iosIcon={addCircleOutline} mdIcon={addCircleSharp} />
    </Page>
  );
};

export default Sales;
