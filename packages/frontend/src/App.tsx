import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthenticationContext';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { LoginPage } from './pages/Authentication/LoginPage';
import { RegisterPage } from './pages/Authentication/RegisterPage';
import { CityDetailPage } from './pages/CityDetail/CityDetailPage';
import { Routes } from './Routes';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

export const BasePage: FunctionComponent = () => {
  const { token } = useAuth();
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return <Redirect to="/login" />;
};

const UnauthenticatedRoute: React.FC<RouteProps> = ({ children, ...routeProps }) => {
  const { token } = useAuth();
  if (token === null) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/" />;
};

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...routeProps }) => {
  const {
    token,
    actions: { getTokenData, logout },
  } = useAuth();
  if (token !== null) {
    const tokenData = getTokenData();
    if (tokenData !== null) {
      const { exp } = tokenData;
      if (parseInt(exp, 10) * 1000 > Date.now()) {
        return <Route {...routeProps} />;
      }
      logout();
    }
  }
  return <Redirect to="/" />;
};

export const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Switch>
            <UnauthenticatedRoute exact={true} path="/login" component={LoginPage} />
            <UnauthenticatedRoute exact={true} path="/register" component={RegisterPage} />

            <AuthenticatedRoute path={Routes.dashboard} exact={true} component={DashboardPage} />
            <AuthenticatedRoute path={Routes.city(':id')} exact={true} component={CityDetailPage} />
            <Route path="/" component={BasePage} />
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
