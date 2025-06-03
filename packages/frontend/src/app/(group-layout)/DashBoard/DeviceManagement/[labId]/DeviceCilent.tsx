"use client";

import { useParams } from "next/navigation";
import Device from "@/components/molecules/Device";

export default function DeviceClient() {
  const params = useParams();
  const labId = params.labId as string;

    return <Device labId={labId} />;
}
