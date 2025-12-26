import { Card, Row, Col } from "antd";

export default function MonthlySummary({ monthly }) {
  return (
    <Card title="Monthly Attendance Summary">
      <Row gutter={16}>
        <Col span={8}>
          <div className="summary-item summary-present">
            <div className="summary-value">{monthly.present}</div>
            <div className="summary-label">Days Present</div>
          </div>
        </Col>

        <Col span={8}>
          <div className="summary-item summary-absent">
            <div className="summary-value">{monthly.absent}</div>
            <div className="summary-label">Days Absent</div>
          </div>
        </Col>

        <Col span={8}>
          <div className="summary-item summary-hours">
            <div className="summary-value">{monthly.totalHours}h</div>
            <div className="summary-label">Total Hours</div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
