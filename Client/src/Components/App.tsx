import React from 'react'
import TodoApp from './Todo'

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
