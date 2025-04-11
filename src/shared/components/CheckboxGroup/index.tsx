import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "../ui/label";

interface CheckboxGroupProps {
  name: string;
  options: string[];
  control: any;
  label?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, options, control, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { value = [], onChange } = field;

        const handleCheckboxChange = (option: string) => {
          if (value.includes(option)) {
            onChange(value.filter((item: string) => item !== option));
          } else {
            onChange([...value, option]);
          }
        };

        return (
          <div>
            {label && <Label className="mb-5">{label}</Label>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
              {options.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <Checkbox checked={value.includes(option)} onCheckedChange={() => handleCheckboxChange(option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default CheckboxGroup;
