import Add from "@/components/atoms/AddToList";
import ScrollToTopButton from "@/components/atoms/BackToTopButton";
import ShiftComponent from "@/components/atoms/ShiftButton";
import ShukeiWrap from "@/components/atoms/ShukeiWrap";
import Calendar from "@/components/molecules/Calendar";
import TableNinji from "@/components/molecules/Tableninji";
import TableKinmu from "@/components/molecules/Tableninjikinmu";
import TableStaff from "@/components/molecules/Tableninjistaff";
import React, { useState, useRef } from "react";

interface ContentProps {
    showTableKinmu: boolean;
    showTableStaff: boolean;
    showShukeiWrap: boolean;
}
export const Content: React.FC<ContentProps> = ({
    showTableKinmu,
    showTableStaff,
    showShukeiWrap
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div ref={contentRef} className='content h-[100vh] overflow-y-auto'>
                <div className='sticky top-0 bg-[#E1E5E6] z-10'>
                    <TableNinji />
                    <Calendar />
                </div>

                <div className="scrollable-body ml-3 h-full ">
                    {showTableKinmu && (
                        <div>
                            <TableKinmu />
                        </div>
                    )}
                    {showTableStaff && (
                        <div>
                            <TableStaff />
                        </div>
                    )}

                    <table>
                        <tbody >
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] pt-2 font-bold cursor-default'>Dr.Andrew Feli</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default pt-2'>V.Hartmann</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default  pt-2'>五十嵐 又左衛門</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2 cursor-default'>あやのこうじ きみ...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2'>A.A.Schwarzeneg...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] pt-2 font-bold cursor-default'>Dr.Andrew Feli</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default pt-2'>V.Hartmann</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default  pt-2'>五十嵐 又左衛門</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2 cursor-default'>あやのこうじ きみ...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2'>A.A.Schwarzeneg...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] pt-2 font-bold cursor-default'>Dr.Andrew Feli</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default pt-2'>V.Hartmann</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default  pt-2'>五十嵐 又左衛門</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2 cursor-default'>あやのこうじ きみ...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2'>A.A.Schwarzeneg...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] pt-2 font-bold cursor-default'>Dr.Andrew Feli</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default pt-2'>V.Hartmann</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default  pt-2'>五十嵐 又左衛門</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2 cursor-default'>あやのこうじ きみ...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2'>A.A.Schwarzeneg...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] pt-2 font-bold cursor-default'>Dr.Andrew Feli</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default pt-2'>V.Hartmann</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default  pt-2'>五十嵐 又左衛門</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2 cursor-default'>あやのこうじ きみ...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2'>A.A.Schwarzeneg...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] pt-2 font-bold cursor-default'>Dr.Andrew Feli</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default pt-2'>V.Hartmann</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default  pt-2'>五十嵐 又左衛門</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2 cursor-default'>あやのこうじ きみ...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2'>A.A.Schwarzeneg...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"></td>{showShukeiWrap && (<ShukeiWrap />)}
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] pt-2 font-bold cursor-default'>Dr.Andrew Feli</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default pt-2'>V.Hartmann</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold cursor-default  pt-2'>五十嵐 又左衛門</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#FFFFFF] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2 cursor-default'>あやのこうじ きみ...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#5C9B9B' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF5F5' borderColor='#5C9B9B' textColor='#5C9B9B' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='1000 1900' color='#DB7C6F' borderColor='#DB7C6F' textColor='#FFFFFF' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#EFF4F8' borderColor='#6597C3' textColor='#6597C3' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#FBF1F0' borderColor='#DB7C6F' textColor='#DB7C6F' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="flex relative">
                                <td className='bg-[#EBF6F8] h-11 w-[280px] border-t-3 border-t-[#BCCBC9] border-r-1 text-[#65849B] pl-[35px] font-bold pt-2'>A.A.Schwarzeneg...</td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px]"><Add /></td>
                                <td className="w-[52px] text-with-border"><ShiftComponent backgroundImage='imageshift/bg_sankaku.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='imageshift/bg_maru.svg/' text='日TR' color='#DA83A5' borderColor='#DA83A5' textColor='#DA83A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='早' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='後❷' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#FBF2F6' borderColor='#D983A5' textColor='#D983A5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='日TR' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F5F5F5' borderColor='#678199' textColor='#678199' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0900 1900' color='#95B17D' borderColor='#95B17D' textColor='#F5F5F5' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td className="w-[52px]"><ShiftComponent backgroundImage='' text='0800 1900' color='#F2F7F1' borderColor='#95B17D' textColor='#95B17D' /></td>
                                <td>{showShukeiWrap && (<ShukeiWrap />)}</td>
                            </tr>
                            <tr className="w-[40px]"><td>''</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <ScrollToTopButton scrollRef={contentRef} buttonStyle="fixed bottom-[300px] w-[32px] h-[32px] bg-[#35A5BD] px-3 py-2 rounded-tr-[6px] rounded-tl-[6px] shadow-lg rotate-90 z-10" />
                <ScrollToTopButton scrollRef={contentRef} buttonStyle="right-0 fixed bottom-[300px] w-[32px] h-[32px] bg-[#35A5BD] px-3 py-2 rounded-br-[6px] rounded-bl-[6px] shadow-lg rotate-90 z-10" />
            </div>
        </div>

    )
}