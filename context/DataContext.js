import { createContext,useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
   const [loggedUser,setLoggedUser] = useState(null);
   const [nomeCidade,setNomeCidade] = useState('');
   const [favoritos,setFavoritos] = useState([]);

   return (
    <DataContext.Provider value={{loggedUser, setLoggedUser,favoritos,setFavoritos,nomeCidade,setNomeCidade}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;