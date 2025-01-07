'use client';

import React from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

import { toast } from "react-toastify";

import { sendEmail } from '@/app/actions/send-mail';

import { contactFormSchema, ContactFormSchema } from '@/lib/schema';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const ContactForm = () => {
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      message: '',
      name: '',
      subject: ''
    },
    mode: 'all'
  });

  async function onSubmit(values: ContactFormSchema) {
    await toast.promise(sendEmail(values), {
      pending: 'Sending Message...',
      success: {
        render() {
          setTimeout(() => {
            form.reset();
          }, 0);

          return 'Message sent successfully!'
        }
      },
      error: {
        render({ data }) {
          console.error("Error while sending message: ", data)

          return "Failed to send message. Please try again."
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject *</FormLabel>
              <FormControl>
                <Input placeholder="Project Discussion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me more about your project..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full bg-zinc-800 border-none outline-none md:px-4 px-2' variant="outline" type='submit'>
          Send message
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm