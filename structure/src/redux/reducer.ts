import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import itemReducer, { ItemState } from '../modules/home/redux/itemReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  items: ItemState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history), // tracking router thay đổi
    intl: intlReducer,
    profile: authReducer,
    items: itemReducer
  });
}
