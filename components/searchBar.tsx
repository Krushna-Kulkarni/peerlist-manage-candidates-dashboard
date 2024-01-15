"use client";
import { searchSmall } from "@/utils/icons";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className=" flex gap-1 items-center px-3 py-6 sm:p-6 ">
      <div className="w-full md:w-[60%] h-6 flex justify-center items-center pl-2 pr-1 py-0 ">
        <img src={`${searchSmall}`} className="w-4 h-4 text-gray-400" />

        <input
          className=" flex items-center text-[16px] md:text-[14px] w-full pl-2 outline-none placeholder-gray-400"
          type="text"
          name="candidate-search"
          placeholder="Search Candidates"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div
          style={{
            display: searchQuery ? "flex" : "none",
          }}
          className="flex items-center h-4 cursor-pointer px-[0.4em] py-[0.6em] border border-[#D1D5DA] rounded-full bg-[#FFFFFF] hover:bg-[#E1E4E8]"
          onClick={() => setSearchQuery("")}
        >
          <span className="text-sm mb-0.5">x</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
