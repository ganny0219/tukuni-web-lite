import Image from "next/image";
import React from "react";
type Props = {
  size?: number;
  src: string;
  alt: string;
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  lazyload?: boolean;
};

function CustomImage({
  size,
  alt,
  src,
  rounded,
  className,
  onClick,
  lazyload,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{ minWidth: size ? size : 32, minHeight: size ? size : 32 }}
      className={`relative overflow-hidden ${
        rounded ? "rounded-full" : "rounded-md"
      } ${className ? className : ""}`}
    >
      <Image
        src={src ? src : "/images/no-picture.png"}
        alt={alt}
        fill
        sizes="100%"
        loading={lazyload ? "lazy" : "eager"}
      />
    </div>
  );
}

export default CustomImage;
