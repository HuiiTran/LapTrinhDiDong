

import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./actionTypes"

let nextTodoId = 0

export const addTodo = ( task, title ) => ({

  type: ADD_TODO,
  payload: {

    id: ++nextTodoId,
    task,
    title

  }

})

export const updateTodo = ( id, title, task ) => {

  const payload = {

    id,
    title,
    task,

  }
  
  return {

    type : UPDATE_TODO,
    payload,

  }
}


export const deleteTodo = id => ({

  type: DELETE_TODO,
  payload : {

    id

  }

})


