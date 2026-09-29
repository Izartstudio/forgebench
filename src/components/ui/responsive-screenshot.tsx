import Image, { type ImageProps } from "next/image";

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
  ...imageProps
}: ResponsiveScreenshotProps) {
  return (
    <picture>
      {mobileSrc && <source media={mobileMedia} srcSet={mobileSrc} />}
      <Image src={desktopSrc} alt={alt} {...imageProps} />
    </picture>
  );
}
