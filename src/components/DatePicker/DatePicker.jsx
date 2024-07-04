import CalendarButton from './CalendarButton/CalendarButton';
import style from './DatePicker.module.css';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar'; // Assuming Calendar component is imported correctly

export default function DatePicker({ date, setDate }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initCalendarDay = new Date(searchParams.get('date') || date);
  const { state } = useOutletContext();

  const normalizedDate = initCalendarDay
    .toLocaleDateString('en-GB')
    .replaceAll('/', '.');

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCloseCalendar = e => {
    if (e.key === 'Escape') setShowCalendar(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseCalendar);
    return () => {
      window.removeEventListener('keydown', handleCloseCalendar);
    };
  }, []);

  const handleCalendar = newDate => {
    const rawDate = new Date(newDate);
    setDate(rawDate);
    setShowCalendar(false);
    setSearchParams({ date: rawDate.toLocaleDateString('en-CA') });
  };

  return (
    <div className={style.DateContainer}>
      <p className={`${style.DateString} ${state === 'pending' ? style.pending : ''}`}>
        {normalizedDate}
      </p>
      <CalendarButton
        showCalendar={showCalendar}
        onClick={handleToggleCalendar}
      />
      {showCalendar && (
        <Calendar
          className={style.MyCalendar} // Ensure correct class name
          maxDate={new Date()}
          onClickDay={handleCalendar}
          value={date}
        />
      )}
    </div>
  );
}

DatePicker.propTypes = {
  date: PropTypes.object.isRequired, // Ensure setDate is required
  setDate: PropTypes.func.isRequired,
};
