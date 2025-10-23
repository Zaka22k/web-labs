import { lazy, Suspense } from "react";
import { Routes, Route, useLocation, useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "components/PageTransition";
import LoadState from "components/LoadState";
import { useData } from "context/DataContext";

const HomePage = lazy(() => import("pages/HomePage"));
const LabPage = lazy(() => import("pages/LabPage/LabPage"));
const TaskPage = lazy(() => import("pages/TaskPage"));
const TaskPreview = lazy(() => import("pages/TaskPage/TaskPreview"));
const LabMain = lazy(() => import("pages/LabPage/LabMain"));

const AppRouter = () => {
  const location = useLocation();
  const isTaskRoute = useMatch("/labs/:labId/tasks/:taskId");
  const { loading: dataLoading } = useData();

  const SmartFallback = () => <LoadState />;

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<SmartFallback />}>
        {dataLoading ? (
          <SmartFallback />
        ) : (
          <Routes
            location={location}
            key={isTaskRoute ? "lab-inner" : location.pathname}
          >
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route path="/labs/:labId" element={<LabPage />}>
              <Route index element={<LabMain />} />
            </Route>
            <Route path="/labs/:labId" element={<TaskPage />}>
              <Route path="tasks/:taskId" element={<TaskPreview />} />
            </Route>
          </Routes>
        )}
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRouter;
