import './App.css'
import TodoApp from './Todo'
import React from 'react'

class App extends React.Component {
    constructor (props: {}) {
        super(props)
        this.state = { }
    }

    render () {
        return (
            <main>
                <TodoApp />
            </main>
        )
    }
}

export default App
