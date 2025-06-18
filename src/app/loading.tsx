import Image from 'next/image'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center">
        {/* Logo with animation */}
        <div className="relative w-32 h-32 mx-auto animate-fade-in">
          <Image
            src="/logo.png"
            alt="WageCloud Logo"
            fill
            className="object-contain animate-pulse-subtle"
            priority
          />
        </div>

        <div className="w-32 mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 animate-pulse">
            <span className="inline-block animate-bounce ml-1">.</span>
            <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.1s' }}>
              .
            </span>
            <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.2s' }}>
              .
            </span>
          </h2>
        </div>
      </div>
    </div>
  )
}
