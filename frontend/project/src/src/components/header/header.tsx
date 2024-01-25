import React from 'react';
import MainNav from './items/main-nav/main-nav';
import HeaderLogo from './items/header-logo/header-logo';
import Search from './items/search/search';
import { useAppSelector } from '../../hooks';
import { getAuthId } from '../../store/user-process/selectors';
import { fetchNotificationsAction, fetchUserAction } from '../../store/api-actions';
import { store } from '../../store';

function Header(): JSX.Element {
  const id = useAppSelector(getAuthId);
  store.dispatch(fetchUserAction(id));
  store.dispatch(fetchNotificationsAction);
  return (
    <header className="header" title="header">
      <div className="container">
        <HeaderLogo />
        <MainNav userId={id} />
        <Search />
      </div>
    </header>
  );
}
export default React.memo(Header);
