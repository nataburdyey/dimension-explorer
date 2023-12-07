import { COUNTER_MINUS, COUNTER_PLUS } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case COUNTER_PLUS:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case COUNTER_MINUS:
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      throw new Error(`No matching action type: ${action.type}`);
  }
};

export default reducer;
