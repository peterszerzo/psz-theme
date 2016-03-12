import React from 'react'

export function BackToMain(props) {
  return (
    <svg viewBox="0 0 100 100">
      <g>
        <polygon points="62.318,5.066 37.018,48.891 11.715,5.066 	"/>
        <polygon points="31.446,68.748 16.328,94.934 1.208,68.748 	"/>
        <polygon points="98.792,45.05 79.288,78.83 59.786,45.05 	"/>
      </g>
    </svg>
  )
}

export function Arrow(props) {
  return (
    <svg viewBox="0 0 200 200">
      <g>
        <polygon points="137.878,67.196 100.001,132.804 62.122,67.196"/>
      </g>
    </svg>
  )
}

export function Down(props) {
  return (
    <svg viewBox="0 0 100 100">
      <g>
        <path d="M50.002,66.139c-0.678,0-1.356-0.172-1.967-0.517L5.03,41.345c-1.924-1.086-2.603-3.526-1.517-5.45
    c1.087-1.923,3.525-2.603,5.45-1.517l41.038,23.167l41.036-23.167c1.927-1.085,4.364-0.407,5.45,1.517s0.407,4.363-1.517,5.45
    L51.969,65.622C51.358,65.966,50.68,66.139,50.002,66.139z"/>
      </g>
    </svg>
  )
}

export function Falafel(props) {
  const startY = 15
  const height = 12
  const spacing = 16
  return (
    <svg viewBox="0 0 100 100">
      <g>
        <rect
          x="0"
          y={startY + 0}
          width="100"
          height={height}
          transform={'rotate(0)'}
        />
      <rect x="0" y={startY + height + spacing} width="100" height={height} />
        <rect x="0" y={startY + 2 * height + 2 * spacing} width="100" height={height} />
      </g>
    </svg>
  )
}
