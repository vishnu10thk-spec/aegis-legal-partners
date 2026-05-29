require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");
app.set("trust proxy", 1);

const normalizeOriginList = (value) =>
  String(value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://localhost:3000",
  ...normalizeOriginList(process.env.FRONTEND_URL),
  ...normalizeOriginList(process.env.FRONTEND_URLS)
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  const isLocalhost = /^https?:\/\/localhost:\d+$/.test(origin);
  const isVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

  return allowedOrigins.includes(origin) || isLocalhost || isVercelPreview;
};

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload."
    });
  }

  return next(error);
});

const cachePublicContent = (res) => {
  res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
};

const cleanString = (value, maxLength) =>
  String(value || "")
    .trim()
    .replace(/[^\S\r\n]+/g, " ")
    .slice(0, maxLength);

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const attorneys = [
  {
    id: "isadora-vale",
    name: "Isadora Vale",
    title: "Managing Partner, Global Transactions",
    credentials: "JD, Harvard Law School | Former Magic Circle Counsel",
    expertise: ["Corporate Governance", "Cross-Border M&A", "Board Advisory"],
    biography:
      "Isadora advises sovereign funds, founders, and public boards through complex commercial moments where legal precision, public posture, and capital strategy must move as one.",
    portraitUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: "marcus-arden",
    name: "Marcus Arden",
    title: "Partner, Trial Strategy & Criminal Defense",
    credentials: "JD, Columbia Law School | Former Federal Prosecutor",
    expertise: ["White Collar Defense", "Crisis Litigation", "Investigations"],
    biography:
      "Marcus is known for disciplined courtroom strategy, discreet investigations, and high-stakes defense work for executives, institutions, and families under public scrutiny.",
    portraitUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: "celeste-rowan",
    name: "Celeste Rowan",
    title: "Partner, Intellectual Property & Technology",
    credentials: "LLM, Stanford Law | Registered Patent Attorney",
    expertise: ["Patent Portfolios", "AI Licensing", "Trade Secret Protection"],
    biography:
      "Celeste architects defensible IP positions for technology leaders, luxury houses, and life-sciences ventures operating in fast-moving innovation markets.",
    portraitUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: "nathaniel-cross",
    name: "Nathaniel Cross",
    title: "Partner, Private Wealth & Family Office",
    credentials: "JD, Yale Law School | STEP Affiliate",
    expertise: ["High-Net-Worth Family Law", "Trust Structures", "Private Settlements"],
    biography:
      "Nathaniel handles sensitive family office matters with quiet authority, protecting privacy, generational wealth, and long-term family governance.",
    portraitUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=90"
  }
];

const practiceAreas = [
  {
    id: "corporate-law",
    title: "Corporate Law",
    description:
      "Board counsel, governance frameworks, commercial agreements, and entity strategy for institutions that operate under serious scrutiny.",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=90",
    iconName: "Landmark"
  },
  {
    id: "mergers-acquisitions",
    title: "Mergers & Acquisitions",
    description:
      "Discreet transaction command across diligence, negotiation, regulatory posture, and executive-level closing strategy.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90",
    iconName: "Scale"
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    description:
      "Portfolio architecture, licensing, enforcement, and trade secret protection for brands built on uncommon ideas.",
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=90",
    iconName: "Fingerprint"
  },
  {
    id: "criminal-defense",
    title: "Criminal Defense",
    description:
      "High-discretion defense strategy for executives and private clients facing criminal, regulatory, or reputational exposure.",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=90",
    iconName: "ShieldCheck"
  },
  {
    id: "high-net-worth-family-law",
    title: "High-Net-Worth Family Law",
    description:
      "Privacy-first family law counsel for complex assets, estate-adjacent negotiations, and sensitive relationship transitions.",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=90",
    iconName: "Gem"
  }
];

const testimonials = [
  {
    client: "Eleanor V.",
    company: "Founder, Aurum Capital Group",
    testimonial:
      "Aegis entered at the most delicate point in our transaction and brought immediate order, confidence, and negotiating leverage.",
    rating: 5
  },
  {
    client: "Julian R.",
    company: "Chairman, Meridian Holdings",
    testimonial:
      "Their counsel feels different: quiet, exacting, and deeply strategic. The board trusted them within the first meeting.",
    rating: 5
  },
  {
    client: "Seraphina L.",
    company: "Private Family Office Principal",
    testimonial:
      "Every conversation was handled with restraint and precision. They protected the outcome and the privacy around it.",
    rating: 5
  }
];

app.get("/api/health", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({
    status: "online",
    service: "Aegis Legal Partners API",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/attorneys", (req, res) => {
  cachePublicContent(res);
  res.json(attorneys);
});

app.get("/api/practice-areas", (req, res) => {
  cachePublicContent(res);
  res.json(practiceAreas);
});

app.get("/api/testimonials", (req, res) => {
  cachePublicContent(res);
  res.json(testimonials);
});

app.post("/api/consultations", (req, res) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const consultation = {
    name: cleanString(body.name, 80),
    email: cleanString(body.email, 120).toLowerCase(),
    phone: cleanString(body.phone, 32),
    caseDescription: cleanString(body.caseDescription, 1800)
  };

  const { name, email, phone, caseDescription } = consultation;
  const missingFields = ["name", "email", "phone", "caseDescription"].filter(
    (field) => consultation[field].length === 0
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required field${missingFields.length > 1 ? "s" : ""}: ${missingFields.join(", ")}.`
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address."
    });
  }

  if (phone.length < 7) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid phone number."
    });
  }

  if (caseDescription.length < 24) {
    return res.status(400).json({
      success: false,
      message: "Please provide a more detailed case description."
    });
  }

  const receivedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long"
  });

  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║          AEGIS LEGAL PARTNERS CONSULTATION REQUEST          ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║ Name:  ${name}`);
  console.log(`║ Email: ${email}`);
  console.log(`║ Phone: ${phone}`);
  console.log(`║ Time:  ${receivedAt}`);
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log("║ Case Brief:");
  console.log(`║ ${String(caseDescription).replace(/\n/g, "\n║ ")}`);
  console.log("╚══════════════════════════════════════════════════════════════╝");
  console.log("\n");

  return res.status(201).json({
    success: true,
    message: "Consultation successfully scheduled with the Aegis legal board."
  });
});

app.use((req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(404).json({
    success: false,
    message: "The requested Aegis endpoint does not exist."
  });
});

app.use((error, req, res, next) => {
  console.error("Aegis API error:", error.message);
  res.status(500).json({
    success: false,
    message: "Aegis Legal Partners API encountered an unexpected issue."
  });
});

app.listen(PORT, () => {
  console.log(`Aegis Legal Partners API listening on port ${PORT}`);
});
