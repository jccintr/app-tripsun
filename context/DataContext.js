import { createContext,useState,useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
   const [loggedUser,setLoggedUser] = useState(null);
   const [nomeCidade,setNomeCidade] = useState('');

   return (
    <DataContext.Provider value={{loggedUser, setLoggedUser,nomeCidade,setNomeCidade}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;