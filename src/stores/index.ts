export interface State {
  user: { id?: number; email?: string } | null;
  isAuthenticated: boolean;
  isMobile?: boolean
}

export type Action =
  | { type: 'LOGIN'; payload: { id?: number; email?: string } }
  | { type: 'LOGOUT' }
  | { type: 'ISMOBILE' }

export const initialState = {
    user: null,
    isAuthenticated: false,
    isMobile: false
};
  
export const stateReducer = (state : State, action: Action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        }
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        }
      case 'ISMOBILE':
        return {
          ...state,
          isMobile: false,
        }
      default:
        return state;
    }
};