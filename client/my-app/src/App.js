import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import NAvBar from './components/NAvbar';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import { createContext, useEffect, useReducer } from 'react';
import { initialState,Reducer } from './reducer/Reducer';
import Cookies from 'js-cookie';

export const UserContext=createContext()
function App() {
  const [state,dispatch]=useReducer(Reducer,initialState)
  
 
  return (
    <BrowserRouter>
    <UserContext.Provider value={{state,dispatch}}>
    <NAvBar/>
    
    <MainNavigation/>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
/* Ellipse 182 */

