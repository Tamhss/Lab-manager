"use client";

import DeviceReservationForm from '@/components/molecules/DeviceReservation';
import { useRouter } from 'next/navigation';

const ReservationDevicePage = () => {
  const router = useRouter();
  return (
    <DeviceReservationForm onBack={() => router.push('/Reservation')} />
  );
};

export default ReservationDevicePage;