export interface LeadDetails {
  id: string;
  createdAt: string;
  priority: "Low" | "Medium" | "High";
  stage:
    | "New"
    | "Acknowledged"
    | "Negotiation"
    | "Contract Sent"
    | "Customer"
    | "Closed";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  companyName: string;
  sector: string;
  employeeCount?: number;
  address?: string;
}
