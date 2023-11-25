import {Header,Nav} from "../../styles/universal.styles";
import {Outlet, useNavigate} from "react-router-dom";
import HandymanIcon from '@mui/icons-material/Handyman';
import {useAppDispatch} from "../../app/hooks";
import {resetError} from "../../thunks/resetErrorThunk";
const NavBarComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const nav = () => {
        navigate("/")
        dispatch(resetError());
    }
    return <>
        <Nav >
            <HandymanIcon fontSize={"large"} onClick={()=>nav()}/>
            <Header onClick={()=>nav()}>DINDER</Header>

        </Nav>
        <Outlet />
    </>
}

export default NavBarComponent;