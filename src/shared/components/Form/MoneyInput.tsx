"use client";

import { useEffect, useReducer } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

type MoneyInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder: string;
};

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function MoneyInput({ form, name, label, placeholder }: MoneyInputProps) {
  const initialValue = form.getValues()[name] ? moneyFormatter.format(form.getValues()[name]) : "";

  const [value, setValue] = useReducer((_: string, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  const handleChange = (realChangeFn: (value: number) => void, formattedValue: string) => {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  };

  const formData = form.watch(name);

  useEffect(() => {
    const formValue = moneyFormatter.format(Number(formData));
    if (formValue !== value) {
      setValue(formValue);
    }
  }, [formData, value]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                className="w-full rounded-[24px] px-4 py-5 text-[12px] font-medium"
                placeholder={placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(field.onChange, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
