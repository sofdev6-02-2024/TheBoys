import React from 'react';
import { useForm, useFieldArray} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coachRequestSchema, CoachRequest } from './coach-request';
import FormInput from '../../routines/create/components/FormInput';
import Button from '@/app/components/Button';
import FormDropDown from "../../routines/create/components/FormDropDown";

interface Props {
  onSubmit: (data: CoachRequest) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

export const CoachRequestForm: React.FC<Props> = ({ onSubmit, onClose, isLoading }) => {
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<CoachRequest>({
    resolver: zodResolver(coachRequestSchema),
    mode: 'onChange',
    defaultValues: {
      experience: '',
      specialization: '',
      certifications: [{ name: '', issuedBy: '', issueDate: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        name="experience"
        control={control}
        label="Experience"
        type="text"
        error={errors.experience}
      />
      
      <FormDropDown
        name="specialization"
        control={control}
        label="Specialization"
        defaultMessage="Select an Option"
        options={["Weightlifting", "Resistance Training", "Cardio", "Yoga", "Pilates", "Crossfit", "HIIT", "Functional Training", "Boxing", "Martial Arts"]}
        error={errors.specialization}
        register={register} 
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-200">
          Certifications
        </label>
        
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <FormInput
               name={`certifications.${index}.name`}
              control={control}
              label="Certification Name"
              type="text"
              error={errors.certifications?.[index]?.name}
            />
            
            <FormInput
              name={`certifications.${index}.issuedBy`}
              control={control}
              label="Issued By"
              type="text"
              error={errors.certifications?.[index]?.issuedBy}
            />
            
            <FormInput
              name={`certifications.${index}.issueDate`}
              control={control}
              label="Issue Date"
              type="date"
              error={errors.certifications?.[index]?.issueDate}
            />

            {fields.length > 1 && (
              <Button
                type="button"
                onClick={() => remove(index)}
                backgroundColor="primary"
                className="mt-2"
              >
                Remove Certification
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={() => append({ name: '', issuedBy: '', issueDate: '' })}
          backgroundColor="primary"
          className="mt-2"
        >
          Add Certification
        </Button>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button
          type="button"
          onClick={onClose}
          backgroundColor="primary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          backgroundColor="secondary"
          disabled={!isValid || isLoading}
        >
          Submit Request
        </Button>
      </div>
    </form>
  );
};
