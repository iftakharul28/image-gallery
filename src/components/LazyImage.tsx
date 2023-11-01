import { useEffect } from 'react';
import useLazyLoadImage from '../hooks/useLazyLoader';
import './LazyImage.css';

type LazyImageProps = {
  src: string;
  alt?: string;
};

const LazyImage = ({ src, alt }: LazyImageProps) => {
  const { imageRef, isIntersecting } = useLazyLoadImage('-300px');
  useEffect(() => {
    if (!imageRef?.current) return;
    if (isIntersecting) {
      const dataSrc = imageRef.current?.getAttribute('data-src');
      if (dataSrc) {
        imageRef.current.src = dataSrc;
      }
    }
  }, [isIntersecting, imageRef]);

  return <img data-test-id='component-image' className='lazy-image' ref={imageRef} src={src + `?w=10`} alt={alt} data-src={src + `?w=1800`} />;
};

export default LazyImage;
