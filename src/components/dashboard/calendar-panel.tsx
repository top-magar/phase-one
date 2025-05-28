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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

interface CalendarPanelProps {
  events: EventInput[]; // you can add extendedProps: { account, status, project } if you want to filter by those
}

export default function CalendarPanel({ events }: CalendarPanelProps) {
  const calendarRef = useRef<FullCalendar>(null);

  // --- State for current view & date ---
  const [currentView, setCurrentView] = useState<
    "dayGridMonth" | "timeGridWeek"
  >(
    () =>
      window.matchMedia("(max-width: 640px)").matches
        ? "timeGridWeek"
        : "dayGridMonth"
  );
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // --- When currentView changes (e.g. user picks Month/Week or screen resizes), tell FC to switch ---
  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) api.changeView(currentView);
  }, [currentView]);

  // --- Listen for screen size changes and switch view automatically ---
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = (e: MediaQueryListEvent) =>
      setCurrentView(e.matches ? "timeGridWeek" : "dayGridMonth");

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // --- Keep our month label in sync ---
  const handleDatesSet = useCallback((arg: DatesSetArg) => {
    setCurrentDate(arg.start);
  }, []);

  // --- (Optional) Example: filter events by account/status/project selects ---
  const [acctFilter, setAcctFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projFilter, setProjFilter] = useState("all");
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const ap = (e.extendedProps as any).account;
      const st = (e.extendedProps as any).status;
      const pr = (e.extendedProps as any).project;
      return (
        (acctFilter === "all" || ap === acctFilter) &&
        (statusFilter === "all" || st === statusFilter) &&
        (projFilter === "all" || pr === projFilter)
      );
    });
  }, [events, acctFilter, statusFilter, projFilter]);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <div className="flex items-center space-x-2">
          {/* Account Filter */}
          <Select value={acctFilter} onValueChange={setAcctFilter}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="ig">Instagram</SelectItem>
              <SelectItem value="fb">Facebook</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>

          {/* Project Filter */}
          <Select value={projFilter} onValueChange={setProjFilter}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="spring">Spring Launch</SelectItem>
              {/* etc… */}
            </SelectContent>
          </Select>

          {/* View toggles */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentView("dayGridMonth")}
            aria-label="Month view"
          >
            <CalendarIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentView("listMonth")}
            aria-label="List view"
          >
            <ListIcon />
          </Button>

          {/* New Post */}
          <Button size="sm" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => calendarRef.current?.getApi().prev()}
          >
            <ChevronLeft className="h-4 w-4" />
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
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* View Select */}
        <Select
          value={currentView}
          onValueChange={(v) => setCurrentView(v as any)}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dayGridMonth">Month</SelectItem>
            <SelectItem value="timeGridWeek">Week</SelectItem>
            <SelectItem value="timeGridDay">Day</SelectItem>
            <SelectItem value="listMonth">List</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* FullCalendar */}
      <div className="h-[70vh]">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          // initial view is set by our responsive logic above
          initialView={currentView}
          headerToolbar={false}
          events={filteredEvents}
          datesSet={handleDatesSet}
          height="100%"
          dayMaxEvents={3}
          eventClassNames={() =>
            "rounded-md bg-blue-500/80 text-white text-sm"
          }
        />
      </div>
    </div>
  );
}
