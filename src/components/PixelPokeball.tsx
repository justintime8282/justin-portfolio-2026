"use client";

/**
 * A pixelated, Minecraft-style Pokéball rendered as an SVG pixel grid.
 * Each "pixel" is a 10x10 rect on a 120x120 canvas (12x12 grid).
 */
export default function PixelPokeball({ className = "" }: { className?: string }) {
  // 12x12 grid: R = red, W = white, B = black (outline/band), C = center button, T = transparent
  const grid = [
    "TTBBBBBBBTT T",
    "TBRRRRRRRBT ",
    "BRRRRRRRRRRB",
    "BRRRRRRRRRRB",
    "BRRRRRRRRRRB",
    "BBBBBBCBBBB B",
    "BBBBBCBCBBBB",
    "BWWWWWWWWWWB",
    "BWWWWWWWWWWB",
    "BWWWWWWWWWWB",
    "TBWWWWWWWBT ",
    "TTBBBBBBBTT ",
  ];

  // Cleaner 12x12 grid
  const pixels = [
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,1,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,3,3,1,1,1,1,1],
    [1,1,1,1,3,4,4,3,1,1,1,1],
    [1,5,5,5,5,3,3,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,5,5,1],
    [0,1,5,5,5,5,5,5,5,5,1,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
  ];

  const colors: Record<number, string> = {
    0: "transparent",
    1: "#1a1a1a",   // black outline
    2: "#dc2626",   // pokeball red
    3: "#333333",   // dark band / button ring
    4: "#f5f5f5",   // center button
    5: "#f5f5f5",   // white bottom
  };

  const S = 10; // pixel size

  return (
    <svg
      width={120}
      height={120}
      viewBox="0 0 120 120"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {pixels.map((row, y) =>
        row.map((color, x) =>
          color !== 0 ? (
            <rect
              key={`${x}-${y}`}
              x={x * S}
              y={y * S}
              width={S}
              height={S}
              fill={colors[color]}
            />
          ) : null
        )
      )}
    </svg>
  );
}
