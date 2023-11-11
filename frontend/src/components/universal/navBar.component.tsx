import {Header,Logo,Nav} from "../../styles/universal.styles";
import {Outlet, useNavigate} from "react-router-dom";

const NavBarComponent = () => {
    const navigate = useNavigate();

    const nav = () => {
        navigate("/")
    }
    return <>
        <Nav >
            <Logo src={"./react.svg"} onClick={()=>nav()} />
            <Header onClick={()=>nav()}>DINDER</Header>
        </Nav>
        <Outlet />
    </>
}

export default NavBarComponent;