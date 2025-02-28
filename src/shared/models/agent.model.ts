export interface Agent {
  id: string;
  companyId: string;
  name: string;
  type: "supervisor" | "regular" | "recommender";
  isTemplate: boolean;
  templateId?: string;
  configuration: {
    persona: string;
    knowledge: string[];
    rules: string[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
