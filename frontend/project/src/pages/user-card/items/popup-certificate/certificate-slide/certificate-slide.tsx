import '../css/certificate.css';

type CertificateSlideProps = {
  slide: string
};

const CertificateSlide = ({slide}: CertificateSlideProps): JSX.Element => (
  <div className="popup__slide-img" style={{minWidth: '100%', flex: '1 0 100%', marginRight: 120}}>
    <div>
      <picture>
        <source type="image/webp" srcSet={`${slide}.webp, ${slide}.webp 2x`} />
        <img
          src={`${slide}.jpg`}
          srcSet={`${slide}@2x.jpg 2x`}
          width="294"
          height="360"
          alt='Сертификат'
        />
      </picture>
    </div>    
  </div>
);
export default CertificateSlide;
