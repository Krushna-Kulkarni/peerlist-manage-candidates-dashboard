import moment from "moment";
import { statusHistory } from "./interfaces";

export function formatTimeAgo(timestamp: number): string {
  const now = moment();
  const appliedTime = moment(timestamp).subtract(1, "days");

  const duration = moment.duration(now.diff(appliedTime));
  const days = Math.floor(duration.asDays());

  if (days === 0) {
    return " today";
  } else if (days === 1) {
    return " 1d ago";
  } else {
    return `${days}d ago`;
  }
}

export function addSpaceBetweenCountryAndNumber(fullNumber: string): string {
  const countryLength = fullNumber.length - 10;

  if (countryLength <= 0) {
    // Handle the case where the country code length is invalid
    return fullNumber;
  }

  const countryCode = fullNumber.substring(0, countryLength);
  const phoneNumber = fullNumber.substring(countryLength);

  // Add a space between the country code and phone number
  const formattedNumber = `${countryCode} ${phoneNumber}`;

  return formattedNumber;
}

export function convertMonthsToYearsAndMonths(months: number): {
  years: number;
  remainingMonths: number;
} {
  if (months < 0) {
    return { years: 0, remainingMonths: 0 };
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return { years, remainingMonths };
}

export function getLatestStatus(statusHistory: statusHistory[]): statusHistory {
  let latestStatus: statusHistory = statusHistory[0];

  for (let i = 1; i < statusHistory.length; i++) {
    const currentObject: statusHistory = statusHistory[i];

    if (currentObject.timestamp > latestStatus.timestamp) {
      latestStatus = currentObject;
    }
  }

  return latestStatus;
}
