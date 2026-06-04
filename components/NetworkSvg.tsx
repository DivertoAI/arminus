export function NetworkSvg() {
  return (
    <svg className="network-svg" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E6FB8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E6FB8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#ng)" />
      <line className="link" x1="40" y1="60" x2="100" y2="100" />
      <line className="link" x1="160" y1="50" x2="100" y2="100" />
      <line className="link" x1="50" y1="150" x2="100" y2="100" />
      <line className="link" x1="160" y1="160" x2="100" y2="100" />
      <line className="link" x1="40" y1="60" x2="160" y2="50" />
      <line className="link" x1="50" y1="150" x2="160" y2="160" />
      <circle className="pulse" cx="100" cy="100" r="5" />
      <circle className="pulse b" cx="100" cy="100" r="5" />
      <circle className="pulse c" cx="100" cy="100" r="5" />
      <circle className="node" cx="40" cy="60" r="6" />
      <circle className="node" cx="160" cy="50" r="5" />
      <circle className="node" cx="50" cy="150" r="5" />
      <circle className="node" cx="160" cy="160" r="6" />
      <circle className="node-c" cx="100" cy="100" r="9" />
    </svg>
  );
}
