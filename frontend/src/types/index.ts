export type Attorney = {
  id: string;
  name: string;
  title: string;
  credentials: string;
  expertise: string[];
  biography: string;
  portraitUrl: string;
};

export type PracticeArea = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconName: string;
};

export type Testimonial = {
  client: string;
  company: string;
  testimonial: string;
  rating: number;
};

export type ConsultationPayload = {
  name: string;
  email: string;
  phone: string;
  caseDescription: string;
};

export type ConsultationResponse = {
  success: boolean;
  message: string;
};
