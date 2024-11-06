import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Provider } from 'react-redux';
import {Store , persistor} from "@/Component/Redux/store";
const MainLayout = (props) => {
  return (
    <>
   <Provider store={Store}>
      <NavBar />
      
      {props.children}
      </Provider>
    </>
  )
}

export default MainLayout
