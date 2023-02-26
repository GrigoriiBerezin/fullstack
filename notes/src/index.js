import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer, { createNote } from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
