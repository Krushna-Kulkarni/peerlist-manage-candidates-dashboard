"use client";

import { GetServerSideProps } from "next";
import React from "react";
import { resetServerContext } from "react-beautiful-dnd";

import { ApplicationCardProps } from "@/utils/interfaces";
import ApplicationCard from "./../components/applicationCard";
import { openings, users } from "@/data/data";
import ExternalApplicationCard from "./../components/externalApplicationCard";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { statusHistory } from "./../utils/interfaces";

import {
  collapse,
  download,
  downloadGreen,
  roundedApplied,
  roundedRejected,
  roundedShortlisted,
} from "@/data/icons";

export default function KanbanBoard() {
  //You can take this as props also
  const [applicationsData, setApplicationsData] = useState<
    ApplicationCardProps["application"][]
  >(openings[0].applications);

  const currentUser = users[10];

  interface section {
    id: string;
    applications: ApplicationCardProps["application"][];
    title: string;
    icon: string;
    color: string;
    cta: string;
  }

  const [currentBoard, setCurrentBoard] = useState<section[]>([
    {
      id: uuid(),
      applications: [],
      title: "Rejected",
      icon: roundedRejected,
      color: "#FFEAEA",
      cta: collapse,
    },
    {
      id: uuid(),
      applications: [],
      title: "Applied",
      icon: roundedApplied,
      color: "#E1E4E8",
      cta: download,
    },
    {
      id: uuid(),
      applications: [],
      title: "Shortlisted",
      icon: roundedShortlisted,
      color: "#E2F5EA",
      cta: downloadGreen,
    },
  ]);

  useEffect(() => {
    // Map each application to the respective array in currentBoard
    const updatedData = currentBoard.map((section) => ({
      ...section,
      applications: applicationsData.filter(
        (application) => application.currentStatus === section.title
      ),
    }));

    setCurrentBoard(updatedData);
  }, [applicationsData]);

  const onDragEndHandler = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceSectionIndex = currentBoard.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationSectionIndex = currentBoard.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceSectionObject = currentBoard[sourceSectionIndex];
      const destinationSectionObject = currentBoard[destinationSectionIndex];

      const sourceApplicationArray = [...sourceSectionObject.applications];
      const destinationApplicationArray = [
        ...destinationSectionObject.applications,
      ];

      const [removedApplication] = sourceApplicationArray.splice(
        source.index,
        1
      );

      const updatedApplication = {
        ...removedApplication,
        currentStatus: destinationSectionObject.title,
        statusHistory: [
          ...removedApplication.statusHistory,
          {
            newStatus: destinationSectionObject.title,
            changedBy: currentUser,
            timestamp: Date.now(),
          },
        ],
      };

      destinationApplicationArray.splice(
        destination.index,
        0,
        updatedApplication
      );

      currentBoard[sourceSectionIndex].applications = sourceApplicationArray;
      currentBoard[destinationSectionIndex].applications =
        destinationApplicationArray;

      setCurrentBoard(currentBoard);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="flex flex-wrap justify-evenly sm:justify-center m-auto">
          {currentBoard?.map((section) => {
            return (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      border: `2px solid ${section.color}`,
                    }}
                    className={`flex flex-col min-w-[340px] sm:min-w-fit gap-1 max-w-96 bg-[#FAFBFC]   m-2 rounded-lg items-center`}
                  >
                    <div
                      style={{ backgroundColor: section.color }}
                      className={`flex gap-1 w-full justify-between p-2 items-center  rounded-t-md  `}
                    >
                      <span>
                        <img
                          src={`${section.icon}`}
                          className="w-3 h-3 mb-0.5"
                        />
                      </span>
                      <span className="text-center text-[12px] font-bold">
                        {" "}
                        {section.title.toUpperCase()}{" "}
                      </span>
                      <span className="text-center text-[12px] font-bold">
                        &#x2022; {section.applications?.length}
                      </span>
                      <span className="ml-auto">
                        <img src={`${section.cta}`} className="w-4 h-4" />
                      </span>
                    </div>
                    <div>
                      {section.applications.map((application, index) => (
                        <Draggable
                          key={application.id}
                          draggableId={application.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                              }}
                            >
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
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
}

// for removing warnings in console
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
