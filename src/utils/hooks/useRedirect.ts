import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const useRedirect = (dependency: boolean) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!dependency) {
            navigate("/login")
        } else {
            navigate("/profile")
        }
    }, [dependency])

}