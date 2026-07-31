"use client";
import dynamic from "next/dynamic";
import { FaultyTerminalProps } from "./FaultyTerminal";

const FaultyTerminal = dynamic(() => import("./FaultyTerminal"), { ssr: false });

export default function FaultyTerminalWrapper(props: FaultyTerminalProps) {
  return <FaultyTerminal {...props} />;
}
