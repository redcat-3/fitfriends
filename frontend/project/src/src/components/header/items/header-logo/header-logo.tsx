import React from "react";

const HeaderLogo = (): JSX.Element => (
  <span className="header__logo" title="header-logo">
    <svg width="187" height="70" aria-hidden="true">
      <use xlinkHref="#logo"></use>
    </svg>
  </span>
);
export default React.memo(HeaderLogo);
