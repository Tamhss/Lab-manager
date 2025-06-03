"use client";

import LabReservationForm from '@/components/molecules/LabReservation';
import { useRouter } from 'next/navigation';

const LabReservationPage = () => {
  const router = useRouter();
  return (
    <LabReservationForm onBack={() => router.push('/Reservation')} />
  );
};

export default LabReservationPage;