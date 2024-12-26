import { ButtonRightContent } from "@/components/molecules/ButtonRightContent";
import { NinjiSyukei } from "@/components/molecules/NinjiSyukei";
import { SyukeiWrap } from "@/components/molecules/SyukeiWrap";
import React, { useState } from "react";
import { HacoTable } from "../HacoTable";
import { useHeaderContext } from "@/components/Context";


export const RightContent: React.FC = () => {
    const [showNinjiSyusei, setShowNinjiSyusei] = useState(true);
    const { headerVisible } = useHeaderContext();
    const toggleNinjiSyusei = () => {
        setShowNinjiSyusei(!showNinjiSyusei);
    };
    return (
        <div>
            {headerVisible && (
                <>
                    <SyukeiWrap onToggleNinjiSyusei={toggleNinjiSyusei} />
                    {showNinjiSyusei && <NinjiSyukei />}
                </>
            )}
            <ButtonRightContent />
            <HacoTable />
        </div>
    )

}