import { Helmet } from 'react-helmet-async';
import BackgroundLogo from '../../components/background-logo/background-logo';
import PopupSignIn from '../../components/popup-sign-in/popup-sign-in';

function SignIn(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Вход</title>
      </Helmet>
      <main>
        <BackgroundLogo />
        <PopupSignIn />
      </main>
    </div>
  );
}
export default SignIn;
