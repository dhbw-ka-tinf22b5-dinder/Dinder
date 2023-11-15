import {Header,Logo,Nav} from "../../styles/universal.styles";
import {Outlet, useNavigate} from "react-router-dom";

const NavBarComponent = () => {
    const navigate = useNavigate();

    const nav = () => {
        navigate("/")
    }
    return <>
        <Nav >
            <Logo src={"./pictures/tools.png"} onClick={()=>nav()} />
            <Header onClick={()=>nav()}>DINDER</Header>
        </Nav>
        <Outlet />
    </>
}

export default NavBarComponent;