"use client";

import { GetServerSideProps } from "next";
import React from "react";
import { resetServerContext } from "react-beautiful-dnd";
import {
  ApplicationCardProps,
  KanbanBoardProps,
  section,
} from "@/utils/interfaces";
import ApplicationCard from "./../components/applicationCard";
import ExternalApplicationCard from "./../components/externalApplicationCard";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { sections } from "@/utils/constants";
import SearchBar from "./searchBar";

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  opening,
  currentUser,
}) => {
  const [applicationsData, setApplicationsData] = useState<
    ApplicationCardProps["application"][]
  >(opening.applications);

  const [currentBoard, setCurrentBoard] = useState<section[]>(sections);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    let filteredApplications = applicationsData;
    if (searchQuery.trim() !== "") {
      filteredApplications = applicationsData.filter((application) => {
        const {
          firstName,
          lastName,
          peerlistProfile: { organisation, role },
          contact: { email },
        } = application;

        return (
          firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          organisation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setCurrentBoard((prevBoard) => {
      const updatedData = prevBoard.map((section) => {
        const filteredSectionApplications = filteredApplications.filter(
          (application) => application.currentStatus === section.title
        );

        return {
          ...section,
          applications: filteredSectionApplications,
        };
      });

      return updatedData;
    });
  }, [searchQuery]);

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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="flex flex-wrap lg:flex-nowrap justify-evenly lg:justify-normal px-3 sm:px-6 pb-6 m-auto">
          {currentBoard?.map((section) => {
            return (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      border: `2px solid ${section.bgColor}`,
                    }}
                    // change md:min-w- for the section width on desktop when section.cards.length is 0
                    // change min-w- for the section width on desktop when section.cards.length is 0
                    className={`flex flex-col min-w-full sm:min-w-72 sm:flex-grow gap-1 max-w-full bg-[#FAFBFC] pb-4  m-1 rounded-lg items-center`}
                  >
                    <div
                      style={{ backgroundColor: section.bgColor }}
                      className={`flex gap-1 w-full p-2 items-center rounded-t-md  `}
                    >
                      <span>
                        <img
                          src={`${section.icon}`}
                          className="w-4 h-4 mb-0.5"
                        />
                      </span>
                      <span
                        style={{ color: section.color }}
                        className="text-center text-[12px] font-bold"
                      >
                        {" "}
                        {section.title.toUpperCase()}{" "}
                      </span>
                      <span
                        style={{ color: section.color }}
                        className="text-center text-[12px] font-bold"
                      >
                        &#x2022; {section.applications?.length}
                      </span>
                      {/* change this ml auto for 'md:'  for targeting the onClick - expand/collapse*/}
                      <span className="ml-auto">
                        <img src={`${section.cta}`} className="w-4 h-4" />
                      </span>
                    </div>

                    {section.applications.map((application, index) => (
                      <Draggable
                        key={application.id}
                        draggableId={application.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="w-full px-1 pt-1 md:px-0 md:pt-0"
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
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

// for removing warnings in console
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
