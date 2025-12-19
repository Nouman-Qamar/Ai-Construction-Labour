import { Flex, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import { MdDashboard, MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlineProject } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const selectedKey = (() => {
    if (path === "/" || path === "/dashboard") return "1";
    if (path === "/myjob") return "2";
    if (path === "/attendance") return "3";
    if (path === "/contractor/profile") return "8";

    return "1";
  })();

  const openKeys = (() => {
    if (selectedKey.startsWith("2")) return ["2"];
    if (selectedKey.startsWith("3")) return ["3"];
    return [];
  })();

  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <MdDashboard size={28} />
        </div>
      </Flex>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={openKeys}
        className="menu-bar"
        style={{ background: "#FFF9F2" }}
        items={[
          {
            key: "1",
            icon: <MdDashboard />,
            label: <Link to="/">Dashboard</Link>,
          },

          {
            key: "2",
            icon: <MdOutlineManageAccounts />,
            label: <Link to="/Jobs">My Job</Link>,
          },

          {
            key: "3",
            icon: <AiOutlineProject />,
            label: <Link to="/attendance">Attendance</Link>,
          },

          {
            key: "8",
            icon: <RiUserSettingsLine />,
            label: <Link to="/Client/profile">Client Profile</Link>,
          },
        ]}
      />
    </>
  );
}

export default Sidebar;
