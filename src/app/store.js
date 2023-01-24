import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import adminReducer from '../redux/reducers/adminReducer';
import mainReducer from '../redux/reducers/mainReducer';
import loaderReducer from '../redux/reducers/loaderReducer';

const reducer = combineReducers({
	admin: adminReducer,
	main: mainReducer,
	loader: loaderReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	transforms: [
		encryptTransform({
			secretKey: 't$O(f`I}g~H-N+a=Z^r:id#w@1%5!0Cx*',
			onError: (error) => console.log(error),
		}),
	],
};

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = createStore(
// 	persistedReducer,
// 	undefined,
// 	composeWithDevTools(applyMiddleware(thunk)),
// );

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
