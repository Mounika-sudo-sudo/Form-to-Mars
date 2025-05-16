"use server"

import type { FormData } from "@/components/application-form"

export async function submitFormToEmail(formData: FormData, recipientEmail: string) {
  try {
    // Format the form data for email
    const formattedData = `
      Personal Information:
      --------------------
      Full Name: ${formData.fullName}
      Date of Birth: ${formData.dateOfBirth}
      Nationality: ${formData.nationality}
      Email: ${formData.email}
      Phone: ${formData.phone}

      Travel Preferences:
      -----------------
      Departure Date: ${formData.departureDate}
      Return Date: ${formData.returnDate}
      Accommodation: ${formData.accommodation}
      Special Requests: ${formData.specialRequests || "None"}

      Health and Safety:
      ----------------
      Health Declaration: ${formData.healthDeclaration === "yes" ? "Confirmed Good Health" : "Has Health Concerns"}
      Emergency Contact: ${formData.emergencyContactName}
      Emergency Phone: ${formData.emergencyContactPhone}
      Medical Conditions: ${formData.medicalConditions || "None reported"}
      
      Submission Date: ${new Date().toLocaleString()}
    `

    // In a real application, you might want to store this data in a database
    // or send it via a more robust email service

    return {
      success: true,
      message: "Form data ready for email submission",
      formattedData,
      recipientEmail,
    }
  } catch (error) {
    console.error("Error preparing form data:", error)
    return {
      success: false,
      message: "Failed to prepare form data for email",
    }
  }
}
