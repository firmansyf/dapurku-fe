'use client'

import moment from "moment"
import React, { useState } from "react"
import { Calendar } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

type DatePickerProps = {
  label?: string;
  onChange?: (date: Date) => void;
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  onChange,
  initialDate,
  minDate,
  maxDate,
  className = 'py-2'
}) => {
  const [date, setDate] = useState<Date>(initialDate as Date)
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false)

  const handleSelect = (selectedDate: Date) => {
    setDate(selectedDate)
    setIsDateSelected(true)
    setShowPicker(false)
    if (onChange) {
      onChange(selectedDate)
    }
  }

  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type="text"
        value={isDateSelected || date ? moment(date).format("YYYY-MM-DD") : ""}
        placeholder="Pilih tanggal"
        readOnly
        onClick={() => setShowPicker((prev) => !prev)}
        className={`w-full ${className} border border-gray-300 rounded-md shadow-sm text-base outline-none cursor-pointer`}
      />
      {showPicker && (
        <div className="absolute z-50 mt-2 bg-white rounded-md shadow-lg">
          <Calendar
            date={date}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            color="#3b82f6"
          />
        </div>
      )}
    </div>
  );
};


export default DatePicker