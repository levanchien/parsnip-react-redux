
## Summary
- Container components receive data from Redux and dispatch action creators, and presentational components accept data as props and handle markup.
- Actions are objects describing an event. Action creators are functions that return actions.
- Reducers are pure functions that update state in response to actions.
- Side effects can be handled in action creators. Reducers, however, should be pure functions, meaning they don’t perform any mutations and always return the same value given the same inputs.
- A configured Redux store can be made available to your app using react-redux and the Provider component.
- The commands connect and mapStateToProps pass data from Redux into a React component as props.