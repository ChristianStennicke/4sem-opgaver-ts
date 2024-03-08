export enum ActionType {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT'
  }
  
  export type Action = { type: ActionType.INCREMENT } | { type: ActionType.DECREMENT };
  
  export const initialState = { count: 0 };
  
  export const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
      case ActionType.INCREMENT:
        return { count: state.count + 1 };
      case ActionType.DECREMENT:
        return { count: Math.max(0, state.count - 1) };
      default:
        return state;
    }
  };
  