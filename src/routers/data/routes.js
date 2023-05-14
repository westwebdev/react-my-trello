import Board from "../../common/Board";
import MyAccount from "../../common/MyAccount/pages";

export const mainMenu = {
    'board': {
        name: 'Board',
        path: '/board',
        component: <Board/>,
        isGuarded: true,
        guardType: 'login'
    },
    'myAccount': {
        name: 'My Account',
        path: '/myaccount',
        component: <MyAccount/>,
        isGuarded: false

    }
}
