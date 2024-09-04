import AppointmentForm from '@/components/forms/AppointmentForm'
import Image from 'next/image'
import React from 'react'

const NewAppointment = () => {
  return (
    <div className='flex h-screen min-h-screen'>
      <section className='remove-scrollbar container'>
          <div className='sub-container max-w-[860px]'>
          <Image
               src={"/assets/icons/logo-full.svg"}
               width={1000}
               height={1000}
               alt='logo'
               className='h-10 w-fit mb-12'
          />
          <AppointmentForm />
          </div>
      </section>
      <Image
          src={"/assets/images/appointment-img.png"}
          height={1000}
          width={1000}
          alt='appointment'
          className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default NewAppointment
