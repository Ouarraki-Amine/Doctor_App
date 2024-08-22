import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    // recuperer les donees depuis le navigateur s'il existe
    user: localStorage.getItem("user") != undefined ? JSON.parse(localStorage.getItem("user")) : null,
    role: localStorage.getItem("role") || null,
    token: localStorage.getItem("token") || null,
};

export const authContext = createContext(initialState);

const authReducer = (state, action)=>{

    switch (action.type) {
        case 'LOGIN_START':

        return {
            user: null,
            role: null,
            token: null,
        };

        case "LOGIN_SUCCESS":
        return{
                user:action.payload.user,
                token:action.payload.token,
                role:action.payload.role
        };

        case 'LOGOUT':
        return {
                user: null,
                role: null,
                token: null,
        };

        default:
        return state;
    }
};


 const authContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer, initialState)

    useEffect(()=>{
        // stocker les donnees en Navigateur afin de le ne pas perd
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('token', state.token)
        localStorage.setItem('role', state.role)
    },[state])

    return <authContext.Provider value={{user:state.user, token:state.token, role:state.role, dispatch}}>
        {children}
    </authContext.Provider>
}

export default authContextProvider;

/**Initial State : L'état initial (initialState) est déterminé par les valeurs stockées dans le localStorage du 
navigateur, ce qui permet de persister les données d'authentification même après un rafraîchissement de la page.

authContext : Ce contexte est créé pour partager l'état d'authentification à travers l'application. Toutes les 
valeurs encapsulées dans ce contexte sont accessibles aux composants descendants via le hook useContext.

authReducer : Le réducteur gère les mises à jour de l'état en fonction des actions (LOGIN_START, LOGIN_SUCCESS, 
LOGOUT). Chaque action mise à jour l'état en conséquence, par exemple, réinitialisation de l'état lors de 
LOGIN_START ou mise à jour avec les informations utilisateur lors de LOGIN_SUCCESS.

authContextProvider : Ce composant encapsule l'application ou une partie de l'application, fournissant l'état 
d'authentification et les fonctions associées. Il utilise useReducer pour gérer l'état et useEffect pour 
synchroniser les changements avec localStorage. Cela garantit que les données sont sauvegardées dans le navigateur, 
permettant de persister l'état même après un rechargement de la page. */