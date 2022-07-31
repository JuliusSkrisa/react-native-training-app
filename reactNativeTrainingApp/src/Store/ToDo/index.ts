import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'todo',
  initialState: { todo: [] } as TodoState,
  reducers: {
    addTask: (state, { payload }: { payload: Todo }) => {
        state.todo.push(payload);
    },
    removeTask: (state, { payload }: { payload : { id: number } } ) => {
        if (state.todo) {
            const index = state.todo.findIndex(item => item.id === payload.id)
            state.todo.splice(index, 1);
        }
    },
    updateTask: (state, { payload }: { payload: Todo }) => {
        if (state.todo) {
            const index = state.todo.findIndex(item => item.id === payload.id)
            state.todo[index] = payload;
        }
    }
  },
})

export const { addTask, removeTask, updateTask } = slice.actions

export default slice.reducer

export type TodoState = {
  todo: Array<Todo>
}

export type Todo = {
    id: number,
    name: string,
    done: boolean
}

type TodoPayload = {
  payload: Partial<Todo>
}
