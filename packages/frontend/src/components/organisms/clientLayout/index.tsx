// components/ClientLayout.tsx
'use client';

import React from 'react';
import { HeaderProvider } from '@/components/Context';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return <HeaderProvider>{children}</HeaderProvider>;
};

export default ClientLayout;
