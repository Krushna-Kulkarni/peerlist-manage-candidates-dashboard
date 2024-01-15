"use client";

import { KanbanBoard } from "@/components/kanbanBoard";
import OpeningDetails from "@/components/openingDetails";
import Sidebar from "@/components/sidebar";
import { openings, users } from "@/data/data";
import { KanbanBoardProps, OpeningDetailsProps } from "@/utils/interfaces";
import { useState } from "react";

export default function Home() {
  const [opening, setOpening] = useState<OpeningDetailsProps["opening"]>(
    openings[0]
  );
  const [currentUser, setCurrentUser] = useState<
    KanbanBoardProps["currentUser"]
  >(users[10]);

  return (
    <div className="flex justify-center mx-auto">
      <div className="h-dvh inset-0 w-[212px] hidden xl:flex">
        <Sidebar currentUser={currentUser} />
      </div>
      <div className="flex flex-wrap flex-col w-[988px] border-x-[1px] border-[#E1E4E8]">
        <div>
          <OpeningDetails opening={opening} />
        </div>
        <div>
          <KanbanBoard opening={opening} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}
