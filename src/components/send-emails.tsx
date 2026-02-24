'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

import { sendEmailNagarIQ } from '@/app/actions/send-mail';


const SendEmail = () => {
  const onclick = () => {
    sendEmailNagarIQ()
  }

  return (
    <Button onClick={onclick}>
      Send email
    </Button>
  )
}

export default SendEmail