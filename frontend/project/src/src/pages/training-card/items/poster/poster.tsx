type PosterProps = {
  previewImage: string
};
const Poster = ({previewImage}: PosterProps) => (
  <div className="training-video__thumbnail">
    <picture>
      <source
        type="image/webp"
        srcSet={`${previewImage}.webp, ${previewImage}@2x.webp 2x,`}
      />
      <img
        src={`${previewImage}.png`}
        srcSet={`${previewImage}@2x.png 2x`}
        width="922"
        height="566"
        alt="Обложка видео"
      />
    </picture>
  </div>
);
export default Poster;