import { Card, Tag } from "antd";

export default function RecentAttendance({ recent }) {
  return (
    <Card title="Recent Attendance">
      <div className="recent-grid">
        {recent.map((item, i) => (
          <div
            key={i}
            className={`recent-day ${
              item.status === "present" ? "recent-present" : "recent-absent"
            }`}
          >
            <strong>{item.date}</strong>
            <Tag color={item.status === "present" ? "green" : "red"}>
              {item.status === "present" ? `${item.hours}h` : "Absent"}
            </Tag>
          </div>
        ))}
      </div>
    </Card>
  );
}
