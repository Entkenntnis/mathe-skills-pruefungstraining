import { defArrowMarker } from '@/helper/svg-builder'
import React from 'react'

interface HandballDiagramProps {
  markers: { x: number; y: number; name: string; stroke?: string }[]
}

export function HandballDiagram({ markers }: HandballDiagramProps) {
  return (
    <svg viewBox="0 0 500 330" width={500}>
      {defArrowMarker()}
      <g>
        {/* Y-axis */}
        <line
          x1="50"
          y1="40"
          x2="50"
          y2="270"
          stroke="black"
          markerStart="url(#arrow)"
        />
        <text x="20" y="20" textAnchor="left" fontSize={14}>
          Anzahl der Meisterschaften
        </text>

        {/* Y-axis labels and grid lines */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const h = 270 - i * 27
          return (
            <React.Fragment key={i}>
              <line x1="45" y1={h} x2="55" y2={h} stroke="black" />
              <line
                x1="50"
                y1={h}
                x2="450"
                y2={h}
                stroke="gray"
                strokeDasharray="5,5"
              />
              {(i == 1 || i == 5) && (
                <text x="35" y={h + 5} fontSize="14" textAnchor="end">
                  {i}
                </text>
              )}
            </React.Fragment>
          )
        })}

        {/* X-axis */}
        <line
          x1="50"
          y1="270"
          x2="450"
          y2="270"
          stroke="black"
          markerEnd="url(#arrow)"
        />
        <text x="330" y="315" textAnchor="right" fontSize={14}>
          Anzahl der Mitglieder
        </text>

        {/* X-axis labels and grid lines */}
        {[1000, 2000, 3000, 4000, 5000, 6000].map((value, i) => {
          const w = 50 + (i + 1) * 60
          return (
            <React.Fragment key={value}>
              <line x1={w} y1="265" x2={w} y2="275" stroke="black" />
              <line
                x1={w}
                y1="270"
                x2={w}
                y2="35"
                stroke="gray"
                strokeDasharray="5,5"
              />
              {(value == 1000 || value == 5000) && (
                <text x={w} y="290" fontSize="14" textAnchor="middle">
                  {value}
                </text>
              )}
            </React.Fragment>
          )
        })}
        {markers.map((marker, index) => {
          const h = 270 - marker.y * 27
          const w = 50 + (marker.x / 1000) * 60
          const stroke = marker.stroke ?? 'black'
          return (
            <g key={index} transform={`translate(${w}, ${h})`}>
              <line
                x1="-5"
                y1="-5"
                x2="5"
                y2="5"
                stroke={stroke}
                strokeWidth={2}
              />
              <line
                x1="-5"
                y1="5"
                x2="5"
                y2="-5"
                stroke={stroke}
                strokeWidth={2}
              />
              <text x={6} y={-6} fontSize={18} textAnchor="left" fill={stroke}>
                {marker.name}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
