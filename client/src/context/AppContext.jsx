import { useNavigate } from "react-router";
import { dummyChats, dummyUserData } from "../assets/assets";

import { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext()

export const AppContextProvider = ({children})=>{
    const navigate = useNavigate()
    const [user, setuser] = useState(null)
    const [chats, setchats] = useState([])
    const [selectedChats, setselectedChats] = useState(null)
    const [theme, settheme] = useState(localStorage.getItem('theme') || 'light')
    
    const fetchUser = async ()=>{
        setuser(dummyUserData);
    }
    const fetchUserChats = async () => {
      setchats(dummyChats);
      setselectedChats(dummyChats[0]);
    };
    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
      if(user){
        fetchUserChats()
      }
      else{
        setchats([])
        setselectedChats(null)
      }
    }, [user])
    
    useEffect(() => {
      if(theme === "dark"){
        document.documentElement.classList.add('dark')
      } else{
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem('theme', theme)

    }, [theme])
    

    const value = { navigate, user, setuser, chats,setchats,selectedChats,setselectedChats, fetchUser,theme,settheme};
    return(
        <>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export const useAppContext = () => useContext(AppContext)