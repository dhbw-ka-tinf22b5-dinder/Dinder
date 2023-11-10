import {Logo} from "../../styles/universal.styles.ts";
import {Outlet} from "react-router-dom";

const NavBarComponent = () => {

    return <>
        <Logo>DINDER</Logo>
        <Outlet />
    </>
}

export default NavBarComponent;