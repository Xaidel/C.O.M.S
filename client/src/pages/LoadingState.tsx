import { useEffect, useState } from "react"

export default function LoadingState() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-64 text-center">
      <p className="text-gray-600 font-medium mb-4">Loading...</p>
        <div className="mb-4">
          <div className="h-3 bg-gray-200 rounded-full">
            <div
              className="h-full bg-gray-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

