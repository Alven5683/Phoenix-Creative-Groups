"use client";
import { motion, MotionProps } from "framer-motion";
import React from "react";

export default function MotionDiv(props: React.PropsWithChildren<MotionProps & React.HTMLAttributes<HTMLDivElement>>) {
  return <motion.div {...props} />;
}
