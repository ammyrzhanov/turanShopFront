import { combineReducers } from 'redux';
// import { groups } from './groups.reducer';
// import { characteristics } from './characteristics.reducer';
// import { images } from './images.reducer';
// import { categories } from './categories.reducer';
// import { items, basket } from './items.reducer';
// import { orders } from './orders.reducer';
import { user } from './authentication.reducer';
// import { alert } from './alert.reducer';
import { news } from './news.reducer';
import { history } from './history.reducer';

// import { vzaimorascheti } from './vzaimorascheti.reducer';
// import { vzaimoraschet } from './vzaimoraschet.reduscer'
// import { userConstants } from '../constants';
// import { comments } from './comments.reducer';
// import { userdata } from './userdata.reducer';

const appReducer = combineReducers({
//   groups,
//   categories,
//   items,
//   orders,
//   characteristics,
  news,
  history,
//   images,
//   authentication,
  user,
//   basket,
//   alert,
//   vzaimorascheti,
//   vzaimoraschet,
//   comments,
//   userdata
});

export default appReducer;