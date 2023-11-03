import './LazyImage.css';
type LazyImageProps = {
  src: string;
  alt?: string;
};

const LazyImage = ({ src, alt }: LazyImageProps) => {
  return (
    <img
      className='image'
      src={src}
      //  src={src + `?w=10`}
      alt={alt}
      // data-src={src + `?w=1800`}
    />
  );
};

export default LazyImage;
