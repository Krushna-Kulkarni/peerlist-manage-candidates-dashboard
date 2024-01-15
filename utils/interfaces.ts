import { userInfo } from "os";

export interface userInfo {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  userName: string;
  verified: boolean;
  joinedDate: number;
  experience: number;
  contact: contactInfo;
  role: string;
  organisation: string;
}

export interface contactInfo {
  email: string;
  mobile: string;
}
export interface statusHistory {
  newStatus: string;
  changedBy: userInfo;
  timestamp: number;
}
export interface applicationData {
  id: string;
  applicationDate: number;
  firstName: string;
  lastName: string;
  peerlistProfile: userInfo;
  peerlistMatched: boolean;
  contact: contactInfo;
  experience: number;
  refBy: userInfo;
  noticePeriod: string;
  resumeLink: string;
  holdingOffer: boolean;
  external: boolean;
  selfApplied: boolean;
  currentStatus: string;
  statusHistory: statusHistory[];
}
export type openingData = {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  postedBy: userInfo;
  openingDate: number;
  viewedBy: number;
  applications: applicationData[];
};

export interface ApplicationCardProps {
  application: applicationData;
}
export interface OpeningDetailsProps {
  opening: openingData;
}
export interface KanbanBoardProps {
  opening: openingData;
  currentUser: userInfo;
}
export interface SidebarProps {
  currentUser: userInfo;
}

export interface section {
  id: string;
  applications: ApplicationCardProps["application"][];
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  cta: string;
}
