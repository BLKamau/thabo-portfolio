// Simplified Botswana flag: light-blue field, black-white-black band.
export default function BotswanaFlag({ size = 16, style }) {
  const height = size;
  const width = Math.round(size * 1.5);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 20"
      role="img"
      aria-label="Flag of Botswana"
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    >
      <rect width="30" height="20" fill="#75AADB" />
      <rect y="7.5" width="30" height="5" fill="#FFFFFF" />
      <rect y="8.5" width="30" height="3" fill="#000000" />
    </svg>
  );
}
