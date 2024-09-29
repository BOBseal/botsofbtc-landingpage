"use client"

import { useState, useEffect } from 'react'
//import { Card, CardContent } from "@/components/ui/card"

type CountdownTimerProps = {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps = { targetDate: '2024-12-31' }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function parseTargetDate(dateString: string): Date {
    const [year, month, day, hour, minute] = dateString.split('-').map(Number)
    return new Date(Date.UTC(year, month - 1, day, hour, minute))
  }
  function calculateTimeLeft() {
    const difference = +parseTargetDate(targetDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = Object.keys(timeLeft).map(interval => {
    return (
      <div className="p-[1rem] w-[8rem] md:w-[12rem] lg:w-[15rem] flex items-center justify-center text-[24px] md:text-[30px] border border-[#E5BD19] text-[#E5BD19] font-nunito uppercase font-bold" key={interval}>
        <div>{timeLeft[interval]} {interval}{" "}</div>
      </div>
    )
  })

  return (
      <div className="p-1">
        <h2 className="text-[38px] font-semibold text-center mb-4">MINT STARTS IN</h2>
        <div className="flex flex-wrap justify-center items-center">
          {timerComponents.length ? timerComponents : <span className="text-2xl">Time's up!</span>}
        </div>
      </div>

  )
}