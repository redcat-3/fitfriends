import { Helmet } from 'react-helmet-async';
import BackgroundLogo from '../../components/background-logo/background-logo';
import PopupQuestionnaireUser from '../../components/popup-questionnaire-user/popup-questionnaire-user';

function QuestionnaireUser(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Опросник</title>
      </Helmet>
      <main>
        <BackgroundLogo />
        <PopupQuestionnaireUser />
      </main>
    </div>
  );
}
export default QuestionnaireUser;
