const noteReducer = (state = [], action) => {
    switch (action.type) {
    case 'NOTE_ADD':
        return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE': {
        const id = action.payload.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = {
            ...noteToChange,
            important: !noteToChange.important
        }
        return state.map(note => note.id !== id ? note : changedNote)
    }
    }

    return state
}

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
    return {
        type: 'NOTE_ADD',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

export default noteReducer
