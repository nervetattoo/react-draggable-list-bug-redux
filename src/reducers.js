import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const initialPlanets = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
]

const planets = (state = initialPlanets, action) => {
  return [...state]
}

export default combineReducers({  planets, form })
