import {
  addSpaceBetweenCountryAndNumber,
  convertMonthsToYearsAndMonths,
  formatTimeAgo,
  getLatestStatus,
} from "@/utils/helperFunctions";
import { ApplicationCardProps } from "@/utils/interfaces";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { peerlistIcon, rejected, shortlisted, verified } from "@/utils/icons";

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const {
    firstName,
    lastName,
    peerlistProfile: { experience, profilePicture, organisation, role },
    refBy,
    holdingOffer,
    noticePeriod,
    contact: { email, mobile },
    selfApplied,
    currentStatus,
    applicationDate,
    peerlistMatched,
    statusHistory,
  } = application;

  return (
    // target md:min-w- & md:m-1for card width on taablet+
    // target min-w- & m-auto for card width on mobile
    <div className="flex flex-col gap-1 min-w-full md:min-w-64 bg-[#FFFF] px-3 py-3 justify-between border-2 border-[#E1E4E8] rounded-lg  h-auto m-auto md:m-1 hover:bg-[#FAFBFC]">
      <div className="flex justify-between">
        <img src={`${profilePicture}`} className="w-9 h-9" />
        {peerlistMatched ? (
          <div className="flex flex-col">
            <div className="flex  items-center pr-2  bg-[#E2F5EA] rounded-lg">
              <span className="p-0.5">
                <img src={`${peerlistIcon}`} className="w-4 h-4 " />
              </span>
              <div className="text-[10px] mt-0.5 text-center text-[#219653]  font-semibold">
                Matched
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="flex flex-col">
              {!isEmpty(refBy) && (
                <div className="flex items-center justify-center gap-1 text-[#6A737D] text-[10px]">
                  Ref by
                  <span>
                    <img src={`${refBy?.profilePicture}`} className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] text-[#6A737D] font-semibold">
                    {refBy?.firstName}
                  </span>
                </div>
              )}
            </div>
            {selfApplied && (
              <div className="flex flex-col items-center pt-[1px] text-[10px] font-light text-[#6A737D] text-nowrap">
                Applied {formatTimeAgo(applicationDate)}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex gap-1 items-center">
          <div className="text-sm font-bold">{firstName + " " + lastName}</div>
          <div>{<img src={`${verified}`} className="w-4 h-4" />}</div>
        </div>
        <div className="text-[11px] font-medium">
          {role + " " + organisation}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-light text-[#6A737D] text-nowrap">
            Experience
          </span>
          <span className="text-[11px] font-bold">{`${
            convertMonthsToYearsAndMonths(experience).years +
            "y" +
            " " +
            convertMonthsToYearsAndMonths(experience).remainingMonths +
            "m"
          }`}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-light text-[#6A737D] text-nowrap">
            Holding offer?
          </span>
          <span className="text-[11px] font-bold">
            {holdingOffer ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-light text-[#6A737D] text-nowrap">
            Notice Period
          </span>
          <span className="text-[11px] font-bold">{noticePeriod}</span>
        </div>
      </div>
      {!isEmpty(statusHistory) &&
      (currentStatus === "Shortlisted" || currentStatus === "Rejected") ? (
        <div className="flex gap-0.5 items-center">
          <span>
            {currentStatus === "Shortlisted" ? (
              <img src={`${shortlisted}`} className="w-3 h-3" />
            ) : (
              <img src={`${rejected}`} className="w-3 h-3" />
            )}
          </span>
          <span className="text-[10px] font-light text-[#6A737D] text-nowrap">
            {currentStatus} by{" "}
            <span className="text-[10px] text-[#6A737D] font-semibold">
              {getLatestStatus(statusHistory).changedBy.firstName +
                " " +
                getLatestStatus(statusHistory).changedBy.lastName}
            </span>{" "}
            on {moment(statusHistory[0].timestamp).format("D MMM YYYY")}
          </span>
        </div>
      ) : (
        <div>
          <div className="text-[10px] font-light text-[#6A737D]">Contact</div>
          <div className="flex flex-col ">
            <span className="text-[11px] font-bold">{email}</span>
            <span className="text-[11px] font-bold">
              {addSpaceBetweenCountryAndNumber(mobile)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
