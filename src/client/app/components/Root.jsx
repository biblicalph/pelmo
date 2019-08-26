import ContactUs from 'App/components/contact';
import Gallery from 'App/components/gallery';
import Homepage from 'App/components/homepage';
import Layout from 'App/components/layout';
import PhotoDetail from 'App/components/photoDetail';
import Weather from 'App/components/weather';
import configureStore from 'App/redux/store';
import { routeList as routes } from 'App/utils';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const renderWithLayout = (Component) => {
  return (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

const App = () => (
  <Provider store={configureStore()}>
    <Router>
      <Switch>
        <Route path={routes.weather} render={renderWithLayout(Weather)} />
        <Route path={routes.contactUs} render={renderWithLayout(ContactUs)} />
        <Route path={routes.galleryDetail} component={renderWithLayout(PhotoDetail)} />
        <Route path={routes.gallery} render={renderWithLayout(Gallery)} />
        <Route render={renderWithLayout(Homepage)} />
      </Switch>
    </Router>
  </Provider>
);

export default App;