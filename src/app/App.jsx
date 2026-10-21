import { tokens } from "@fluentui/react-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider, NotifyProvider, AuthProvider } from "context";
import { ProtectedRoute, PageLoader } from "components";
import { Suspense, lazy } from "react";

const TaskPage = lazy(() => import("pages/TaskPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const AuthPage = lazy(() => import("pages/AuthPage"));
const Dashboard = lazy(() => import("pages/Dashboard"));

function App() {
  return (
    <AuthProvider>
      <NotifyProvider>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: tokens.colorNeutralBackground4,
          }}
        >
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<ProtectedRoute protect={false} />} />
                <Route path="/auth" element={<AuthPage />} />

                <Route
                  path="/dashboard"
                  element={
                    <DataProvider>
                      <Dashboard />
                    </DataProvider>
                  }
                >
                  <Route index element={<HomePage />} />
                  <Route path=":labId/:taskId" element={<TaskPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </NotifyProvider>
    </AuthProvider>
  );
}

export default App;
