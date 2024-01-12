import { resumeArrow } from "@/data/icons";
import { formatTimeAgo } from "@/utils/helperFunctions";
import { ApplicationCardProps } from "@/utils/interfaces";

const ExternalApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
}) => {
  const { firstName, lastName, noticePeriod, applicationDate } = application;

  return (
    <div className=" flex flex-col gap-2 px-3 py-3 justify-betwwen border-2 border-[#E1E4E8] rounded-lg min-w-92 w-96 h-auto mb-3 ">
      <div className="flex justify-between ">
        <div className="text-sm font-bold">{firstName + " " + lastName}</div>
        <div className=" text-[10px] font-light text-[#6A737D] text-nowrap">
          Applied {formatTimeAgo(applicationDate)}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-light text-[#6A737D] text-nowrap">
            Resume
          </span>
          <div className="flex justify-center gap-1 ">
            <span className="text-xs font-bold">
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
            Resume
          </span>
          <span className="text-xs font-bold">{noticePeriod}</span>
        </div>
      </div>
    </div>
  );
};

export default ExternalApplicationCard;
