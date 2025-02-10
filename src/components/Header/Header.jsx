import '../../styles/Header.css';
import Logo from '../../img/argentBankLogo.webp'; // Chemin corrigé
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/reducers/authUserSlice';

function Header() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const userProfile = useSelector((state) => state.user);

    const handleSignOut = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Link to="/">
                <img className="logo" src={Logo} alt="Argent Bank logo" />
            </Link>
            <nav className="header_nav">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="link">
                            <i className="fa fa-user-circle icon-header"></i>
                            {userProfile.userName || userProfile.firstName}
                        </Link>
                        <Link to="/login" onClick={handleSignOut} className="link">
                            <i className="fa fa-sign-out icon-header"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="link">
                        <i className="fa fa-user-circle icon-header"></i>
                        Sign In
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
