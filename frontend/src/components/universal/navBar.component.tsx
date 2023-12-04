import {Header,Nav} from "../../styles/universal.styles";
import {Outlet, useNavigate} from "react-router-dom";
import HandymanIcon from '@mui/icons-material/Handyman';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {resetError} from "../../thunks/resetErrorThunk";
import {User} from "../../types/general.types";
const NavBarComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const valueUser:User = useAppSelector((state) => state.login);
    const nav = () => {
        navigate("/")
        dispatch(resetError());
    }
    return <>
        <Nav >
            <HandymanIcon fontSize={"large"} onClick={()=>nav()}/>
            <Header onClick={()=>nav()}>DINDER</Header>
            {valueUser.userName}
        </Nav>
        <Outlet />
    </>
}

export default NavBarComponent;