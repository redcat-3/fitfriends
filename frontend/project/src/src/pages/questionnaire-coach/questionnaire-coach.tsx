import { Helmet } from 'react-helmet-async';
import BackgroundLogo from '../../components/background-logo/background-logo';
import PopupQuestionnaireCoach from '../../components/popup-questionnaire-coach/popup-questionnaire-coach';

function QuestionnaireCoach(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Опросник</title>
      </Helmet>
      <main>
        <BackgroundLogo />
        <PopupQuestionnaireCoach />
      </main>
    </div>
  );
}
export default QuestionnaireCoach;
