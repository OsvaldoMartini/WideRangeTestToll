import React, { useContext, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import MarcaDashboard from '../../features/marcas/dashboard/MarcaDashboard';
import { observer } from 'mobx-react-lite';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import MarcaForm from '../../features/marcas/form/MarcaForm';
import MarcaDetails from '../../features/marcas/details/MarcaDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import RegisterSuccess from '../../features/user/RegisterSuccess';
import VerifyEmail from '../../features/user/VerifyEmail';
import BodyPage from '../../features/nav/BodyPage';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if (token && !appLoaded) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token, appLoaded])

  if (!appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <div>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <div>
            <NavBar />
            <Segment style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <PrivateRoute path='/activities/:id' component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={['/createActivity', '/manageActivity/:id']}
                  component={ActivityForm}
                />
                <Route exact path='/marcas' component={MarcaDashboard} />
                <PrivateRoute path='/marcas/:id' component={MarcaDetails} />
                <Route
                  key={location.key}
                  path={['/createMarca', '/manageMarca/:id']}
                  component={MarcaForm}
                />
                <PrivateRoute path='/profile/:username' component={ProfilePage} />
                <Route path='/user/registerSuccess' component={RegisterSuccess} />
                <Route path='/user/verifyEmail' component={VerifyEmail} />
                <Route component={NotFound} />
              </Switch>
            </Segment>
          </div>
        )}
      />
    </div>
  );
};

export default withRouter(observer(App));
