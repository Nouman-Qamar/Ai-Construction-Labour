import { useState } from "react";
import { Space, message } from "antd";
import TodayAttendance from "./TodayAttendance";
import MonthlySummary from "./MonthlySummary";
import RecentAttendance from "./RecentAttendance";
import "./attendance.css";

export default function AttendanceDashboard() {
  const [today, setToday] = useState({
    status: "none", 
    hours: 0,
    checkInTime: null
  });

  const [monthly, setMonthly] = useState({
    present: 22,
    absent: 2,
    totalHours: 187
  });

  const [recent, setRecent] = useState([
    { date: "Dec 01", hours: 9, status: "present" },
    { date: "Dec 02", hours: 8.5, status: "present" },
    { date: "Dec 06", hours: 0, status: "absent" }
  ]);

  

  const handleCheckIn = () => {
    if (today.status !== "none") return;

    setToday({
      status: "present",
      hours: 0,
      checkInTime: new Date()
    });

    message.success("Checked in successfully");
  };

  const handleCheckOut = () => {
    if (today.status !== "present") return;

    const workedHours = 8;

    setToday(prev => ({
      ...prev,
      hours: workedHours
    }));

    setMonthly(prev => ({
      ...prev,
      present: prev.present + 1,
      totalHours: prev.totalHours + workedHours
    }));

    setRecent(prev => [
      {
        date: "Today",
        hours: workedHours,
        status: "present"
      },
      ...prev
    ]);

    message.success("Checked out successfully");
  };

  const handleAbsent = () => {
    if (today.status !== "none") return;

    setToday({
      status: "absent",
      hours: 0,
      checkInTime: null
    });

    setMonthly(prev => ({
      ...prev,
      absent: prev.absent + 1
    }));

    setRecent(prev => [
      {
        date: "Today",
        hours: 0,
        status: "absent"
      },
      ...prev
    ]);

    message.warning("Marked as absent");
  };

  return (
    <Space direction="vertical" size="large" className="attendance-container">
      <TodayAttendance
        today={today}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
        onAbsent={handleAbsent}
      />

      <MonthlySummary monthly={monthly} />
      <RecentAttendance recent={recent} />
    </Space>
  );
}
