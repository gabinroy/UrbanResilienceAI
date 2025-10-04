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
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Z"
        fill="hsl(var(--card))"
      />
      <path
        d="M216,92.5C216,160,128,232,128,232S40,160,40,92.5a88,88,0,0,1,176,0Z"
        fill="url(#logo-gradient)"
        opacity="0.2"
      />
      <path
        d="M172.4,96.33a52,52,0,0,1-88.8,0c14.24-23.83,44.4-48.33,44.4-48.33S158.16,72.5,172.4,96.33Z"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--card))"
        strokeWidth="6"
      />
      <line
        x1="128"
        y1="48"
        x2="128"
        y2="128"
        fill="none"
        stroke="hsl(var(--card))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M128,128s-20-8-28-28"
        fill="none"
        stroke="hsl(var(--card))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M128,128s20-8,28-28"
        fill="none"
        stroke="hsl(var(--card))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect 
        x="96" 
        y="144" 
        width="24" 
        height="48" 
        rx="4"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--card))"
        strokeWidth="4"
      />
      <rect 
        x="136" 
        y="128" 
        width="24" 
        height="64" 
        rx="4"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--card))"
        strokeWidth="4"
      />
    </svg>
  );
}
