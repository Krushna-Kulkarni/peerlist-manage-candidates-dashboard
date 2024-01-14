import { v4 as uuid } from "uuid";

import {
  collapse,
  download,
  downloadGreen,
  roundedApplied,
  roundedRejected,
  roundedShortlisted,
} from "@/data/icons";

export const sections = [
  {
    id: uuid(),
    applications: [],
    title: "Rejected",
    icon: roundedRejected,
    color: "#EB5757",
    bgColor: "#FFEAEA",
    cta: collapse,
  },
  {
    id: uuid(),
    applications: [],
    title: "Applied",
    icon: roundedApplied,
    color: "#0D0D0D",
    bgColor: "#E1E4E8",
    cta: download,
  },
  {
    id: uuid(),
    applications: [],
    title: "Shortlisted",
    icon: roundedShortlisted,
    color: "#219653",
    bgColor: "#E2F5EA",
    cta: downloadGreen,
  },
];
