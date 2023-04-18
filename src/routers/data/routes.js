import Board from "../../common/Board";
import MyAccount from "../../common/MyAccount/pages";

export const mainMenu = {
    'board': {
        name: 'Board',
        path: '/board',
        component: <Board/>
    },
    'myAccount': {
        name: 'My Account',
        path: '/myaccount',
        component: <MyAccount/>
    }
}