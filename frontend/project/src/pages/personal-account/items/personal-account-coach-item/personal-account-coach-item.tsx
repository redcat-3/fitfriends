import { useRef, useState } from 'react';
import '../css/style.css';
import { useAppDispatch } from '../../../../hooks';
import { redirectToRoute } from '../../../../store/action';
import { AppRoute } from '../../../../constant';

type PersonalAccountCoachItemProps = {
  id: number,
  certificate: string,
  userId: string
};

function PersonalAccountCoachItem({certificate, id, userId}: PersonalAccountCoachItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(true);
  const inputFile = useRef<HTMLInputElement>(null);
  const updateCertificate = () => {
    if(inputFile.current?.files) {
      const input = inputFile.current.files[0];
      console.log(input);
      dispatch(redirectToRoute(`/personal-account/${userId}` as AppRoute));
      setIsEdit(true);
    }
  };

  const handlerInput = () => {
    inputFile.current?.click();
  };

  const handlerDelete = () => {
    console.log('Delete certificate');
  };

  const handlerFileChange = () => {
    if(inputFile.current?.files) {
      const input = inputFile.current.files[0];
      console.log(input);
    }
  };
  return (
    <li className="personal-account-coach__item slide">
      <div className="certificate-card certificate-card--edit">
        <div className="certificate-card__image slide-image">
          <picture>
            <source
              type="image/webp"
              srcSet={`${certificate}.webp ${certificate}@2x.webp 2x`}
            />
            <img
              src={`${certificate}.jpg`}
              srcSet={`${certificate}@2x.jpg 2x`}
              width="294"
              height="360"
              alt="Сертификат"
            />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          {isEdit ? 
            <button
              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
              type="button"
              style={{display: 'flex'}}
              onClick={() => {
                setIsEdit(false);
              }}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Изменить</span>
            </button> :
            <button
              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
              type="button"
              onClick={updateCertificate}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Сохранить</span>
            </button>
          }
          {isEdit === false && 
            <div className="certificate-card__controls">
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="change"
                onClick={handlerInput}
              >
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-change"></use>
                </svg>
              </button>
              <input
                type="file"
                ref={inputFile}
                className="visually-hidden"
                accept=".pdf"
                onChange={handlerFileChange}
              />
              <button
                className="btn-icon certificate-card__control"
                type="button" aria-label="delete"
                onClick={handlerDelete}
              >
                <svg width="14" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-trash"></use>
                </svg>
              </button>
            </div>
          }
        </div>
      </div>
    </li>
  );
}

export default PersonalAccountCoachItem;
