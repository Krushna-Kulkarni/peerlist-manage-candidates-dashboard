import { ApplicationCardProps } from "@/utils/interfaces";
import ApplicationCard from "./../components/applicationCard";
import { openings } from "@/data/data";
import ExternalApplicationCard from "./../components/externalApplicationCard";

export default function Home() {
  const applicationData: ApplicationCardProps["application"][] =
    openings[0].applications;

  const stages: Record<string, ApplicationCardProps["application"][]> = {
    Rejected: [],
    Applied: [],
    Shortlisted: [],
  };

  // Categorize the data into three arrays
  applicationData.map((application) => {
    stages[application.currentStatus]?.push(application);
  });

  return (
    <div className="flex flex-wrap  gap-4 m-auto">
      {Object.keys(stages).map((section) => (
        <div
          className="flex flex-col gap-1 border-orange-300 border-2 m-2 p-2 items-center"
          key={section}
        >
          <h2>{section}</h2>
          {stages[section].map((application) => (
            <>
              {application.external ? (
                <ExternalApplicationCard
                  key={application.id}
                  application={application}
                />
              ) : (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
