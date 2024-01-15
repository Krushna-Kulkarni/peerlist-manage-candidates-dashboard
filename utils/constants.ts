import { v4 as uuid } from "uuid";

import {
  collapse,
  download,
  downloadGreen,
  inbox,
  jobs,
  myNetwork,
  projects,
  roundedApplied,
  roundedRejected,
  roundedShortlisted,
  scroll,
  search,
} from "@/utils/icons";

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

export const navigation = [
  { title: "Scroll", icon: scroll, link: "#", isActive: true },
  { title: "Projects", icon: projects, link: "#", isActive: false },
  { title: "Inbox", icon: inbox, link: "#", isActive: false },
  { title: "Jobs", icon: jobs, link: "#", isActive: false },
  { title: "Search", icon: search, link: "#", isActive: false },
  { title: "My Network", icon: myNetwork, link: "#", isActive: false },
];

export const supportLinks = [
  { title: "Blog", link: "#" },
  { title: "Help Center", link: "#" },
  { title: "Feedback", link: "#" },
  { title: "Code of Conduct", link: "#" },
  { title: "Privacy", link: "#" },
  { title: "T&C", link: "#" },
];
