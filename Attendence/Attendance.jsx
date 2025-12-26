import { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./Attendance.css";

const Attendance = () => {
  /* ================= CHECK IN / OUT ================= */
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [displayTime, setDisplayTime] = useState("0h 0m");

  useEffect(() => {
    let interval;
    if (checkInTime && !checkOutTime) {
      interval = setInterval(() => {
        const diff = new Date() - checkInTime;
        updateTime(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkInTime, checkOutTime]);

  const updateTime = (diff) => {
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setDisplayTime(`${h}h ${m}m`);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  /* ================= RECENT DATA ================= */
  const recentData = [
    { date: "Dec 01", hours: "9h", status: "present" },
    { date: "Dec 02", hours: "8.5h", status: "present" },
    { date: "Dec 03", hours: "9h", status: "present" },
    { date: "Dec 04", hours: "8h", status: "present" },
    { date: "Dec 05", hours: "9h", status: "present" },
    { date: "Dec 06", hours: "-", status: "absent" },
    { date: "Dec 07", hours: "-", status: "absent" },
    { date: "Dec 08", hours: "8.5h", status: "present" },
    { date: "Dec 09", hours: "9h", status: "present" },
    { date: "Dec 10", hours: "8h", status: "present" },
    { date: "Dec 11", hours: "9h", status: "present" },
    { date: "Dec 12", hours: "8.5h", status: "present" },
  ];

  return (
    <div>
      <div className="Attendance-header">
        <h4 className="Attendance-header-main">Attendance</h4>
        <p>Track your daily attendance and work hours</p>
      </div>
      <div className="attendance-page">
        {/* ========= TODAY CARD ========= */}
        <Card className="attendance-card">
          <h3>Today's Attendance</h3>

          <div className="attendance-body">
            <div className="action-box">
              <button
                className="check-in"
                onClick={() => setCheckInTime(new Date())}
                disabled={checkInTime}
              >
                Check In
              </button>
              {checkInTime && (
                <span className="time-text">
                  Entered: {formatTime(checkInTime)}
                </span>
              )}
            </div>

            <div className="hours-box">
              <h2>{displayTime}</h2>
              <p>Hours Today</p>
            </div>

            <div className="action-box">
              <button
                className="check-out"
                onClick={() => {
                  const out = new Date();
                  setCheckOutTime(out);
                  updateTime(out - checkInTime);
                }}
                disabled={!checkInTime || checkOutTime}
              >
                Check Out
              </button>
              {checkOutTime && (
                <span className="time-text">
                  Exited: {formatTime(checkOutTime)}
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* ========= MONTHLY SUMMARY ========= */}
        <Card className="attendance-card">
          <div className="attendance-header">
            <CalendarOutlined className="icon-calendar" />
            <div>
              <h3>Monthly Attendance Summary</h3>
              <p>December 2025</p>
            </div>
          </div>

          <Row gutter={16}>
            <Col span={8}>
              <div className="summary-box summary-present">
                <h2>22</h2>
                <p>Days Present</p>
                <CheckCircleOutlined className="icon-green" />
              </div>
            </Col>

            <Col span={8}>
              <div className="summary-box summary-absent">
                <h2>2</h2>
                <p>Days Absent</p>
                <CloseCircleOutlined className="icon-red" />
              </div>
            </Col>

            <Col span={8}>
              <div className="summary-box summary-hours">
                <h2>187h</h2>
                <p>Total Hours</p>
                <ClockCircleOutlined className="icon-blue" />
              </div>
            </Col>
          </Row>

          <h4 className="recent-title">Recent Attendance</h4>

          <Row gutter={[16, 16]}>
            {recentData.map((item, i) => (
              <Col span={4} key={i}>
                <div
                  className={`recent-box ${
                    item.status === "present"
                      ? "recent-present"
                      : "recent-absent"
                  }`}
                >
                  <p className="recent-date">{item.date}</p>
                  <div className="recent-hours">
                    {item.status === "present" ? (
                      <CheckCircleOutlined className="icon-green" />
                    ) : (
                      <CloseCircleOutlined className="icon-red" />
                    )}
                    <span>{item.hours}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
