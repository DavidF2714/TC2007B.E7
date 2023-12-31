import { Admin, CustomRoutes, Resource, ShowGuesser, ThemeProvider, defaultDarkTheme, defaultLightTheme, defaultTheme } from "react-admin";
import { dataProvider } from './dataProvider';
import { Dashboard } from "./Dashboard";
import { i18nProvider } from "./i18nProvider";
import { MyLayout } from "./MyLayout";
import { TicketList, TicketCreate, TicketEdit } from "./tickets";
import Registrarse from "./MyRegister"
import { Route } from "react-router-dom";
import authProvider from "./AuthProvider";
import CustomLoginPage from "./MyLogin";
import { UserList, UsuarioEdit } from "./Users";
import Book from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon  from '@mui/icons-material/Dashboard';
import { Reporte } from "./Components/Reporte"

export const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} darkTheme={defaultDarkTheme} theme={defaultLightTheme} defaultTheme="light" i18nProvider={i18nProvider} loginPage={CustomLoginPage}>
        <Resource name="dashboard" list={Dashboard} show={Dashboard} options={{label:'Panel de Reportes'}} icon={DashboardIcon}/>
        <Resource name="reporte" list ={Reporte}  options={{label:'Reporte'}}/>
        <Resource name="tickets" list={TicketList} edit={TicketEdit} create={TicketCreate} options={{label:'Tickets'}} icon={Book} />
        <Resource name="usuarios" list ={UserList} edit={UsuarioEdit} options={{label:'Usuarios'}} icon={PeopleIcon}/>
        <CustomRoutes noLayout>
            <Route path="/registrarse" element={<Registrarse />}/>
        </CustomRoutes>
    </Admin>
); 