
'use client'

import { useGlobalState } from "@/context/authContextProvider"

export default function Home() {
  const { state } = useGlobalState()
  
  return (
    <div className="p-20">
      <span>{state.isAuthenticated ? 'Logged' : 'not Logged'}</span>

    </div>
  );
}
