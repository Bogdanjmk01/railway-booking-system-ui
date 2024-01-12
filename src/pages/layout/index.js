import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
      <div style={{ display: "flex", width: '100%' }}>
          <Sidebar />
          <div style={{ flex: 1, marginLeft: '20px' }}>
              <Outlet />
          </div>
      </div>
  );
};