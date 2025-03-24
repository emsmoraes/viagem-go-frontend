import { UseFormReturn } from "react-hook-form";
import { ProposalSchema } from "../EditProposalProfile";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

interface EditProposalInfosFormProps {
  form: UseFormReturn<ProposalSchema>;
}

function EditProposalInfosForm({ form }: EditProposalInfosFormProps) {
  return (
    <div className="min-w-[200px] flex-1">
      <Form {...form}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-start">
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                    placeholder="Digite o título"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-start">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOMPLETE">Incompleta</SelectItem>
                    <SelectItem value="AWAITING_RESPONSE">Aguardando Resposta</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmada</SelectItem>
                    <SelectItem value="LOST">Perdida</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-start">
                <FormLabel>Data de Partida</FormLabel>
                <FormControl>
                  <Input
                    className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                    type="date"
                    {...field}
                    value={field.value ? field.value.substring(0, 10) : ""}
                    onChange={(e) => {
                      const dateValue = e.target.value ? new Date(e.target.value).toISOString() : null;
                      field.onChange(dateValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-start">
                <FormLabel>Data de Retorno</FormLabel>
                <FormControl>
                  <Input
                    className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                    type="date"
                    {...field}
                    value={field.value ? field.value.substring(0, 10) : ""}
                    onChange={(e) => {
                      const dateValue = e.target.value ? new Date(e.target.value).toISOString() : null;
                      field.onChange(dateValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
}

export default EditProposalInfosForm;
