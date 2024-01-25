import { Helmet } from 'react-helmet-async';
import { DEFAULT_NOT_FOUND_MESSAGE } from '../../constant';

type NotFoundProps = {
  text?: string;
};

function NotFound({text}: NotFoundProps): JSX.Element {

  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends</title>
      </Helmet>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1>{text ? text : DEFAULT_NOT_FOUND_MESSAGE}</h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default NotFound;
