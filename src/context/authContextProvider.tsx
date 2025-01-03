'use client'

import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react'
import { initialState, stateReducer, State, Action } from '@/stores'
import { deleteCookie } from 'cookies-next'
import { User } from '@/types/admin/userManagement'

interface StateContextProps {
    state: State
    dispatch: Dispatch<Action>
    afterSuccessLogin: (
      token: string,
      user: { id: number, email: string },
      data: User
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
    if (storedState) {
      return JSON.parse(storedState);
    }
  } catch (error) {
    console.error('Error loading state from localStorage', error);
  }
  return initialState
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
  
  React.useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state])
  
  const afterSuccessLogin = (
    token: string,
    user: { id: number, email: string }, 
    data: User
  ) => {
    localStorage.setItem('token', token)
    dispatch({ type: 'LOGIN', payload: user, })
    dispatch({ type: 'INFO_PROFILE', payload: data })
  }

  const clearLogout = () => {
    localStorage.clear()
    deleteCookie('token')
    dispatch({ type: 'LOGOUT' })
    window.location.reload()
  }
  
    return (
      <StateContext.Provider value={{ state, dispatch, afterSuccessLogin, clearLogout}}>
        {children}
      </StateContext.Provider>
    );
}

export const useGlobalState = (): StateContextProps => {
    const context = useContext(StateContext)
    
    if (context === undefined) {
      throw new Error('useGlobalState must be used within a StateProvider');
    }
    return context;
}