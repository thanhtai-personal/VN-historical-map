import { useState, useEffect, ImgHTMLAttributes, ReactNode } from "react";
import { ResponsiveImage } from "./ResponsiveImage";

export interface ILazyLoadImage extends ImgHTMLAttributes<HTMLImageElement> {
  imageClass?: string;
  preloadSrc?: string;
  loadingComponent?: ReactNode;
}

export const LazyLoadImage = ({
  src,
  alt,
  className = "",
  imageClass = "",
  loadingComponent,
  preloadSrc,
  ...restProps
}: ILazyLoadImage) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (src) {
      const img = new Image();
      img.onload = () => {
        setLoaded(true);
      };
      img.src = src;
    }
  }, [src]);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        height: restProps.style?.height || "100%",
        width: restProps.style?.width || "100%",
      }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 flex bg-black justify-center items-center p-4"
          style={{
            minHeight: 180,
          }}
        >
          {preloadSrc ?
            <ResponsiveImage
              classes={{
                img: `${imageClass}`
              }}
              loading="lazy"
              src={src}
              alt={alt}
              {...restProps}
            /> : loadingComponent || <div>loading</div>}
        </div>
      )}
      <ResponsiveImage
        classes={{
          img: `${imageClass}`
        }}
        loading="lazy"
        src={src}
        alt={alt}
        {...restProps}
      />
    </div>
  );
};