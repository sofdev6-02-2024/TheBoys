"use client";

import InputField from "@/app/components/InputField";
import { RoutineInfoFormProps } from "@/app/types";

function RoutineInfoForm(props: RoutineInfoFormProps) {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Create new routine</h1>
      <form className="flex flex-col gap-3">
        <InputField
          type="text"
          labelText="Title"
          onChange={(e) => props.setTitle(e.target.value)}
        />
        <InputField
          type="text"
          labelText="Difficult Level"
          onChange={(e) => props.setDescription(e.target.value)}
        />
      </form>
    </section>
  );
}

export default RoutineInfoForm;
