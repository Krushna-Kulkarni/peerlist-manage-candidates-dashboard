import ApplicationDetails from "@/components/applicationDetails";
import KanbanBoard from "@/components/kanbanBoard";

export default function Home() {
  return (
    <div className="flex justify-center mx-auto">
      <div className="h-dvh w-[212px] hidden xl:flex bg-black"> Sidebar</div>
      <div className="flex flex-wrap flex-col w-[988px] border-2 border-purple-700">
        <div>
          <ApplicationDetails />
        </div>
        <div>
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
