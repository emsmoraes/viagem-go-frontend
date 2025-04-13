import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/shared/lib/utils";

type MaskedInputProps = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  mask: string;
  className?: string;
  disabled?: boolean;
};

export default function MaskedInput({
  control,
  name,
  label,
  placeholder,
  mask,
  className = "",
  disabled,
}: MaskedInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ fieldState: { error } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask={mask}
                  disabled={disabled}
                  placeholder={placeholder || mask}
                  className={cn(
                    "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-2xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[border-color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus:border-primary focus:ring-0",
                    "aria-invalid:border-destructive",
                    className,
                  )}
                  onAccept={(value: any) => field.onChange(value)}
                />
              )}
            />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
