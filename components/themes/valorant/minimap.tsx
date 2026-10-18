const layouts = [
  { walls: "M6 10h40v18h20V10h48v56H74V48H50v18H6z", lanes: "M26 28v24M90 28v24M50 38h24", a: [26, 20], b: [94, 20], spike: [94, 40] },
  { walls: "M6 6h108v20H84v20h30v24H6V46h30V26H6z", lanes: "M20 16h80M60 26v20M20 58h80", a: [20, 58], b: [100, 16], spike: [60, 36] },
  { walls: "M10 6h34l16 14 16-14h34v64H76L60 56 44 70H10z", lanes: "M26 20v40M94 20v40M44 38h32", a: [26, 14], b: [94, 62], spike: [26, 40] },
]

export function Minimap({ index, live }: { index: number; live?: boolean }) {
  const l = layouts[index % layouts.length]
  return (
    <svg viewBox="0 0 120 76" className="h-full w-full" aria-hidden="true">
      <rect width="120" height="76" fill="#0b141c" />
      <path d={l.walls} fill="rgba(47,211,178,0.08)" stroke="rgba(236,232,225,0.35)" strokeWidth="1" />
      <path d={l.lanes} stroke="rgba(236,232,225,0.18)" strokeWidth="1" strokeDasharray="2 3" fill="none" />
      {[["A", l.a], ["B", l.b]].map(([label, [x, y]]) => (
        <text key={label as string} x={x as number} y={(y as number) + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(236,232,225,0.55)" fontFamily="var(--face-anton)">
          {label as string}
        </text>
      ))}
      <circle cx={l.spike[0]} cy={l.spike[1]} r="3" fill={live ? "#f0c35a" : "#ff4655"}>
        {live && <animate attributeName="r" values="3;6;3" dur="1.4s" repeatCount="indefinite" />}
      </circle>
    </svg>
  )
}
