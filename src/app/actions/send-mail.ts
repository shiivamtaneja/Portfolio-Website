'use server'

import { Resend } from 'resend'

import { FormDataWithRecaptcha } from '@/lib/schema'

import { verifyRecaptchaToken } from '@/lib/utils'

import ContactFormEmail from '@/components/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormDataWithRecaptcha) {
  try {
    const { name, email, subject, message, recaptchaToken } = formData

    const recaptchaResponse = await verifyRecaptchaToken(recaptchaToken);

    if (!recaptchaResponse.success) {
      throw new Error('reCAPTCHA verification failed');
    }

    // If the score is too low, reject the submission
    if (recaptchaResponse.score < 0.5) {
      throw new Error('Spam detection triggered. Please try again later.');
    }

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