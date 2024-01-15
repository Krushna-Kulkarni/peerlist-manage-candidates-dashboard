"use client";
import { users } from "@/data/data";
import { navigation, supportLinks } from "@/utils/constants";
import { PeerlistLogo, loom, projects, rightArrow } from "@/utils/icons";
import { SidebarProps } from "@/utils/interfaces";
import Link from "next/link";
import React, { useState } from "react";

export const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [navitems, setNavItems] = useState(navigation);
  const { firstName, profilePicture } = currentUser;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="my-3">
        <Link href="#">
          <img src={`${PeerlistLogo}`} className="h-8" />
        </Link>
      </div>
      <div className="flex flex-col justify-between pr-5 h-[378px] mt-8">
        {navitems.map((item, i) => {
          return (
            <div key={i} className="group">
              <Link
                className="flex  items-center gap-2 py-2.5 "
                href={item.link}
              >
                <span>
                  <img src={`${item.icon}`} className="w-5 h-5" />
                </span>
                <span
                  style={{
                    fontWeight: item.isActive ? 600 : 400,
                  }}
                  className="text-[16px] font-[#0D0D0D] font-normal transition-transform group-hover:translate-x-1 group-hover:font-bold"
                >
                  {item.title}
                </span>
              </Link>
            </div>
          );
        })}
        <div>
          <div className="flex gap-1.5 items-center mt-5 py-2.5 group ">
            <span className="group-hover:cursor-pointer">
              <img src={`${profilePicture}`} className="w-6 h-6 " />
            </span>
            <span className="text-[16px] mt-0.5 transition-transform group-hover:translate-x-1 group-hover:cursor-pointer">
              {firstName}
            </span>
          </div>
          <div className="flex gap-1.5 items-center py-2 group">
            <span className="group-hover:cursor-pointer">
              <img src={`${loom}`} className="w-6 h-6" />
            </span>
            <div className="flex flex-col hover:cursor-pointer">
              <span className="text-[14px] transition-transform group-hover:translate-x-1 group-hover:cursor-pointer">
                Loom
              </span>
              <div className="text-[10px] flex items-center gap-1">
                Manage jobs, teams, & more
                <span>{<img src={`${rightArrow}`} className="w-2 h-2" />}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[188px] flex flex-col justify-center gap-1 mt-auto pb-1">
        <p className="leading-[0.8em]">
          {supportLinks.map((link, index) => (
            <a
              key={index}
              href={`${link.link}`}
              className="text-[10px] text-[#444D56] font-semibold hover:underline"
            >
              {`•`}
              <span className="hover:underline">{link.title} </span>
            </a>
          ))}
        </p>
        <div className="text-[10px] text-[#444D56]">
          © 2023 Peerlist Inc.<div></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
