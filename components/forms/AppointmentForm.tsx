"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAppointmentSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "./PatientForm";
import SubmitButton from "../SubmitButton";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.action";

const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      reason: "",
      note: "",
      schedule: new Date(),
      cancellationReason: ""
    },
  });

  const onSubmit = async(values: z.infer<typeof AppointmentFormValidation>)=> {
    console.log("it's ok");
    
    setIsLoading(true)
    let status;
    switch (type) {
     case 'schedule':
          status = "scheduled"
          break;
     case 'cancel':
          status = "canceled"
          break;
     default:
          status = "pending"
          
    }
    try {
     if(type === "create" && patientId){
      console.log("hi there");
      
          const appointmentData = {
               userId,
               patient: patientId,
               primaryPhysician: values.primaryPhysician,
               schedule: new Date(values.schedule),
               reason: values.reason!,
               note: values.note,
               status: status as Status
          }
          const appointment = await createAppointment(appointmentData);
          if(appointment){
               form.reset();
               router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
          }
     }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  let buttonLabel;
  switch (type) {
     case 'cancel':
          buttonLabel = "Cancel Appointment"
          break;
     case 'schedule':
          buttonLabel = "Schedule Appointment"
          break;
     default:
          buttonLabel = "Submit Appointment"
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
      {type === "create" && (
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds.
          </p>
        </section>
      )}

      {type !== "cancel" && (
        <>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="schedule"
            label="Expected appointment date"
            showTimeSelect
            dateFormat="MM/dd/yyyy  -  h:mm aa"
          />

          <div
            className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
          >
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              label="Appointment reason"
              placeholder="Annual montly check-up"
              disabled={type === "schedule"}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Comments/notes"
              placeholder="Prefer afternoon appointments, if possible"
              disabled={type === "schedule"}
            />
          </div>
        </>
      )}

      {type === "cancel" && (
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="cancellationReason"
          label="Reason for cancellation"
          placeholder="Urgent meeting came up"
        />
      )}

      <SubmitButton
        isLoading={isLoading}
        className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
      >
        {buttonLabel}
      </SubmitButton>
    </form>
  </Form>
  );
};

export default AppointmentForm;
