const initialState = {
  title: 'Home Page'
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'TEST':
      return {
        ...state
      }
    default:
      return state
  }
}