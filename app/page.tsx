"use client";
import KanbanBoard from "@/components/kanbanBoard";
import { openings } from "@/data/data";
import { OpeningDetailsProps } from "@/utils/interfaces";
import { useState } from "react";
import OpeningDetails from "@/components/openingDetails";

export default function Home() {
  const [opening, setOpening] = useState<OpeningDetailsProps["opening"]>(
    openings[0]
  );

  return (
    <div className="flex justify-center mx-auto">
      <div className="h-dvh w-[212px] hidden xl:flex bg-black"> Sidebar</div>
      <div className="flex flex-wrap flex-col w-[988px] border-2 border-[#E1E4E8]">
        <div>
          <OpeningDetails opening={opening} />
        </div>
        <div>
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
