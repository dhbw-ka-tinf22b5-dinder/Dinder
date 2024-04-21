import {Header,Nav} from "../../styles/universal.styles";
import {Outlet, useNavigate} from "react-router-dom";
import HandymanIcon from '@mui/icons-material/Handyman';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {resetError} from "../../thunks/resetErrorThunk";
import {User} from "../../types/general.types";
import {Button} from "../atoms/Button.component";
const NavBarComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const valueUser:User = useAppSelector((state) => state.login);
    const nav = () => {
        navigate("/")
        dispatch(resetError());
    }
    return <>
            <Nav>
                <HandymanIcon fontSize={"large"} onClick={() => nav()}/>
                <Header onClick={() => nav()}>DINDER</Header>
                {valueUser.userName}
                <Button span={1} text={"create"} click={()=>navigate("/create")} />
            </Nav>
            <Outlet/>
    </>

}

export default NavBarComponent;