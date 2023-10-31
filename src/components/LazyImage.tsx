import { useEffect } from 'react';
import useLazyLoadImage from '../hooks/useLazyLoader';
import './LazyImage.css';

type LazyImageProps = {
  src: string;
  alt?: string;
};

const LazyImage = ({ src, alt }: LazyImageProps) => {
  const { imageRef, isIntersecting } = useLazyLoadImage('-300px');
  // return <img data-test-id='component-image' className='lazy-image' ref={imageRef} src={isIntersecting ? src : undefined} alt={alt} data-src={src + `?w=1800`} />;

  useEffect(() => {
    if (!imageRef?.current) return;
    if (isIntersecting) {
      const dataSrc = imageRef.current?.getAttribute('data-src');
      if (dataSrc) {
        imageRef.current.src = dataSrc;
      }
    }
  }, [isIntersecting, imageRef]);

  return <img data-test-id='component-image' className='lazy-image' ref={imageRef} src={`/images/` + src} alt={alt} data-src={`/images/` + src} />;
};

export default LazyImage;
