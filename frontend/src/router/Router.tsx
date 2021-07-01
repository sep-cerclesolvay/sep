import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Menu from 'components/Menu';
import NotFound from 'pages/NotFound';
import Stock from 'pages/Stock/Stock';

const Router: React.VFC = () => {
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/stock" component={Stock} exact={true} strict={true} />
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
