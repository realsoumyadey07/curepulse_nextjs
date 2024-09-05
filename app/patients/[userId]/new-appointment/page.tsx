import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image'
import React from 'react'

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
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
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.patientId}
          />
          <p className="copyright py-12">
            © 2024 CarePulse
          </p>
        </div>
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        height={1000}
        width={1000}
        alt='appointment'
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  )
}

export default NewAppointment
