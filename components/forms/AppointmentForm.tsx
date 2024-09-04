"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { UserFormValidation } from '@/lib/validation';
import { Form } from "@/components/ui/form"
import CustomFormField from '../CustomFormField';
import { FormFieldType } from './PatientForm';
import SubmitButton from '../SubmitButton';

const AppointmentForm = () => {
     const router = useRouter();
     const [isLoading, setIsLoading] = useState(false);
     const form = useForm<z.infer<typeof UserFormValidation>>({
          resolver: zodResolver(UserFormValidation),
          defaultValues: {
               name: "",
               email: "",
               phone: ""
          },
     })

     async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
          setIsLoading(true);
          try {

          } catch (error) {
               console.log(error);
          }
          setIsLoading(false);
     }
     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex-1'>
                    <section className="mb-12 space-y-4">
                         <h1 className="header">Hi there 👋</h1>
                         <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
                    </section>
                    <div className='flex flex-col xl:flex-row gap-6'>
                         <CustomFormField
                              fieldType={FormFieldType.TEXTAREA}
                              control={form.control}
                              name="reasonOfAppointment"
                              label="Reason for appointment"
                              placeholder="ex: Annual monthly check-up"
                         />
                         <CustomFormField
                              fieldType={FormFieldType.TEXTAREA}
                              control={form.control}
                              name="additional"
                              label="Additional/comments/notes"
                              placeholder="ex: Prefer afternoon appointment. if possible"
                         />
                    </div>
                    <CustomFormField
                         fieldType={FormFieldType.DATE_PICKER}
                         control={form.control}
                         name='appointmentDate'
                         label="Appointment date"
                         placeholder='Select your appointment date'
                    />
                    <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
               </form>
          </Form>
     )
}

export default AppointmentForm
