import { useState } from "react";
import WelcomePage from "./WelcomePage";
import MainContent from "./MainContent";

const App = () => {
  const [onWelcome, setOnWelcome] = useState(true);

  const movePage = () => {
    setOnWelcome((prev) => !prev);
  };
  return (
    <div className="w-full min-h-dvh flex overflow-x-hidden">
      {onWelcome && <WelcomePage movePage={movePage} />}
      {!onWelcome && <MainContent />}
    </div>
  );
};

export default App;
