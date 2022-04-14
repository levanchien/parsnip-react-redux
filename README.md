
## Summary
- Container components receive data from Redux and dispatch action creators, and presentational components accept data as props and handle markup.
- Actions are objects describing an event. Action creators are functions that return actions.
- Reducers are pure functions that update state in response to actions.
- Side effects can be handled in action creators. Reducers, however, should be pure functions, meaning they don’t perform any mutations and always return the same value given the same inputs.
- A configured Redux store can be made available to your app using react-redux and the Provider component.
- The commands connect and mapStateToProps pass data from Redux into a React component as props.

- The difference between dispatching asynchronous and synchronous actions
- How redux-thunk enables the dispatching of functions, which can be used to perform side effects, like network requests
- How API clients can reduce duplication and improve reusability
- The two conceptual groups of actions: view actions and server actions
- The three important moments during the lifecycle of a remote API call: start, successful completion, and failure
- Rendering errors to improve overall user experience

- Selectors are functions that accept a state from the Redux store and compute data that will eventually be passed as props to React.