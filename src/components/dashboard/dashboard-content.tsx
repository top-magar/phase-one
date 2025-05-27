"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { tokens } from "@/lib/theme";
import { cn } from "@/lib/utils";
import React from 'react';

export default function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto">
      <motion.div
        key={usePathname()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, timing: tokens.animations.timing.default }}
        className="space-y-8"
      >
        {children}
      </motion.div>
    </main>
  );
} 