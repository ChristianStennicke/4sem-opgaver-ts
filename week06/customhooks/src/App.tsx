// App.tsx
import React, { useReducer } from 'react';
import { reducer, initialState, ActionType } from './reducer';
import { useAuth } from './AuthContext';
import LoginButtons from './LoginButtons';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  return (
    <div>
      <h1>useReducer Counter App</h1>
      <LoginButtons />
      <p>User: {user ? user.username : 'Not logged in'}</p>
      <button onClick={() => dispatch({ type: ActionType.INCREMENT })}>Increment</button>
      <button onClick={() => dispatch({ type: ActionType.DECREMENT })} disabled={state.count === 0}>
        Decrement
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
};

export default App;
