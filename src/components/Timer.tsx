import { useState, useEffect } from 'react'

interface TimerProps {
  mins: number
}

export function Timer({ mins }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(mins * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  // Effect for timer countdown
  useEffect(() => {
    let interval: null | NodeJS.Timeout = null
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1)
      }, 1000)
    } else if (secondsLeft === 0) {
      setHasFinished(true)
      setIsActive(false)
      clearInterval(interval!)
    }
    return () => clearInterval(interval!)
  }, [isActive, secondsLeft])

  // Reset function
  const resetTimer = () => {
    setSecondsLeft(mins * 60)
    setIsActive(false)
    setHasFinished(false)
  }

  // Formatting time display
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const seconds = secs % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded mt-4">
      <h2 className="text-2xl font-bold mb-4">
        Timer: {formatTime(secondsLeft)}
      </h2>
      <div className="flex space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="bg-blue-500 text-white px-2 py-0.5 rounded-md hover:bg-blue-600 transition"
        >
          {isActive ? <>Pause</> : <>Start</>}
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-2 py-0.5 rounded-md hover:bg-red-600 transition"
          disabled={secondsLeft === mins * 60}
        >
          Reset
        </button>
      </div>
      {hasFinished && (
        <p className="mt-4 text-red-600 font-bold">Zeit ist abgelaufen.</p>
      )}
    </div>
  )
}
