import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/logo.a307e1c4.svg";

function Header({loggedIn, email, handleSignOut}){
    const { pathname } = useLocation();
    const text = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

    return (
        <header className="header">
            <img src={headerLogo} alt="Главный логотип" className="header__logo" />
            <div className="header__wrap">
                {loggedIn ? (
                    <>
                        <p className="header__email">{email}</p>
                        <Link className="header__signout" to="" onClick={handleSignOut}>Выйти</Link>
                    </>) : (<Link to={linkRoute} className="header__link">{text}</Link>)
                }
            </div>
        </header>
    )
}
export default Header;
