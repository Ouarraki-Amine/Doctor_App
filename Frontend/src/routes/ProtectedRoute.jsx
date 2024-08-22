import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({children, allowedRoles}) =>{

    const {token, role} = useContext(authContext)

    //isAllowed est un booleen qui verifie si le role d'user est inclus dans la liste des roles autorises
    const isAllowed = allowedRoles.includes(role)
    const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true}/>

    return accessibleRoute
}

export default ProtectedRoute;