import { combineReducers } from 'redux'

const initialState = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
]

const planets = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE':
      console.log('old state', state);
      const { indexA, indexB } = action.payload
      const newState = [...state]
      newState.splice(indexB, 0, newState.splice(indexA, 1)[0])
      console.log('new state', newState);
      return newState
    default:
      return [...state]
  }
}

export default combineReducers({ planets })
