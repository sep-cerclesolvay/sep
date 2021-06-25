import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Menu from 'components/Menu';
import Page from 'components/Page';
import NotFound from 'pages/NotFound';

const Router: React.VFC = () => {
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/:name" component={Page} exact={true} strict={true} />
          {/* <Route path="/" exact={true} strict={false}>
            <Redirect to="/stock" />
          </Route> */}
          <Route component={NotFound} exact={false} strict={false} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default Router;
