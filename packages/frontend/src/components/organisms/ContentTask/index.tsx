'use client'
import React, { useState } from "react";
import { RightContent } from "../RightContentTask";
import LeftContentTask from "@/components/organisms/LeftContentTask";

export const ContentTask: React.FC = () => {
    return (
        <div className=" flex content-task pt-[10px] relative">
            <LeftContentTask />
            <div className="right-content flex-1 px-[10px] w-full">
                <RightContent />
            </div>
        </div>
    )
}