import React from 'react'
import ReactDOM from 'react-dom/client'
import { legacy_createStore } from "redux"
import counterReducer from "./reducer"

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = legacy_createStore(counterReducer)

const handleClick = (type) => {
    switch (type) {
        case 'good':
            store.dispatch({ type: 'GOOD' })
            break;
        case 'ok':
            store.dispatch({ type: 'OK' })
            break;
        case 'bad':
            store.dispatch({ type: 'BAD' })
            break;
        case 'reset':
            store.dispatch({ type: 'ZERO' })
            break;

        default:
            break;
    }
}

const App = () => {
    return (
        <div>
            <div>
                <button onClick={() => { handleClick('good') }}>Good</button>
                <button onClick={() => { handleClick('ok') }}>Ok</button>
                <button onClick={() => { handleClick('bad') }}>Bad</button>
                <button onClick={() => { handleClick('reset') }}>Reset stats</button>
            </div>

            <p> Good: {store.getState().good} </p>
            <p> ok: {store.getState().ok} </p>
            <p> bad: {store.getState().bad} </p>
        </div>
    )
}

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)