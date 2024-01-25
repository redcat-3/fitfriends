import { Link } from "react-router-dom";

const Search = (): JSX.Element => (
  <div className="search">
    <form action="#" method="get">
      <label><span className="search__label">Поиск</span>
        <input type="search" name="search" />
        <svg className="search__icon" width="20" height="20" aria-hidden="true">
          <use xlinkHref="#icon-search"></use>
        </svg>
      </label>
      <ul className="search__list">
        <li className="search__item"><Link to="#" className="search__link">Бокс</Link></li>
        <li className="search__item"><Link to="#" className="search__link is-active">Бег</Link></li>
        <li className="search__item"><Link to="#" className="search__link">Аэробика</Link></li>
        <li className="search__item"><Link to="#" className="search__link">Text</Link></li>
        <li className="search__item"><Link to="#" className="search__link">Text</Link></li>
        <li className="search__item"><Link to="#" className="search__link">Text</Link></li>
        <li className="search__item"><Link to="#" className="search__link">Text</Link></li>
        <li className="search__item"><Link to="#" className="search__link">Text</Link></li>        
      </ul>
    </form>
  </div>
);
export default Search;
