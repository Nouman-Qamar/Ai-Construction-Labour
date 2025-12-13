import { useState } from "react";
import { Card, Row, Col, Avatar, Form, Input, Button, message, Upload, Modal, Space, Switch, Divider } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, CameraOutlined, LockOutlined, BellOutlined } from "@ant-design/icons";
import "./profile.css";


const ClientProfilePage = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 555 987 6543",
    address: "456 Client Street, City",
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    emailUpdates: true,
    smsAlerts: false,
    projectNotifications: true,
  });

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        message.success("Profile picture updated");
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue(profileData);
  };

  const handleSave = (values) => {
    setProfileData(values);
    setIsEditing(false);
    message.success("Profile updated successfully");
  };

  const handlePasswordChange = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    message.success("Password changed successfully");
    setIsPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  const handleNotificationChange = (key) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key],
    });
    message.success("Notification preference updated");
  };

  return (
    <div className="profile-container">
      <Card className="profile-main-card">
        <Row gutter={30} className="profile-content">
          {/* IMAGE SECTION */}
          <Col xs={24} md={10} className="profile-image-section">
            <div className="image-wrapper">
              <Avatar
                className="profile-avatar"
                icon={<UserOutlined />}
                src={profileImage}
              />
              {isEditing && (
                <Upload showUploadList={false} onChange={handleImageChange} accept="image/*">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CameraOutlined />}
                    className="camera-button"
                  />
                </Upload>
              )}
            </div>
          </Col>

          {/* INFO SECTION */}
          <Col xs={24} md={14} className="profile-info-section">
            {!isEditing ? (
              <div className="profile-info-display">
                <h1 className="profile-title">Client Profile</h1>

                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <p className="info-value">{profileData.fullName}</p>
                </div>

                <div className="info-item">
                  <span className="info-label">Email</span>
                  <p className="info-value">{profileData.email}</p>
                </div>

                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <p className="info-value">{profileData.phone}</p>
                </div>

                <div className="info-item">
                  <span className="info-label">Address</span>
                  <p className="info-value">{profileData.address}</p>
                </div>

                <div className="button-group">
                  <Button type="primary" className="update-btn" onClick={handleEditClick}>
                    Edit Profile
                  </Button>
                  <Button className="password-btn" icon={<LockOutlined />} onClick={() => setIsPasswordModalVisible(true)}>
                    Change Password
                  </Button>
                </div>
              </div>
            ) : (
              <Form form={form} layout="vertical" onFinish={handleSave} className="profile-form">
                <h1 className="profile-title">Edit Client Profile</h1>

                <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                  <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                  <Input prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>

                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                  <Input prefix={<HomeOutlined />} />
                </Form.Item>

                <div className="button-group">
                  <Button type="primary" htmlType="submit" className="update-btn">
                    Save
                  </Button>
                  <Button className="cancel-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Card>

      {/* NOTIFICATIONS */}
      <Card className="notification-card">
        <div className="notification-header">
          <BellOutlined className="notification-icon" />
          <h2 className="notification-title">Notifications</h2>
        </div>

        <Divider />

        <div className="notification-preferences">
          <div className="preference-item">
            <div className="preference-content">
              <h4 className="preference-label">Email Updates</h4>
              <p className="preference-description">Receive updates via email</p>
            </div>
            <Switch checked={notificationPreferences.emailUpdates} onChange={() => handleNotificationChange("emailUpdates")} />
          </div>

          <div className="preference-item">
            <div className="preference-content">
              <h4 className="preference-label">SMS Alerts</h4>
              <p className="preference-description">Get alerts on your phone</p>
            </div>
            <Switch checked={notificationPreferences.smsAlerts} onChange={() => handleNotificationChange("smsAlerts")} />
          </div>

          <div className="preference-item">
            <div className="preference-content">
              <h4 className="preference-label">Project Notifications</h4>
              <p className="preference-description">Project related updates</p>
            </div>
            <Switch checked={notificationPreferences.projectNotifications} onChange={() => handleNotificationChange("projectNotifications")} />
          </div>
        </div>
      </Card>

      {/* PASSWORD MODAL */}
      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        footer={null}
        centered
        className="password-modal"
      >
        <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange} className="password-form">
          <Form.Item name="newPassword" label="New Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="submit-password-btn">
            Update Password
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ClientProfilePage;

