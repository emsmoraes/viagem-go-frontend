import { z } from "zod";

export const customerSchema = z.object({
  profileImage: z.instanceof(File).optional().nullable(),
  fullName: z.string({ required_error: "O nome completo é obrigatório." }),
  nickname: z.string().optional(),
  rg: z.string().optional(),
  cpf: z.string().optional(),
  birthDate: z
    .union([z.string().datetime(), z.literal("").optional(), z.null()])
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Data de nascimento inválida.",
    }),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  maritalStatus: z.string().optional(),
  profession: z.string().optional(),
  numberOfChildren: z.number().int().optional(),
  postalCode: z.string().optional(),
  address: z.string().optional(),
  addressNumber: z.string().optional(),
  neighborhood: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  family: z.array(z.string()).optional(),
  accommodationPreference: z.array(z.string()).optional(),
  airPreference: z.array(z.string()).optional(),
  travelStyle: z.array(z.string()).optional(),
  interestedExperiences: z.array(z.string()).optional(),
  dreamTrips: z.array(z.string()).optional(),
  recentTrips: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  observation: z.string().optional(),
  referralSource: z.string().optional(),
});
