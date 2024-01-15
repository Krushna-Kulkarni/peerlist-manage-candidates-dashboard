"use client";

import {
  dropdown,
  editPencil,
  openNewWindow,
  peerlistIconRounded,
  share,
  threeVerticalDots,
} from "@/utils/icons";
import { OpeningDetailsProps } from "@/utils/interfaces";
import isEmpty from "lodash/isEmpty";
import { formatTimeAgo } from "./../utils/helperFunctions";

const OpeningDetails: React.FC<OpeningDetailsProps> = ({ opening }) => {
  const {
    title,
    company,
    location,
    jobType,
    postedBy,
    openingDate,
    viewedBy,
    applications,
  } = opening;
  return (
    <div className="md:h-44 bg-[#FAFBFC] border-b-[1px] border-[#E1E4E8]">
      <div className="flex flex-col gap-2 md:gap-6 w-full p-2  lg:p-4">
        <div className="flex gap-2 justify-between">
          <div className="flex items-center">
            <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#E1E4E8] rounded-2xl">
              <img
                src={`${peerlistIconRounded}`}
                className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow"
              />
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <div className=" flex items-center gap-1 text-[16px] sm:text-[18px] font-semibold">
              {title}{" "}
              <span>
                <img src={`${dropdown}`} className="w-4 h-4" />
              </span>
            </div>
            <div className="flex flex-wrap gap-1 text-[12px] sm:text-[14px] font-normal">
              <span>at {company}</span>
              <span>&#x2022; {jobType}</span>
              <span>&#x2022; {location}</span>
            </div>
          </div>
          <div className="flex flex-col justify-start ml-auto">
            <div className="flex flex-col sm:flex-row  flex-wrap gap-1 justify-evenly">
              <span className="flex items-center cursor-pointer w-6 h-6 px-1 py-1 border border-[#D1D5DA] rounded-full bg-[#FFFFFF]">
                <img src={`${editPencil}`} className="w-4 h-4" />
              </span>
              <span className="flex items-center cursor-pointer w-6 h-6 px-1 py-1 border border-[#D1D5DA] rounded-full bg-[#FFFFFF]">
                <img src={`${openNewWindow}`} className="w-4 h-4" />
              </span>
              <span className="flex items-center cursor-pointer w-6 h-6 px-1 py-1 border border-[#D1D5DA] rounded-full bg-[#FFFFFF]">
                <img src={`${share}`} className="w-4 h-4" />
              </span>
              <span className="flex items-center cursor-pointer w-6 h-6 px-1 py-1 border border-[#D1D5DA] rounded-full bg-[#FFFFFF]">
                <img src={`${threeVerticalDots}`} className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-[12px] ">
          <div className="flex sm:ml-16 gap-1">
            <div className="flex flex-wrap gap-1">
              <span className="font-semibold">{applications.length}</span>
              Candidates
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-wrap font-semibold">
                {applications.filter((a) => !isEmpty(a.peerlistProfile)).length}
              </span>
              Applied w/ Peerlist
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="font-semibold">{viewedBy}</span> Views
            </div>
          </div>
          <div className="flex gap-2 md:gap-1 items-center text-[#6A737D] text-[10px]">
            <div className="flex flex-wrap justify-end md:flex-nowrap gap-1">
              <span>Posted</span>{" "}
              <span className="text-[#0D0D0D] font-semibold">
                {formatTimeAgo(openingDate)}
              </span>{" "}
            </div>
            <div>
              <span>by</span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                <img src={`${postedBy.profilePicture}`} className="w-4 h-4" />
              </span>{" "}
              <span className="flex text-wrap  text-[#0D0D0D] font-semibold">
                {postedBy.firstName} {postedBy.lastName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningDetails;
