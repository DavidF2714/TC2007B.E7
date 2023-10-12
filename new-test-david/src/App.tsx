import { Admin, CustomRoutes, Resource, ShowGuesser, ThemeProvider, defaultDarkTheme, defaultLightTheme, defaultTheme } from "react-admin";
import { dataProvider } from './dataProvider';
import { Dashboard } from "./Dashboard";
import { i18nProvider } from "./i18nProvider";
import React from "react";
import { MyLayout } from "./MyLayout";
import { TicketList, TicketCreate, TicketEdit } from "./tickets";
import Registrarse from "./testregister";
import { Route } from "react-router-dom";
import authProvider from "./AuthProvider";
import CustomLoginPage from "./testlogin";

export const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} darkTheme={defaultDarkTheme} theme={defaultLightTheme} defaultTheme="light" i18nProvider={i18nProvider} loginPage={CustomLoginPage}>
        <Resource name="dashboard" list={Dashboard} show={Dashboard} options={{label:'Dashboard'}}/>
        <Resource name="tickets" list={TicketList} edit={TicketEdit} create={TicketCreate} options={{label:'Tickets'}} />
        <CustomRoutes>
            <Route path="/registrarse" element={<Registrarse />}/>
        </CustomRoutes>
    </Admin>
); 