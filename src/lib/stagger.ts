import type { CSSProperties } from "react";

/** Sets the `--i` custom property used by the `.enter` entrance animation. */
export function stagger(i: number) {
  return { "--i": i } as CSSProperties;
}
