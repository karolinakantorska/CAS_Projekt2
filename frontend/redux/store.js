import { createStore, compose } from 'redux';
import rootReducer from './reducers/rootReducer';

const initialState = {
    users: {
        user1: 'Karolina'
    },
}
// redux devTools
// if there is no window.devToolsExtension return the store itself
const enchancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);
const store = createStore(rootReducer, initialState,enchancers);
console.log(store.getState)
export default store;