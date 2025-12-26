import { useEffect, useState } from "react";

export const useAttendance = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    today: {
      status: "none", // none | present | absent
      hours: 0,
      checkIn: null,
      checkOut: null
    },
    monthly: {
      present: 22,
      absent: 2,
      totalHours: 187
    },
    recent: [
      { date: "Dec 01", hours: 9, status: "present" },
      { date: "Dec 02", hours: 8.5, status: "present" },
      { date: "Dec 06", hours: 0, status: "absent" }
    ]
  });

  useEffect(() => {
    // Future API call here
    setLoading(false);
  }, []);

  const checkIn = () => {
    setData(prev => ({
      ...prev,
      today: { ...prev.today, status: "present" }
    }));
  };

  const checkOut = () => {
    setData(prev => ({
      ...prev,
      today: { ...prev.today, hours: 8 }
    }));
  };

  const markAbsent = () => {
    setData(prev => ({
      ...prev,
      today: { status: "absent", hours: 0 }
    }));
  };

  return { data, loading, checkIn, checkOut, markAbsent };
};
