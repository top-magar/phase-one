"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBarProps {
  // Define any props needed here if the content or visibility logic were to be controlled externally
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = () => {
  const [isAnnouncementVisible, setAnnouncementVisible] = useState(true);

  if (!isAnnouncementVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-[100] w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-medium shadow-lg"
        style={{ 
          height: 'var(--announcement-bar-height, 32px)',
          '--announcement-bar-height': '32px'
        } as React.CSSProperties}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <div className="flex-1 text-center">
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">🔥</span>
              <span className="hidden sm:inline">Expires in 5 days! GET <span className="line-through">25%</span> 33% OFF Annual Pro Plan Trial-Stage Discount!</span>
              <span className="sm:hidden">33% OFF Annual Pro Plan!</span>
            </span>
          </div>
          
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBar; 