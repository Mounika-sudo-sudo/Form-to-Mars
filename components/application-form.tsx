"use client"

import { useState, useEffect } from "react"
import { PersonalInfoForm } from "./personal-info-form"
import { TravelPreferencesForm } from "./travel-preferences-form"
import { HealthSafetyForm } from "./health-safety-form"
import { SuccessMessage } from "./success-message"
import { StageIndicator } from "./stage-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Send } from "lucide-react"
import emailjs from "@emailjs/browser"

// Define the form data structure
export type FormData = {
  // Personal Information
  fullName: string
  dateOfBirth: string
  nationality: string
  email: string
  phone: string

  // Travel Preferences
  departureDate: string
  returnDate: string
  accommodation: string
  specialRequests: string

  // Health and Safety
  healthDeclaration: string
  emergencyContactName: string
  emergencyContactPhone: string
  medicalConditions: string
}

// Initial form state
const initialFormData: FormData = {
  fullName: "",
  dateOfBirth: "",
  nationality: "",
  email: "",
  phone: "",

  departureDate: "",
  returnDate: "",
  accommodation: "",
  specialRequests: "",

  healthDeclaration: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  medicalConditions: "",
}

// EmailJS configuration - UPDATED with new credentials
const EMAILJS_CONFIG = {
  serviceId: "service_vqmm1n9", // Your EmailJS service ID
  templateId: "mars_app", // Your EmailJS template ID
  publicKey: "VLu-4f6ZhYVHtqjYN", // Your EmailJS public key
  // The fixed recipient email - all form submissions will go here
  recipientEmail: "mounikaprabhamahadasu@gmail.com",
}

export default function ApplicationForm() {
  const [currentStage, setCurrentStage] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean
    message: string
    formattedData?: string
    recipientEmail?: string
    error?: string
  } | null>(null)

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.publicKey)
    console.log("EmailJS initialized with public key:", EMAILJS_CONFIG.publicKey)
  }, [])

  // Update form data
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Validate stage 1
  const validateStage1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const dobDate = new Date(formData.dateOfBirth)
      if (isNaN(dobDate.getTime())) {
        newErrors.dateOfBirth = "Please enter a valid date"
      }
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = "Nationality is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else {
      // Fixed phone validation regex
      const phoneRegex = /^\+?[0-9]{1,4}[ -]?($$[0-9]{1,4}$$)?[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}[ -]?[0-9]{1,9}$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid international phone number (e.g., +1 (123) 456-7890)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate stage 2
  const validateStage2 = () => {
    const newErrors: Record<string, string> = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required"
    } else {
      const departureDate = new Date(formData.departureDate)
      if (isNaN(departureDate.getTime())) {
        newErrors.departureDate = "Please enter a valid date"
      } else if (departureDate < today) {
        newErrors.departureDate = "Departure date must be in the future"
      }
    }

    if (!formData.returnDate) {
      newErrors.returnDate = "Return date is required"
    } else {
      const returnDate = new Date(formData.returnDate)
      const departureDate = new Date(formData.departureDate)

      if (isNaN(returnDate.getTime())) {
        newErrors.returnDate = "Please enter a valid date"
      } else if (formData.departureDate && !isNaN(departureDate.getTime()) && returnDate <= departureDate) {
        newErrors.returnDate = "Return date must be after departure date"
      }
    }

    if (!formData.accommodation) {
      newErrors.accommodation = "Please select an accommodation preference"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate stage 3
  const validateStage3 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.healthDeclaration) {
      newErrors.healthDeclaration = "Health declaration is required"
    }

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required"
    }

    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = "Emergency contact phone is required"
    } else {
      // Fixed phone validation regex
      const phoneRegex = /^\+?[0-9]{1,4}[ -]?($$[0-9]{1,4}$$)?[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}[ -]?[0-9]{1,9}$/
      if (!phoneRegex.test(formData.emergencyContactPhone)) {
        newErrors.emergencyContactPhone = "Please enter a valid international phone number (e.g., +1 (123) 456-7890)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next button click
  const handleNext = () => {
    let isValid = false

    switch (currentStage) {
      case 1:
        isValid = validateStage1()
        break
      case 2:
        isValid = validateStage2()
        break
      default:
        isValid = true
    }

    if (isValid) {
      setCurrentStage((prev) => prev + 1)
    }
  }

  // Handle previous button click
  const handlePrevious = () => {
    setCurrentStage((prev) => prev - 1)
  }

  // Format the form data for email with HTML
  const getFormattedHtml = () => {
    return `
      <h2 style="color: #4a5ad3;">Mars Colonization Program - Application Details</h2>
      <p>New application received from: ${formData.fullName} (${formData.email})</p>
      
      <div style="background-color: #f0f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #4a5ad3; border-bottom: 1px solid #cbd8f7; padding-bottom: 10px;">Personal Information</h3>
        <p><strong>Full Name:</strong> ${formData.fullName}</p>
        <p><strong>Date of Birth:</strong> ${formData.dateOfBirth}</p>
        <p><strong>Nationality:</strong> ${formData.nationality}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        
        <h3 style="color: #4a5ad3; border-bottom: 1px solid #cbd8f7; padding-bottom: 10px; margin-top: 20px;">Travel Preferences</h3>
        <p><strong>Departure Date:</strong> ${formData.departureDate}</p>
        <p><strong>Return Date:</strong> ${formData.returnDate}</p>
        <p><strong>Accommodation:</strong> ${formData.accommodation}</p>
        <p><strong>Special Requests:</strong> ${formData.specialRequests || "None"}</p>
        
        <h3 style="color: #4a5ad3; border-bottom: 1px solid #cbd8f7; padding-bottom: 10px; margin-top: 20px;">Health and Safety</h3>
        <p><strong>Health Declaration:</strong> ${
          formData.healthDeclaration === "yes" ? "Confirmed Good Health" : "Has Health Concerns"
        }</p>
        <p><strong>Emergency Contact:</strong> ${formData.emergencyContactName}</p>
        <p><strong>Emergency Phone:</strong> ${formData.emergencyContactPhone}</p>
        <p><strong>Medical Conditions:</strong> ${formData.medicalConditions || "None reported"}</p>
      </div>
      
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
    `
  }

  // Send email directly using EmailJS API
  const sendDirectEmail = async () => {
    try {
      const formattedHtml = getFormattedHtml()

      // Log the recipient email for debugging
      console.log("Sending email to fixed recipient:", EMAILJS_CONFIG.recipientEmail)

      // Create a direct API call to EmailJS
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: EMAILJS_CONFIG.templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          template_params: {
            to_name: "Mars Administrator", // Name of the recipient
            to_email: EMAILJS_CONFIG.recipientEmail, // Fixed recipient email
            from_name: "Mars Colonization Program",
            applicant_name: formData.fullName,
            applicant_email: formData.email, // We still include the applicant's email in the message
            message: formattedHtml,
          },
        }),
      })

      if (response.ok) {
        console.log("Email sent successfully via direct API call")
        return { success: true }
      } else {
        const errorData = await response.text()
        console.error("Email API error:", errorData)
        return { success: false, error: errorData }
      }
    } catch (error) {
      console.error("Direct email sending failed:", error)
      return { success: false, error }
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = validateStage3()

    if (isValid) {
      setIsSubmitting(true)

      try {
        // Log the form data for debugging
        console.log("Form data being submitted:", formData)

        // Send email directly using the EmailJS API
        const emailResult = await sendDirectEmail()

        if (emailResult.success) {
          // Set submission result with success
          setSubmissionResult({
            success: true,
            message: "Application submitted successfully!",
            recipientEmail: EMAILJS_CONFIG.recipientEmail,
            formattedData: JSON.stringify(formData, null, 2),
          })
        } else {
          // Set submission result with error
          setSubmissionResult({
            success: false,
            message: "Application submitted but email delivery failed.",
            error: "Failed to send email. Please try again later.",
            recipientEmail: EMAILJS_CONFIG.recipientEmail,
            formattedData: JSON.stringify(formData, null, 2),
          })
        }

        // Set submission as complete
        setIsSubmitting(false)
        setIsSubmitted(true)
      } catch (error: any) {
        console.error("Error submitting form:", error)
        setIsSubmitting(false)
        setSubmissionResult({
          success: false,
          message: "Failed to submit application",
          error: error.message || "Unknown error occurred",
        })
      }
    }
  }

  // Reset form
  const handleReset = () => {
    setFormData(initialFormData)
    setCurrentStage(1)
    setIsSubmitted(false)
    setErrors({})
    setSubmissionResult(null)
  }

  if (isSubmitted) {
    return <SuccessMessage onReset={handleReset} emailData={submissionResult} />
  }

  return (
    <div className="space-y-6">
      <StageIndicator currentStage={currentStage} />

      <Card className="mars-card overflow-hidden border-0">
        <CardContent className="p-6 md:p-8">
          {currentStage === 1 && <PersonalInfoForm formData={formData} onChange={handleChange} errors={errors} />}

          {currentStage === 2 && <TravelPreferencesForm formData={formData} onChange={handleChange} errors={errors} />}

          {currentStage === 3 && <HealthSafetyForm formData={formData} onChange={handleChange} errors={errors} />}

          <div className="flex justify-between mt-8">
            {currentStage > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="bg-white/80 hover:bg-white border-space-200 text-space-800 hover:text-space-900 transition-all"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            ) : (
              <div></div> // Empty div to maintain layout
            )}

            <div>
              {currentStage < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-secondary hover:bg-secondary/90 text-white transition-all"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-white transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
