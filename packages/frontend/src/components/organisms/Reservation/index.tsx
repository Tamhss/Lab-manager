"use client";

import { CalendarClock, Monitor } from 'lucide-react';
import { useState } from 'react';
import DeviceReservationForm from '../../molecules/DeviceReservation';
import { motion } from 'framer-motion';
import LabReservationForm from '@/components/molecules/LabReservation';
import LabRegulation from '@/components/atom/Regulations';
import { Button } from 'antd';

const BookingCards = () => {
  const [selected, setSelected] = useState<'device' | 'lab' | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="absolute top-6 right-6">
        <Button
          onClick={togglePopup}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Quy Định Phòng Lab
        </Button>
      </div>

      {/* Thẻ chứa 2 card */}
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

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={togglePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              ✕
            </button>
            <LabRegulation />
          </div>
        </div>
      )}
    </div>

  );
};

export default BookingCards;