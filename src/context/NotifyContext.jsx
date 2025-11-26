import * as React from "react";
import {
  useId,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";

const NotifyContext = React.createContext({
  notify: () => {},
  notifySuccess: () => {},
  notifyError: () => {},
  notifyWarning: () => {},
  notifyInfo: () => {},
});

export const NotifyProvider = ({ children }) => {
  const toasterId = useId("app-toaster");
  const { dispatchToast } = useToastController(toasterId);

  const notify = ({ title, subtitle, intent = "info" }) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {subtitle && <ToastBody>{subtitle}</ToastBody>}
      </Toast>,
      { intent }
    );
  };

  const notifySuccess = ({ title = "Успех", info = "" }) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {info && <ToastBody>{info}</ToastBody>}
      </Toast>,
      { intent: "success" }
    );
  };

  const notifyError = ({ title = "Ошибка", info = "" }) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {info && <ToastBody>{info}</ToastBody>}
      </Toast>,
      { intent: "error" }
    );
  };

  const notifyWarning = ({ title = "Предупреждение", info = "" }) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {info && <ToastBody>{info}</ToastBody>}
      </Toast>,
      { intent: "warning" }
    );
  };

  const notifyInfo = ({ title = "Ошибка", info = "" }) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {info && <ToastBody>{info}</ToastBody>}
      </Toast>,
      { intent: "info" }
    );
  };

  return (
    <NotifyContext.Provider
      value={{ notify, notifySuccess, notifyError, notifyWarning, notifyInfo }}
    >
      <Toaster toasterId={toasterId} />
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => React.useContext(NotifyContext);
