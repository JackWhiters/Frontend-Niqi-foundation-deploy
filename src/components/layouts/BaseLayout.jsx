import { Outlet } from "react-router-dom";

function BaseLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default BaseLayout;
