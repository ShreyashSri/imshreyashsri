import { Construction, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface UnderConstructionProps {
  title?: string
  description?: string
  expectedCompletion?: string
  progress?: number
  backLink?: string
  backLinkText?: string
  showProgress?: boolean
}

export default function UnderConstruction({
  title = "Under Construction",
  description = "We're working hard to bring you something amazing. This page is currently being built and will be available soon.",
  expectedCompletion = "Coming Soon",
  progress = 25,
  backLink = "/",
  backLinkText = "Back to Home",
  showProgress = true,
}: UnderConstructionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Construction Icon with Animation */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Construction className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" />
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black dark:text-white">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>

        {/* Status Info */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Expected completion: {expectedCompletion}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button
            asChild
            variant="outline"
            className="gap-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Link href={backLink}>
              <ArrowLeft className="w-4 h-4" />
              {backLinkText}
            </Link>
          </Button>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
