
type Props = {
  src?: string;
  alt?: string;
  srcSet?: string;
  style?: React.CSSProperties;
  classes?: {
    img?: string;
  },
  sizes?: string;
}

export const ResponsiveImage = ({
  src,
  srcSet,
  style = {},
  classes = {},
  alt,
  sizes
}: Props) => {


  return <img
    className={`${classes.img || ""}`}
    src={src}
    srcSet={srcSet || `${src} 500w, ${src} 182w, ${src} 255w`}
    style={{ ...style }}
    sizes={sizes || `(max-width: 600px) 480px, (max-width: 1200px) 1024px, 1600px`}
    alt={alt}
  />
}
