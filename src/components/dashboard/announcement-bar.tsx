"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AnnouncementBarProps {
  // Define any props needed here if the content or visibility logic were to be controlled externally
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = () => {
  const [isAnnouncementVisible, setAnnouncementVisible] = useState(true);

  if (!isAnnouncementVisible) {
    return null; // Don't render if not visible
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-blue-500 text-white text-xs font-regular py-1 flex items-center justify-center px-4">
      <div className="flex-1 text-center">Expires in 5 days! GET <span className="line-through">25%</span> 33% OFF Annual Pro Plan Trial-Stage Discount!</div>
      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 ml-4" onClick={() => setAnnouncementVisible(false)}>
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default AnnouncementBar; 