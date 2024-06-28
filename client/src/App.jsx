import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full p-6">
      <Outlet />
    </div>
  );
};
export default App