import React from 'react';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/style/App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
	return (
		<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</PersistGate>
			</Provider>
	);
}

export default App;
