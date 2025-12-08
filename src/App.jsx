import Dashboard from "./pages/Dashboard";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Api from "./pages/Api";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Subscription from "./pages/Subscription";
import RootLayout from "./Layout/RootLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard section="total" />} />

        {/* Dashboard Navs */}
        <Route
          path="dashboard/by-status"
          element={<Dashboard section="status" />}
        />
        <Route
          path="dashboard/by-total"
          element={<Dashboard section="total" />}
        />
        <Route
          path="dashboard/tasks-due"
          element={<Dashboard section="due" />}
        />
        <Route
          path="dashboard/extra-tasks"
          element={<Dashboard section="extra" />}
        />
        <Route
          path="dashboard/tasks-completed"
          element={<Dashboard section="completed" />}
        />

        {/* Sidebar Navs */}
        <Route path="tasks" element={<Tasks />} />
        <Route path="users" element={<Users />} />
        <Route path="apis" element={<Api />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
