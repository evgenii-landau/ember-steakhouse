"use client";

import * as React from "react";
import { Calendar as DayPicker } from "@subframe/core";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  className?: string;
};

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar({ className = "", ...props }, ref) {
    return (
      <DayPicker
        ref={ref}
        {...props}
        className={`relative ${className}`}
        classNames={{
          root: "relative box-border",
          months: "relative flex max-w-fit flex-wrap gap-4",
          month: "flex flex-col gap-4",
          nav: "absolute flex h-8 w-full items-center justify-between p-0.5",
          month_caption: "flex h-8 items-center justify-center",
          caption_label:
            "font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-ember-warm",
          button_previous:
            "inline-flex h-8 w-8 items-center justify-center border border-transparent bg-transparent hover:bg-ember-warm/10 active:bg-ember-warm/15 transition-colors",
          button_next:
            "inline-flex h-8 w-8 items-center justify-center border border-transparent bg-transparent hover:bg-ember-warm/10 active:bg-ember-warm/15 transition-colors",
          chevron: "text-[16px] font-medium leading-[16px] text-ember-gold",

          weeks: "flex flex-col gap-1",
          weekdays: "flex pb-3",
          weekday:
            "w-8 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-ember-muted",

          week: "flex",

          day: "group flex h-8 w-8 cursor-pointer items-center justify-center font-sans text-[13px] text-ember-warm",

          day_button: [
            "flex h-8 w-8 items-center justify-center border-none transition-colors duration-150 outline-none",
            "hover:bg-ember-warm/10",
            // selected day
            "group-[.selected]:bg-ember-gold group-[.selected]:text-white group-[.selected]:font-semibold",
            // outside-month days
            "group-[.outside]:text-ember-muted/50 group-[.outside]:hover:bg-ember-warm/5",
            // today (not selected)
            "group-[.today]:font-semibold group-[.today]:text-ember-gold",
            // today + selected
            "group-[.selected.today]:text-white",
          ].join(" "),

          selected: "selected",
          outside: "outside",
          today: "today",
          range_start: "range-start bg-ember-gold/15",
          range_middle: "range-middle",
          range_end: "range-end bg-ember-gold/15",
          disabled: "opacity-30 cursor-not-allowed pointer-events-none",
        }}
      />
    );
  }
);

export default Calendar;
