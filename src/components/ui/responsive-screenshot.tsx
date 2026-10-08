import Image, { getImageProps, type ImageProps } from "next/image";

type ResponsiveScreenshotProps = Omit<ImageProps, "src"> & {
  desktopSrc: string;
  mobileSrc?: string;
  mobileMedia?: string;
};

export function ResponsiveScreenshot({
  desktopSrc,
  mobileSrc,
  mobileMedia = "(max-width: 47.9375rem)",
  alt,
  quality = 92,
  ...imageProps
}: ResponsiveScreenshotProps) {
  const mobileSrcSet = mobileSrc
    ? getImageProps({
        ...imageProps,
        src: mobileSrc,
        alt,
        quality,
      }).props.srcSet
    : undefined;

  return (
    <picture>
      {mobileSrcSet && <source media={mobileMedia} srcSet={mobileSrcSet} />}
      <Image src={desktopSrc} alt={alt} quality={quality} {...imageProps} />
    </picture>
  );
}
