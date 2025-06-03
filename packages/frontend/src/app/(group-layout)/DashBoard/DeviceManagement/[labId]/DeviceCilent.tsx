"use client";

import { useParams } from "next/navigation";
import DeviceCategory from '@/components/molecules/DeviceCategory';

export default function DeviceClient() {
  const params = useParams();
  const labId = params.labId as string;

  return <DeviceCategory labId={labId} />;
}
