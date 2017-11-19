import { ADD_RECIPE, } from '../actions/types';

const recipeReducer = (state ={}, action) => {
  switch(action.type){
    case 'ADD_RECIPE' :
      return Object.assign({}, state, { user : action.payload});
      break;

    case 'UPDATE_RECIPE' :
      return action.payload;
      break;

    case 'DELETE_RECIPE' :
      return action.payload;
      break;

    case 'GET_RECIPE' :
      return action.payload;
      break;
      
    case 'GET_RECIPES' :
      return action.payload;
      break;

    case 'GET_FAVOURITE_RECIPE' :
      return action.payload;
      break;
    
    case 'ADD_FAVOURITE_RECIPE' :
      return action.payload;
      break;

    case 'REMOVE_FAVOURITE_RECIPE' :
      return action.payload;
      break;

    case 'REVIEW_RECIPE' :
      return action.payload;
      break;

    case 'UPVOTE_RECIPE' :
      return action.payload;
      break;

    case 'DONWVOTE_RECIPE' :
      return action.payload;
      break;
  }
  return state;
}

export default recipeReducer;