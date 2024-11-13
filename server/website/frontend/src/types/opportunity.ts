export type Opportunity = {
  id: string;
  active: boolean;
  title: string;
  company: string;
  location: string;
  location_type: "Remote" | "On-site" | "Hybrid";
  pay?: number;
  pay_per?: string;
  job_type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Co-op";
  description: string;
  qualifications: string[];
  skills: string[];
  benefits?: string[];
  posted_date: string;
  application_instructions: string;
  apply_link?: string;
  clicks: number;
};
