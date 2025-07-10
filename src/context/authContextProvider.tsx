'use client'

import { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react'
import { initialState, stateReducer, State, Action } from '@/stores'
import { deleteCookie } from 'cookies-next'
// import { User } from '@/types/admin/userManagement'
import { getProfile } from '@/api/auth'

interface StateContextProps {
    state: State
    dispatch: Dispatch<Action>
    afterSuccessLogin: (
      token: string,
      user: { id: number, email: string },
    ) => void
    clearLogout: () => void
}
  
const StateContext = createContext<StateContextProps | undefined>(undefined)
interface StateProviderProps {
    children: ReactNode;
}

const loadStateFromLocalStorage = (): State => {
  try {
    const storedState = localStorage.getItem('appState');
    const storedProfile = localStorage.getItem('profileInfo')
    return {
      ...initialState,
      ...(storedState ? JSON.parse(storedState) : {}),
      profileInfo: storedProfile ? JSON.parse(storedProfile) : undefined,
    };
  } catch (error) {
    console.error('Error loading state from localStorage', error)
    return initialState
  }
}

const saveStateToLocalStorage = (state: State) => {
  try {
    localStorage.setItem('appState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state to localStorage', error);
  }
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, loadStateFromLocalStorage())
  
  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state])

  const afterSuccessLogin = async (
    token: string,
    user: { id: number, email: string }, 
  ) => {
    try {
      localStorage.setItem('token', token)
      dispatch({ type: 'LOGIN', payload: user })

      const res = await getProfile()
      if (res.data) {
        dispatch({ type: 'INFO_PROFILE', payload: res.data })
      }
    } catch (error) {
      console.error('Error fetching profile info:', error)
    }
  }

  const clearLogout = () => {
    localStorage.clear();
    deleteCookie('token');
    dispatch({ type: 'LOGOUT' });
    
    window.location.href = '/';
  }
  
    return (
      <StateContext.Provider value={{ state, dispatch, afterSuccessLogin, clearLogout}}>
        {children}
      </StateContext.Provider>
    );
}

export const useGlobalState = (): StateContextProps => {
    const context = useContext(StateContext);
    
    if (context === undefined) {
      throw new Error('useGlobalState must be used within a StateProvider');
    }
    return context;
}
