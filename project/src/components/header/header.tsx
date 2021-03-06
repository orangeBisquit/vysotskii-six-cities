import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';
import UserLink from '../user/user';
import {memo} from 'react';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus
}

function Header({authorizationStatus}: HeaderProps) {

  const isLoggedIn = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to='/' className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isLoggedIn ?
                <UserLink/> : null}

              <li className="header__nav-item">
                <Link
                  to={AppRoute.MainPage}
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutAction());
                  }}
                  className="header__nav-link"
                >
                  <span className="header__signout">
                    {isLoggedIn ? 'Sign out' : 'Sign in'}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header, (prev, next) => prev.authorizationStatus === next.authorizationStatus);
