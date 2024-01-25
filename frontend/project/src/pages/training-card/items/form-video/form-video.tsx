import { ChangeEventHandler } from "react";

type FormVideoProps = {
  handleVideoChange: (file: File) => void
};
function FormVideo ({handleVideoChange}: FormVideoProps) {
const handleVideoClick: ChangeEventHandler<HTMLInputElement> = (event) => {
  if(event.target.files) {
    const fileVideo = event.target.files[0];
    handleVideoChange(fileVideo);
  }
};
    return (
      <div className="training-video__drop-files" style={{display: 'block'}}>
        <form action="#" method="post">
          <div className="training-video__form-wrapper">
            <div className="drag-and-drop">
              <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-import-video"></use>
                </svg></span>
                <input
                  type="file"
                  name="import"
                  tabIndex={-1}
                  accept=".mov, .avi, .mp4"
                  onChange={handleVideoClick}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    );
}

export default FormVideo;