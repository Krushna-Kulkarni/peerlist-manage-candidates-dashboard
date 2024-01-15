import { rejected, resumeArrow, shortlisted } from "@/utils/icons";
import { formatTimeAgo, getLatestStatus } from "@/utils/helperFunctions";
import { ApplicationCardProps } from "@/utils/interfaces";
import { isEmpty } from "lodash";
import moment from "moment";

const ExternalApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  isExpanded,
}) => {
  const {
    firstName,
    lastName,
    noticePeriod,
    currentStatus,
    applicationDate,
    statusHistory,
  } = application;

  return (
    <>
      {isExpanded ? (
        // target md:min-w- & md:m-1for card width on taablet+
        // target min-w- & m-auto for card width on mobile
        <div className="flex flex-col gap-1 min-w-full md:min-w-64 bg-[#FFFF] px-3 py-3 justify-between border-2 border-[#E1E4E8] rounded-lg  h-auto m-auto md:m-1 hover:bg-[#FAFBFC]">
          <div className="flex justify-between ">
            <div className="text-sm font-bold">
              {firstName + " " + lastName}
            </div>
            <div className="flex flex-col items-center pt-[1px] text-[10px] font-light text-[#6A737D] text-nowrap">
              Applied {formatTimeAgo(applicationDate)}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-light text-[#6A737D] text-nowrap">
                Resume
              </span>
              <div className="flex justify-center gap-1 ">
                <span className="text-[11px] font-bold">
                  {/* {resumeLink} */}
                  DarrellSteward.pdf
                </span>

                <span>
                  <img src={`${resumeArrow}`} className="w-2 h-2" />
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-light text-[#6A737D] text-nowrap">
                Notice Period
              </span>
              <span className="text-[11px] font-bold">{noticePeriod}</span>
            </div>
          </div>
          {!isEmpty(statusHistory) &&
            (currentStatus === "Shortlisted" ||
              currentStatus === "Rejected") && (
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
            )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ExternalApplicationCard;
