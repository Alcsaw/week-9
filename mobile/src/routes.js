import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

// createAppContainer must wrap every route of the app. And inside it, goes the navigation.
// For this app we are going to use the SwitchNavigator so the user can only see the current page and
// there is no "back" button. This project doesn't expect the common stack navigation.
const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;
