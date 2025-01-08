import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { JournalApp } from './JournalApp';
import './styles.css';

import { store } from './store/store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')

if ( container ) {
  const root = ReactDOM.createRoot(container)
  root.render(
    <Provider store={ store }>
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  )
} else {
  throw new Error('Root element with ID "root" was not found in the document. Ensure there is a corresponding HTML element with the ID "root" in your HTML file.')
}


// Asi es tal cual como se recomienda en la documentacion
// https://redux-toolkit.js.org/tutorials/quick-start