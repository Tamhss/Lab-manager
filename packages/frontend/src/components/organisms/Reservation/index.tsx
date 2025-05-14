"use client";

import { CalendarClock, Monitor } from 'lucide-react';
import { useState } from 'react';
import DeviceReservationForm from '../../molecules/DeviceReservation';
import { motion } from 'framer-motion';
import LabReservationForm from '@/components/molecules/LabReservation';

const BookingCards = () => {
  const [selected, setSelected] = useState<'device' | 'lab' | null>(null);
  const handleBack = () => {
    setSelected(null);
  };
  const cardVariants = {
    initial: {
      scale: 1,
      y: 20,
      opacity: 0
    },
    animate: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  if (selected === 'device') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <DeviceReservationForm onBack={handleBack} />
      </motion.div>
    );
  }

  if (selected === 'lab') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LabReservationForm onBack={handleBack} />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="flex gap-6 max-w-4xl">
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          onClick={() => setSelected('device')}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-56 cursor-pointer
                    border border-indigo-100 hover:border-indigo-300 transition-colors duration-200"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-4 mb-5">
            <CalendarClock className="text-white w-12 h-12" />
          </div>
          <h3 className="text-lg font-semibold text-indigo-900 tracking-tight">
            Đặt lịch thiết bị
          </h3>
          <p className="text-sm text-indigo-600 mt-2 text-center">
            Đặt trước thiết bị nhanh chóng
          </p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          onClick={() => setSelected('lab')}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-56 cursor-pointer
                    border border-indigo-100 hover:border-indigo-300 transition-colors duration-200"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-4 mb-5">
            <Monitor className="text-white w-12 h-12" />
          </div>
          <h3 className="text-lg font-semibold text-indigo-900 tracking-tight">
            Đặt lịch phòng lab
          </h3>
          <p className="text-sm text-indigo-600 mt-2 text-center">
            Đảm bảo không gian làm việc
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingCards;