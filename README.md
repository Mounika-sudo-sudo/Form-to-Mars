# 🌌 Mars Colonization Program - Multi-Stage Application Form

A responsive multi-stage application form built with **Next.js** and **Tailwind CSS** for the fictional Mars Colonization Program. This project features a space and Mars theme, comprehensive form validation, and email integration using EmailJS.

---

## 📋 Features

- ✅ **Multi-stage form** with three distinct sections:
  - Personal Information
  - Travel Preferences
  - Health and Safety
- 📱 **Responsive design** for mobile, tablet, and desktop
- ✨ **Space and Mars theme** with animated stars background
- ⚠️ **Real-time validation** with detailed error messages
- 📩 **Email integration** using EmailJS to send form submissions
- 🎬 **Animated UI** with progress indicators and transitions
- ♿ **Accessibility features** for improved usability

---

## 🚀 Live Demo

https://my-app-final-delta.vercel.app/

---

## 📦 Prerequisites

- Node.js 18.x or later
- npm or yarn
- An [EmailJS](https://www.emailjs.com) account (free tier works fine)

---

## ⚙️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/mars-colonization-form.git
   cd mars-colonization-form
Paste your rich text content h

*   **Install dependencies**:
    
    `npm install # or yarn install`
    
*   **(Optional)** Create a `.env.local` file in the root directory:
    
      
    
    `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
    

## 📧 EmailJS Configuration

This project uses EmailJS to send form submissions via email.

### 1\. Create an EmailJS Account

  *   Sign up at [https://www.emailjs.com](https://www.emailjs.com)
      
  *   Verify your account via email
     

### 2\. Create an Email Service

  *   Go to **Dashboard → Email Services**
     
  *   Click **“Add New Service”**
     
  *   Choose your email provider (e.g., Gmail)
      
  *   Follow authentication steps
      

### 3\. Create an Email Template

  *   Go to **Dashboard → Email Templates**
     
  *   Click **“Create New Template”**
     
  *   Add template variables like:

     {{to\_name}} 

     {{to\_email}} 

     {{from\_name}} 

     {{applicant\_name}}

     {{applicant\_email}}

     {{message}}  

## 🖥️ Development

Run the development server:

`npm run dev # or yarn dev`

Visit [http://localhost:3000](http://localhost:3000) to view the form locally.

* * *

## 🌐 Deployment

### ✅ Deploying to Vercel (Recommended)

   1.  Sign up at [https://vercel.com](https://vercel.com)
   2.  Install Vercel CLI:    
   
       `npm install -g vercel`
     
   3.  Deploy:     
          
       `vercel`
