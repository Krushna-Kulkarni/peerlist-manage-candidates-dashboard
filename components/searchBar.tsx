"use client";
import { searchSmall } from "@/utils/icons";

const SearchBar = () => {
  return (
    <div className=" flex gap-1 items-center px-3 py-6 sm:p-6 ">
      <div className="w-full md:w-[60%] h-6 flex justify-center items-center pl-2 pr-1 py-0 ">
        <img src={`${searchSmall}`} className="w-4 h-4 text-gray-400" />

        <input
          className=" flex items-center text-[16px] md:text-[14px] w-full pl-2 outline-none placeholder-gray-400"
          type="text"
          name="candidate-search"
          placeholder="Search Candidates"
        />
        <div className="flex items-center h-4 cursor-pointer px-[0.4em] py-[0.6em] rounded-full bg-[#FFFFFF] hover:bg-[#E1E4E8]">
          <span className="text-sm mb-0.5">x</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
