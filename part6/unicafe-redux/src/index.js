import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

import noteReducer from './reducer'

const store = createStore(noteReducer)

const App = () => {
    const state = store.getState()

    return (
        <div>
            <div className='btn-row'>
                <button onClick={() => store.dispatch({ type: 'GOOD'})}>good</button>
                <button onClick={() => store.dispatch({ type: 'OK'})}>ok</button>
                <button onClick={() => store.dispatch({ type: 'BAD'})}>bad</button>
                <button onClick={() => store.dispatch({ type: 'ZERO'})}>reset stats</button>
            </div>
            <div className='display'>
                <p>good {state.good}</p>
                <p>ok {state.ok}</p>
                <p>bad {state.bad}</p>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
