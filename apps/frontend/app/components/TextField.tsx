import React from 'react';

interface TextFieldProps {
  label?: string;
  type: string;
  placeholder: string;
  value: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean; 
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`rounded border border-[#BDBDBD] bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${className}`}
      />
    </div>
  );
};

export default TextField;
