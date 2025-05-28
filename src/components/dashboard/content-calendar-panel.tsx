"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import FullCalendar from "@fullcalendar/react";
import type { EventInput } from "@fullcalendar/core";
import type { DatesSetArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  MoreHorizontal,
  Calendar as CalendarIcon,
  Share2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Instagram,
  Facebook,
} from "lucide-react";

interface UnplannedItem {
  id: string;
  title: string;
  platform: "instagram" | "facebook";
}

interface ContentCalendarPanelProps {
  events?: EventInput[];
  unplannedItems?: UnplannedItem[];
}

export default function ContentCalendarPanel({
  events = [],
  unplannedItems = [],
}: ContentCalendarPanelProps) {
  const calendarRef = useRef<FullCalendar>(null);

  // Responsive view: month on desktop, week on mobile
  const [currentView, setCurrentView] = useState<"dayGridMonth" | "timeGridWeek">(
    () => (window.matchMedia("(max-width:640px)").matches ? "timeGridWeek" : "dayGridMonth")
  );
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Sync view to FullCalendar API whenever currentView changes
  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) api.changeView(currentView);
  }, [currentView]);

  // Listen for screen-size changes
  useEffect(() => {
    const mq = window.matchMedia("(max-width:640px)");
    const handler = (e: MediaQueryListEvent) =>
      setCurrentView(e.matches ? "timeGridWeek" : "dayGridMonth");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Keep month label in sync
  const handleDatesSet = useCallback((arg: DatesSetArg) => {
    setCurrentDate(arg.start);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* — Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Content Calendar</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" aria-label="More options">
            <MoreHorizontal />
          </Button>

          <Select>
            <SelectTrigger size="sm" className="flex items-center space-x-1">
              <CalendarIcon />
              <SelectValue placeholder="Calendar" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="calendar">Calendar</SelectItem>
              <SelectItem value="list">List</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* — Month Nav & Unplanned Pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => calendarRef.current?.getApi().prev()}
            aria-label="Previous month"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => calendarRef.current?.getApi().today()}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => calendarRef.current?.getApi().next()}
            aria-label="Next month"
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Select
            value={currentView}
            onValueChange={(v) => setCurrentView(v as any)}
          >
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="dayGridMonth">Month</SelectItem>
              <SelectItem value="timeGridWeek">Week</SelectItem>
              <SelectItem value="timeGridDay">Day</SelectItem>
              <SelectItem value="listMonth">List</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            {unplannedItems.length} Unplanned
          </Button>
        </div>
      </div>

      {/* — Main Content: Calendar + Sidebar */}
      <div className="flex space-x-6">
        {/* Calendar */}
        <div className="flex-1 h-[70vh]">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={currentView}
            headerToolbar={false}
            events={events}
            datesSet={handleDatesSet}
            height="100%"
            dayMaxEvents={3}
            eventClassNames={() => "rounded-md bg-blue-500/80 text-white text-sm"}
          />
        </div>

        {/* Sidebar: Unplanned Items */}
        <aside className="w-80 space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium">Unplanned</h2>
            <Badge variant="secondary">{unplannedItems.length}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            These are files that have not been planned yet. Drag and drop them into the calendar.
          </p>

          <div className="space-y-2">
            {unplannedItems.map((item) => (
              <Card key={item.id} className="p-2 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                {item.platform === "instagram" ? (
                  <Instagram className="h-5 w-5 text-pink-500" />
                ) : (
                  <Facebook className="h-5 w-5 text-blue-600" />
                )}
                <span className="text-sm">{item.title}</span>
              </Card>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
