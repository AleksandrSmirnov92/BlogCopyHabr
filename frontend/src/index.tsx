import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import userIdContext from "./components/Context/Context";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
interface Context {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
const Main: React.FC = () => {
  const [userId, setUserId] = useState<Context>(
    JSON.parse(localStorage.getItem("userId")!)
  );
  return (
    <userIdContext.Provider value={{ userId, setUserId }!}>
      <App />
    </userIdContext.Provider>
  );
};

root.render(<Main />);
