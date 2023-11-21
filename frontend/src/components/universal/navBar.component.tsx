import {Header,Nav} from "../../styles/universal.styles";
import {Outlet, useNavigate} from "react-router-dom";
import HandymanIcon from '@mui/icons-material/Handyman';
const NavBarComponent = () => {
    const navigate = useNavigate();

    const nav = () => {
        navigate("/")
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