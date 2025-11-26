import { tokens } from "@fluentui/react-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import { TaskPage, HomePage, AuthPage } from "pages";
import { DataProvider, NotifyProvider, AuthProvider } from "context";
import { AuthGuard } from "components";

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthGuard requireAuth={false} />} />
              <Route path="/auth" element={<AuthPage />} />

              <Route element={<AuthGuard requireAuth={true} />}>
                <Route
                  element={
                    <DataProvider>
                      <MainLayout />
                    </DataProvider>
                  }
                >
                  <Route path="/dashboard" element={<HomePage />} />
                  <Route
                    path="/dashboard/:labId/:taskId"
                    element={<TaskPage />}
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </NotifyProvider>
    </AuthProvider>
  );
}

export default App;
