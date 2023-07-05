//Define initial state 'count' for the application
const initialState = {
  count: 0,
};

//Create a "reducer" function that determines what the new state
//should be when something happens in the app
function counterReducer(state = initialState, action) {
  //Reducers need the state and an action
  //Reducers look at action type to decide how to update the state
  switch (action.type) {
    case "counter/incremented":
      return {
        ...state,
        count: state.count + 1,
      };
    case "counter/decremented":
      return {
        ...state,
        count: state.count - 1,
      };
    case "counter/reset":
      return {
        ...state,
        count: 0,
      };
    default:
      //If the reducer doesn't care about this action type,
      //return the existing state unchanged
      return state;
  }
}

//Create a new Redux store with the `createStore` function,
//and use the `counterReducer` for the update logic
//We pass the reducer function to createStore which uses the reducer
//to generate the initial state and calculate further updates
const store = Redux.createStore(counterReducer);

const valueEl = document.getElementById("value");

//Whenever the store state changes, update the UI by
//reading the latest store state and rendering it
function render() {
  const state = store.getState();
  valueEl.innerHTML = state.count.toString();
}

//Render the initial state
render();

//And subscribe to redraw whenever the state changes
store.subscribe(render);

// Handle user inputs by "dispatching" action objects to the store
//which should describe "what happened" in the app
document.getElementById("increment").addEventListener("click", function () {
  store.dispatch({ type: "counter/incremented" });
});

document.getElementById("decrement").addEventListener("click", function () {
  store.dispatch({ type: "counter/decremented" });
});

document
  .getElementById("incrementIfOdd")
  .addEventListener("click", function () {
    if (store.getState().count % 2 !== 0) {
      store.dispatch({ type: "counter/incremented" });
    }
  });

document
  .getElementById("incrementAsync")
  .addEventListener("click", function () {
    setTimeout(function () {
      store.dispatch({ type: "counter/incremented" });
    }, 1000);
  });

document.getElementById("reset").addEventListener("click", function () {
  store.dispatch({ type: "counter/reset" });
});
