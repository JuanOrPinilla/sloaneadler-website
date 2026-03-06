"use client"

import { useEffect, useState } from "react"

const timeZones = [
  { city: "SAN FRANCISCO", zone: "America/Los_Angeles" },
  { city: "NEW YORK", zone: "America/New_York" },
  { city: "PARIS", zone: "Europe/Paris" },
  { city: "ABU DHABI", zone: "Asia/Dubai" },
  { city: "SINGAPORE", zone: "Asia/Singapore" },
] as const

function formatTime(date: Date, timeZone: string): string {
  return date.toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase()
}

export function PostureBar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#1a2332] text-[10px] tracking-widest text-slate-400 uppercase font-sans py-5 sm:py-2 px-4 text-center sm:whitespace-nowrap">
      {timeZones.map((tz, index) => (
        <span key={tz.zone}>
          {tz.city} {formatTime(currentTime, tz.zone)}
          {index < timeZones.length - 1 && " · "}
        </span>
      ))}
    </div>
  )
}
