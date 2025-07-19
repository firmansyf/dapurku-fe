import { User } from "./types";

export interface State {
  user: { id?: number; email?: string } | null;
  data: User | null,
  isAuthenticated: boolean;
  isMobile?: boolean
}

export type Action =
| { type: 'LOGIN', payload: { id?: number; email?: string } }
| { type: 'LOGOUT' }
| { type: 'ISMOBILE' }
| { type: 'INFO_PROFILE', payload: User }

export const initialState = {
    user: null,
    data: null,
    isAuthenticated: false,
    isMobile: false
}
  
export const stateReducer = (state: State, action: Action) => {
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
          data: null,
          isAuthenticated: false,
        }
      case 'INFO_PROFILE':
        return {
          ...state,
          data : action.payload,
          isAuthenticated: state.isAuthenticated || true,
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