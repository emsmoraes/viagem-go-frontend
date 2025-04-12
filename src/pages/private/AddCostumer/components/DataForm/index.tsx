import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "./schema";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import SingleImageUpload from "@/shared/components/SingleImageUpload";
import { PiMountains, PiUserLight } from "react-icons/pi";
import MaskedInput from "@/shared/components/Form/MaskedInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import CheckboxGroup from "@/shared/components/CheckboxGroup";
import { hospedagemOpcoes } from "./options/preferenciasDeHospedagem";
import { aereoOpcoes } from "./options/preferenciasDeAereo";
import { estilosDeViagem } from "./options/estilosDeViagem";
import { experienciasDeInteresse } from "./options/experienciasDeInteresse";
import { TagInputField } from "@/shared/components/TagInputField";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Separator } from "@/shared/components/ui/separator";
import DataFormDocuments from "../DataFormDocuments";

export type CustomerSchema = z.infer<typeof customerSchema>;
const CostumerAvatarPlaceholder = () => <PiUserLight size={100} className="text-primary group-hover:text-primary/80" />;

const fields = [
  { name: "family", label: "Família" },
  { name: "dreamTrips", label: "Viagens dos Sonhos" },
  { name: "recentTrips", label: "Viagens Recentes" },
  { name: "tags", label: "Tags" },
];

function DataForm() {
  const [showRest, setShowRest] = useState(false);
  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      fullName: "",
      nickname: "",
      rg: "",
      cpf: "",
      birthDate: "",
      email: "",
      phone: "",
      maritalStatus: "",
      profession: "",
      numberOfChildren: undefined,
      postalCode: "",
      address: "",
      addressNumber: "",
      neighborhood: "",
      complement: "",
      city: "",
      state: "",
      country: "",
      family: [],
      accommodationPreference: [],
      airPreference: [],
      travelStyle: [],
      interestedExperiences: [],
      dreamTrips: [],
      recentTrips: [],
      tags: [],
      observation: "",
      referralSource: "",
      profileImage: undefined,
      customerDocuments: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    control,
    formState: { errors },
    watch,
  } = form;

  const handleImageChange = (file: File | null) => {
    setValue("profileImage", file, { shouldDirty: true });
    trigger("profileImage");
  };

  const onSubmit = (data: CustomerSchema) => {
    const payload = {
      ...data,
      cover: data.profileImage instanceof File ? data.profileImage : undefined,
    };

    console.log("Payload:", payload);

    reset({ ...data });
  };

  return (
    <div className="min-w-[200px] flex-1">
      <div className="mb-3 flex">
        <SingleImageUpload
          currentImage={form.watch("profileImage")}
          onChange={handleImageChange}
          errorMessage={form.formState.errors.profileImage?.message}
          ImagePickerPlaceholder={CostumerAvatarPlaceholder}
          hiddenDelete={true}
        />
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start">
                    <FormLabel>Nome completo*</FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                        placeholder="Digite o nome completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="nickname"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start">
                    <FormLabel>Apelido</FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                        placeholder="Digite o apelido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start">
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                        type="date"
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
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                        placeholder="Digite o e-mail"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <MaskedInput
                control={form.control}
                name="cpf"
                label="CPF"
                mask="000-000-000.00"
                className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
              />

              <MaskedInput
                control={form.control}
                name="phone"
                label="Telefone"
                mask="(00) 00000-0000"
                className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
              />
            </div>

            {showRest && (
              <>
                <div className="space-y-8">
                  <FormField
                    control={control}
                    name="rg"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>RG</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o RG"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Estado Civil</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg">
                              <SelectValue placeholder="Selecione um estado civil" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                            <SelectItem value="Casado(a)<">Casado(a)</SelectItem>
                            <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                            <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                            <SelectItem value="União Estável">União Estável</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Profissão</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite a profissão"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="numberOfChildren"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Número de Filhos</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            type="number"
                            placeholder="Ex: 2"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o CEP"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o endereço"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="addressNumber"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o número"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o bairro"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o complemento"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite a cidade"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o estado"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start">
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Input
                            className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                            placeholder="Digite o país"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <CheckboxGroup
                  control={control}
                  name="accommodationPreference"
                  options={hospedagemOpcoes}
                  label="Preferencias de hospedagens"
                />
                <CheckboxGroup
                  control={control}
                  name="airPreference"
                  options={aereoOpcoes}
                  label="Preferencias de voo"
                />
                <CheckboxGroup
                  control={control}
                  name="travelStyle"
                  options={estilosDeViagem}
                  label="Estilos de viajem"
                />

                <CheckboxGroup
                  control={control}
                  name="interestedExperiences"
                  options={experienciasDeInteresse}
                  label="Experiencias de interesse"
                />

                {fields.map(({ name, label }) => (
                  <TagInputField key={name} name={name} label={label} control={control} />
                ))}

                <Separator />

                <DataFormDocuments control={control} name="customerDocuments" watch={watch} />

                <Separator />

                <FormField
                  control={control}
                  name="observation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-start sm:col-span-2">
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                          placeholder="Digite observações"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="referralSource"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-start sm:col-span-2">
                      <FormLabel>Como conheceu?</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                          placeholder="Indicação, redes sociais etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex items-center justify-center">
              <Button
                onClick={() => setShowRest((old) => !old)}
                variant={"ghost"}
                type="button"
                className="flex items-center"
              >
                Exibir tudo {showRest ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DataForm;
