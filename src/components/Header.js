import headerLogo from "../images/logo.a307e1c4.svg";

function Header(){
    return(
    <div className="header">
        <img className="header__logo" src={headerLogo} alt="Главный логотип"/>
    </div>
    )
}
export default Header;
