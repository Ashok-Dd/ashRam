"use client";
import { useState } from "react";

export type CursorVariant = "default" | "hover" | "text" | "hidden";

export function useCursorVariant() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  return { variant, setVariant };
}
