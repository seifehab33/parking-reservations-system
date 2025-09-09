"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCreateRushHour, useCreateVacation } from "@/hooks/admin/useVRHour";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function VRHours() {
  const { mutate: createRushHour, isPending: isCreatingRushHour } =
    useCreateRushHour();
  const { mutate: createVacation, isPending: isCreatingVacation } =
    useCreateVacation();

  const [weekDay, setWeekDay] = useState("monday");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("08:00");
  const [to, setTo] = useState("10:00");
  const [liveTime, setLiveTime] = useState("");

  // live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRushSubmit = () => {
    createRushHour({ weekDay, from, to });
  };

  const handleVacationSubmit = () => {
    createVacation({ name, from, to });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm space-y-6"
    >
      {/* Live Clock */}
      <Card className="p-4 text-center text-lg font-semibold text-primary">
        Current Time: {liveTime}
      </Card>

      {/* Rush Hours Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Rush Hours</h2>
        <Label htmlFor="weekDay">Select Weekday</Label>
        <Select value={weekDay} onValueChange={(value) => setWeekDay(value)}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select a day" />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((day) => (
              <SelectItem key={day} value={day}>
                {day[0].toUpperCase() + day.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Choose the weekday for rush hours.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <Label htmlFor="rushFrom">From</Label>
            <Input
              id="rushFrom"
              type="time"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rushTo">To</Label>
            <Input
              id="rushTo"
              type="time"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="button"
          className="w-full mt-3"
          disabled={isCreatingRushHour}
          onClick={handleRushSubmit}
        >
          {isCreatingRushHour ? "Saving..." : "Add Rush Hour"}
        </Button>
      </div>

      <Separator />

      {/* Vacations Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Vacations</h2>
        <Label htmlFor="vacName">Vacation Name</Label>
        <Input
          id="vacName"
          type="text"
          placeholder="e.g. Christmas, Eid"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Add a name for the vacation (optional).
        </p>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <Label htmlFor="vacFrom">From</Label>
            <Input
              id="vacFrom"
              type="time"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="vacTo">To</Label>
            <Input
              id="vacTo"
              type="time"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="button"
          className="w-full mt-3"
          variant="secondary"
          disabled={isCreatingVacation}
          onClick={handleVacationSubmit}
        >
          {isCreatingVacation ? "Saving..." : "Add Vacation"}
        </Button>
      </div>
    </form>
  );
}
