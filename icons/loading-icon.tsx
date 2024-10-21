import { IconProps } from "@/interfaces/global";
import React from "react";

function LoadingIcon({ size }: IconProps) {
  return (
    <div className="flex justify-center items-center animate-spin">
      <svg
        width={size}
        height={size}
        viewBox="0 0 168 168"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84 168C37.6081 168 0 130.392 0 84C0 37.6081 37.6081 0 84 0C130.392 0 168 37.6081 168 84C168 130.392 130.392 168 84 168ZM84 160C125.974 160 160 125.974 160 84C160 42.0264 125.974 8 84 8C42.0264 8 8 42.0264 8 84C8 125.974 42.0264 160 84 160Z"
          fill="url(#paint0_linear)"
          fillOpacity="0.1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.3165 146.308C25.6783 144.826 25.5517 142.297 27.0338 140.658C28.5159 139.02 31.0454 138.894 32.6836 140.376C46.5615 152.931 64.5511 160 83.6529 160C125.627 160 159.653 125.974 159.653 84C159.653 42.0264 125.627 8 83.6529 8C81.4438 8 79.6529 6.20914 79.6529 4C79.6529 1.79086 81.4438 0 83.6529 0C130.045 0 167.653 37.6081 167.653 84C167.653 130.392 130.045 168 83.6529 168C62.5482 168 42.6513 160.181 27.3165 146.308Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="100.881"
            y1="44.2031"
            x2="38.4277"
            y2="25.6914"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#005EFF" />
            <stop offset="1" stopColor="#0095FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="41.6876"
            y1="25.4817"
            x2="14.2141"
            y2="154.634"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#02C8FA" />
            <stop offset="1" stopColor="#00A5F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default LoadingIcon;
