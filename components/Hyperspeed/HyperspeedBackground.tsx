"use client";
import React from "react";
import Hyperspeed from "./Hyperspeed";
import { defaultOptions } from "./Hyperspeed"; // pastikan export defaultOptions dari Hyperspeed

interface HyperspeedBackgroundProps {
  length?: number;
  roadWidth?: number;
  lanesPerRoad?: number;
  isHyper?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export default function HyperspeedBackground(props: HyperspeedBackgroundProps) {
  const effectOptions = { ...defaultOptions, ...props };
  return <Hyperspeed effectOptions={effectOptions} />;
}
