import { useState, useRef } from 'react';
import { Clsx } from '@iftakhar/ui';
import { useIntersection } from '../hooks/IntersectionObserver';
import type { Prettify } from '../models/common';
import './LazyImage.css';
interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  divClassName?: string;
  quality?: number;
  status?: React.ReactNode;
  children?: React.ReactNode;
}
const LazyLoader = (props: Prettify<Props>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLElement | null>(null);
  useIntersection(imgRef, () => {
    setIsInView(true);
  });
  return (
    <figure className={Clsx(!isLoaded ? 'lazy-loading' : '', props?.divClassName ? props?.divClassName : '')} ref={imgRef}>
      {props.children ? props.children : null}
      {isInView ? (
        <img
          className={props?.className}
          src={props.src}
          alt={props.alt}
          height={props.height}
          width={props.width}
          loading={props.loading}
          sizes={props.sizes}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
      ) : null}
    </figure>
  );
};

export default LazyLoader;
