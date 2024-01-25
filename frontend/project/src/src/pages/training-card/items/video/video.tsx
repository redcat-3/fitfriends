type VideoProps = {
  previewImage: string,
  previewVideoLink: string,
};
const Video = ({previewImage, previewVideoLink}:VideoProps) => (
  <video
    title="video"
    poster={`${previewImage}.png`}
    autoPlay
    controls
    muted
    width="922"
    height="566"
  >
    <source src={`${previewVideoLink}.mov`} />
  </video>
);
export default Video;