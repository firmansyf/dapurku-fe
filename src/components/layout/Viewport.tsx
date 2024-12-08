/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalState } from "@/context/authContextProvider";
import { useEffect } from "react";

export default function Viewport(props: any) {
    const deviceIsMobile = props.isMobile
    const { dispatch } = useGlobalState();
  
    useEffect(() => {
      if (deviceIsMobile) dispatch({type: 'ISMOBILE'})
    }, [deviceIsMobile])
  
    return <div></div>
  }
