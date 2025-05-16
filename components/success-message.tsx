"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Rocket, CheckCircle, ArrowRight, Mail, Copy, AlertTriangle } from "lucide-react"
import { useState } from "react"

interface SuccessMessageProps {
  onReset: () => void
  emailData: {
    success: boolean
    message: string
    formattedData?: string
    recipientEmail?: string
    error?: string
  } | null
}

export function SuccessMessage({ onReset, emailData }: SuccessMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyData = () => {
    if (emailData?.formattedData) {
      navigator.clipboard.writeText(emailData.formattedData)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="mars-card text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

      <CardContent className="pt-10 pb-6 px-4 md:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 animate-float">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-space-900">Application Submitted!</h2>

          <div className="max-w-md mx-auto space-y-4">
            <p className="text-space-700">
              Thank you for your application to the Mars Colonization Program. Your journey to the Red Planet begins
              now!
            </p>

            {emailData?.success ? (
              <div className="flex items-center justify-center gap-2 text-space-700 bg-green-50 p-3 rounded-md border border-green-100">
                <Mail className="h-4 w-4 text-green-600" />
                <span>Application submitted successfully!</span>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-yellow-800 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">There was an issue sending the email:</p>
                  <p className="text-sm mt-1">{emailData?.error || "Unknown error"}</p>
                  <p className="text-sm mt-2">Your application was still submitted successfully.</p>
                </div>
              </div>
            )}

            {emailData?.formattedData && (
              <div className="bg-space-50 p-4 rounded-lg border border-space-100 text-left relative">
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyData}
                    className="h-8 w-8 p-0 rounded-full"
                    title="Copy application data"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-space-500" />
                    )}
                  </Button>
                </div>
                <h3 className="font-medium text-space-800 mb-2">Application Summary:</h3>
                <pre className="text-xs text-space-700 whitespace-pre-wrap font-mono bg-white/50 p-3 rounded border border-space-100 max-h-60 overflow-y-auto">
                  {emailData.formattedData}
                </pre>
              </div>
            )}

            <div className="bg-space-50 p-4 rounded-lg border border-space-100 text-left">
              <h3 className="font-medium text-space-800 mb-2">Next Steps:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-space-700">
                    Our team will review your application within 7-10 business days
                  </span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-space-700">
                    You'll receive an email with further instructions for the medical examination
                  </span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-space-700">
                    Begin your pre-flight training program while waiting for approval
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pb-8">
        <Button onClick={onReset} className="bg-secondary hover:bg-secondary/90 text-white">
          Submit Another Application
        </Button>
      </CardFooter>
    </Card>
  )
}
