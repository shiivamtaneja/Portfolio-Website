'use server'

import { Resend } from 'resend'

import { ContactFormSchema } from '@/lib/schema'

import ContactFormEmail from '@/components/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: ContactFormSchema) {
  try {
    const { name, email, subject, message } = formData

    await resend.emails.send({
      from: 'Shivam Taneja <website@shivamtaneja.com>',
      to: email,
      subject: `Thank you for your message, ${name}!`,
      react: ContactFormEmail({
        name,
        email,
        subject,
        message,
        type: 'confirmation'
      })
    })

    // Send notification email to me
    await resend.emails.send({
      from: 'Portfolio Website <website@shivamtaneja.com>',
      to: 'business.shivamtaneja@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      react: ContactFormEmail({
        name,
        email,
        subject,
        message,
        type: 'notification'
      })
    })

    return { success: true }
  } catch (error) {
    throw error
  }
}