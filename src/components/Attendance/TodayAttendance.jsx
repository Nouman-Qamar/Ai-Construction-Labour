import { Card, Button } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

export default function TodayAttendance({ today, onCheckIn, onCheckOut, onAbsent }) {
  return (
    <Card title="Today's Attendance" className="today-card">
      <div className="today-actions">
        <Button
          className="checkin-btn"
          icon={<LoginOutlined />}
          onClick={onCheckIn}
          disabled={today.status !== "none"}
        >
          Check In
        </Button>

        <div className="hours-box">
          <ClockCircleOutlined />
          <h2>{today.hours}h</h2>
          <p>Hours Today</p>
        </div>

        <div className="action-right">
          <Button
            danger
            className="absent-btn"
            icon={<CloseCircleOutlined />}
            onClick={onAbsent}
            disabled={today.status !== "none"}
          >
            Mark Absent
          </Button>

          <Button
            className="checkout-btn"
            icon={<LogoutOutlined />}
            onClick={onCheckOut}
            disabled={today.status !== "present"}
          >
            Check Out
          </Button>
        </div>
      </div>
    </Card>
  );
}
