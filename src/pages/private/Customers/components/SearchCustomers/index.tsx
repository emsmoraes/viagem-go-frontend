import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/shared/components/ui/form";
import { CgSearch } from "react-icons/cg";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

const searchSchema = z.object({
  search: z.string().max(50, "A pesquisa deve ter no máximo 50 caracteres"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchCustomersProps {
  defaultValues: SearchFormValues;
}

export default function SearchCustomers({ defaultValues }: SearchCustomersProps) {
  const navigate = useNavigate();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues,
  });

  function onSubmit(values: SearchFormValues) {
    const params = new URLSearchParams();
    params.set("search", values.search);

    navigate(`?${params.toString()}`, { replace: true });
  }

  return (
    <Form {...form}>
      <form className="relative w-full max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Pesquisar clientes"
                    className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full [&_svg:not([class*='size-'])]:size-6"
                  >
                    <CgSearch className="-ml-1" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
