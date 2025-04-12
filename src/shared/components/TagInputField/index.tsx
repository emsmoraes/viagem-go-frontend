import { useState } from "react";
import { Controller } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Separator } from "../ui/separator";

interface TagInputFieldProps {
  label: string;
  name: string;
  control: any;
}

export const TagInputField = ({ label, name, control }: TagInputFieldProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    onChange: (value: string[]) => void,
    value: string[],
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(onChange, value);
    }
  };

  const addItem = (onChange: (value: string[]) => void, value: string[]) => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const removeItem = (index: number, onChange: (value: string[]) => void, value: string[]) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <>
      <Separator />
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormItem className="flex flex-col justify-start sm:col-span-2">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div>
                <div className="flex items-center gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, field.onChange, field.value)}
                    placeholder="Digite e pressione Enter"
                    className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                  />
                  <Button
                    type="button"
                    onClick={() => addItem(field.onChange, field.value)}
                    className="flex h-full w-auto items-center justify-center p-[2px] [&_svg:not([class*='size-'])]:size-9"
                    size="icon"
                  >
                    <IoIosAddCircleOutline />
                  </Button>
                </div>

                {field.value?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value.map((tag: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
                      >
                        {tag}
                        <button type="button" onClick={() => removeItem(index, field.onChange, field.value)}>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
