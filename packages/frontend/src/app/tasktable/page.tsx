import { ContentTask } from '@/components/organisms/ContentTask';
import { HeaderTask } from '@/components/organisms/HeaderTask';
import { Props } from '@/types';
import React, { useState } from 'react';
const Page = async ({ params }: Props) => {
    return (
        <div className="overflow-y-scroll h-screen font-noto">
            <HeaderTask />
            <ContentTask />
        </div>
    );
};

export default Page;