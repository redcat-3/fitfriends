import { Helmet } from 'react-helmet-async';
import BackgroundLogo from '../../components/background-logo/background-logo';
import PopupSignUp from '../../components/popup-sign-up/popup-sign-up';

function SignUp(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Регистрация</title>
      </Helmet>
      <main>
        <BackgroundLogo />
        <PopupSignUp />
      </main>
    </div>
  );
}
export default SignUp;
