import { useContext } from "react";
import GlobalContext from "../../context/globalContext";

const useGetUserRole = () => {
    const { userData } = useContext(GlobalContext)

    return userData.role;
}

export default useGetUserRole;
