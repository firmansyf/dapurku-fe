'use client'

import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react'
import { initialState, stateReducer, State, Action } from '@/stores'
import { deleteCookie } from 'cookies-next'
interface StateContextProps {
    state: State
    dispatch: Dispatch<Action>
    afterSuccessLogin: (
      token: string,
      user: {id: number, email: string}
    ) => void
    clearLogout: () => void
}
  
const StateContext = createContext<StateContextProps | undefined>(undefined)
interface StateProviderProps {
    children: ReactNode;
}


export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, initialState);
  
    const afterSuccessLogin = async (
      token: string,
      user: {id: number, email: string} 
    ) => {
      localStorage.setItem('token', token)
      dispatch({type: 'LOGIN', payload: user,})
    }
  
    const clearLogout = () => {
      localStorage.clear()
      deleteCookie('token')
      dispatch({type: 'LOGOUT'})
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