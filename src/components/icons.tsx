import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={props.width || 32}
        height={props.height || 32}
        {...props}
    >
        <defs>
            <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d0d3d4" />
                <stop offset="100%" stopColor="#a7abaf" />
            </linearGradient>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#0a192f" />
                <stop offset="100%" stopColor="#000000" />
            </radialGradient>
        </defs>

        <circle cx="128" cy="128" r="128" fill="url(#bg-gradient)" />

        <path
            d="M 60 120 C 60 180, 128 230, 128 230 C 128 230, 196 180, 196 120 L 196 80 L 60 80 Z"
            fill="url(#shield-gradient)"
            stroke="#ffffff"
            strokeWidth="4"
        />

        {/* Cityscape */}
        <path
            d="
            M 100 80 L 100 50 L 115 50 L 115 80 Z
            M 120 80 L 120 40 L 135 40 L 135 80 Z
            M 140 80 L 140 60 L 155 60 L 155 80 Z
            M 85 80 L 85 65 L 95 65 L 95 80 Z
            M 160 80 L 160 70 L 170 70 L 170 80 Z
            "
            fill="#c1d5e0"
        />

        {/* Circuit lines */}
        <path
            d="
            M 128 125 L 128 145
            M 128 145 L 110 160
            M 128 145 L 146 160
            M 110 160 L 110 180
            M 146 160 L 146 180
            M 110 160 L 90 150
            M 146 160 L 166 150
            M 90 150 L 90 190
            M 166 150 L 166 190
            "
            stroke="#a7abaf"
            strokeWidth="2"
            fill="none"
        />
        <circle cx="128" cy="125" r="3" fill="#a7abaf" />
    </svg>
  );
}
