import type {
  Attorney,
  ConsultationPayload,
  ConsultationResponse,
  PracticeArea,
  Testimonial
} from "@/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    cache: "no-store"
  }).finally(() => window.clearTimeout(timeout));

  const payload = await response.json().catch(() => ({
    message: "Aegis API returned an unreadable response."
  }));

  if (!response.ok) {
    throw new Error(payload?.message || "Aegis API request failed.");
  }

  return payload as T;
}

export function getAttorneys() {
  return request<Attorney[]>("/api/attorneys");
}

export function getPracticeAreas() {
  return request<PracticeArea[]>("/api/practice-areas");
}

export function getTestimonials() {
  return request<Testimonial[]>("/api/testimonials");
}

export function submitConsultation(payload: ConsultationPayload) {
  return request<ConsultationResponse>("/api/consultations", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
