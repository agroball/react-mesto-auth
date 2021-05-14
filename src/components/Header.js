import headerLogo from "../images/logo.a307e1c4.svg";
import { Link, withRouter } from "react-router-dom";

function Header(){
    // смена видимости линки
    // const [linkState, setLinkState] = React.useState('');


    return(
    <div className="header">
        <img className="header__logo" src={headerLogo} alt="Главный логотип"/>
    </div>
    )
}
export default Header;
