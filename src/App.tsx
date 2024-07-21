import Modal from "./Modal";
import randomWords from "./RandomWords";
import SpeedoMeter from "./SpeedoMeter";
import LineChart from "./LineChart";
import { useState, useRef, useEffect } from "react";

type UserStatsProps = {
  totalWord: number;
  correct: number;
  wrong: number;
  percent: string;
  session: number;
};

const App = () => {
  const [wordInput, setWordInput] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const playerInputRef = useRef<HTMLInputElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [totalWord, setTotalWord] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [time, setTime] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<TimerHandler | number | null>(null);
  const [isCorrect, setIsCorrect] = useState("");
  const [typedWord, setTypedWord] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userStats, setUserStats] = useState<UserStatsProps[]>([]);

  useEffect(() => {
    handleRandom();
  }, []);

  useEffect(() => {
    if (!isPlaying && totalWord > 0) {
      setUserStats((prev: UserStatsProps[]) => {
        if (
          prev.length > 0 &&
          prev[prev.length - 1].correct === correct &&
          prev[prev.length - 1].totalWord === totalWord &&
          prev[prev.length - 1].wrong === wrong
        ) {
          return prev;
        }
        const newStat = {
          totalWord: totalWord,
          correct: correct,
          wrong: wrong,
          percent: `${Math.round((correct / totalWord) * 100)}%`,
          session: prev.length + 1,
        };
        console.log(newStat);
        const updatedStats = [...prev, newStat];
        return updatedStats;
      });
    }
    console.log({
      totalWord: totalWord,
      correct: correct,
      wrong: wrong,
      percent: `${Math.round((correct / totalWord) * 100)}%`,
      session: userStats.length + 1,
    });
  }, [isPlaying]);

  const handleStart = () => {
    setIsCorrect("");
    setTypedWord([]);
    setTotalWord(0);
    setWrong(0);
    setCorrect(0);
    setTime(10);
    setCurrentWord(0);
    handleRandom();
    playerInputRef.current!.value = "";
    playerInputRef.current?.focus();
    setIsPlaying(true);

    if (intervalRef.current) clearInterval(intervalRef.current as number);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev < 1) {
          clearInterval(intervalRef.current as number);
          playerInputRef.current!.blur();
          setIsPlaying(false);
          setOpenModal(true);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRandom = () => {
    setWordInput([]);
    for (let i = 0; i < 11; i++) {
      const selectedWord =
        randomWords[Math.floor(Math.random() * randomWords.length)];
      setWordInput((prev) => [...prev, selectedWord]);
    }
  };

  const handleCheck = (e: React.KeyboardEvent) => {
    if (e.key === " " && isPlaying) {
      setTypedWord((prev) => [...prev, typed.trim()]);

      if (typed.trim() === wordInput[currentWord].trim()) {
        setCorrect((prev) => prev + 1);
        setIsCorrect("isCorrect");
      } else {
        setWrong((prev) => prev + 1);
        setIsCorrect("isNotCorrect");
      }
      setTotalWord((prev) => prev + 1);
      setCurrentWord((prev) => prev + 1);
      playerInputRef.current!.value = "";
    }
  };

  const handleOpenModal = () => {
    setOpenModal(false);
  };

  if (currentWord === 11) {
    setCurrentWord(0);
    setTypedWord([]);
    setWordInput([]);
    handleRandom();
  }

  return (
    <>
      <div className="max-w-max mx-auto mt-20 sm:w-auto sm:mx-3 sm:mt-20 overflow-x-hidden">
        <div className="relative max-w-[500px] h-[250px] mx-auto sm:!w-[250px] sm:h-[125px]">
          <SpeedoMeter totalWord={totalWord} />
        </div>
        <div className="relative z-10 w-full bg-slate-800 mx-auto p-3 border-2 border-solid border-slate-700 rounded-xl overflow-x-hidden">
          <div className="min-w-full flex justify-between whitespace-nowrap sm:whitespace-normal sm:flex-wrap">
            {wordInput.map((word, i) => (
              <h1
                key={i}
                className={`text-desc px-2 ${
                  currentWord === i ? `bg-slate-900 rounded-md` : ``
                } ${
                  typedWord[i] === wordInput[i]
                    ? `text-emerald-300`
                    : typedWord[i] === undefined
                    ? `!text-neutral-300`
                    : typedWord[i] !== wordInput[i]
                    ? `text-red-300`
                    : ``
                }`}
              >
                {word}
              </h1>
            ))}
          </div>
        </div>
        <div className="relative z-10 max-w-[400px] mx-auto mt-6">
          <input
            type="text"
            className="bg-white p-2 w-full h-full border-solid border-slate-700 rounded-xl focus:border-slate-500"
            ref={playerInputRef}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={handleCheck}
          />
          <div className="absolute top-0 right-0 h-full">
            <button
              className="w-20 h-full text-desc text-center bg-slate-800 border-slate-700 border-solid rounded-e-lg"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
        <div className="relative z-10 w-full mt-6 flex justify-around sm:flex-col sm:items-center sm:gap-4 sm:mt-3">
          <p
            className={`bg-emerald-600 px-4 py-1 flex items-center text-desc text-emerald-100 border-emerald-400 border-solid rounded-xl sm:w-max sm:order-2 ${
              isCorrect === "isCorrect"
                ? `border-emerald-100 shadow-[0_0_8px_#34d399]`
                : ""
            }`}
          >
            Correct Word: {correct}
          </p>
          <p className="text-title sm:order-1">{time}</p>
          <p
            className={`bg-red-600 px-4 py-1 flex items-center text-desc text-red-100 border-red-400 border-solid rounded-xl sm:w-max sm:order-3 ${
              isCorrect === "isNotCorrect"
                ? `border-red-200 shadow-[0_0_8px_#f87171]`
                : ""
            }`}
          >
            Wrong Word: {wrong}
          </p>
        </div>
        <h1 className="relative z-10 text-title mt-12 text-center">
          Statistics
        </h1>
        {userStats && userStats.length > 0 ? (
          <LineChart userStats={userStats} />
        ) : (
          <p>No data available</p>
        )}
      </div>

      <Modal
        totalWord={totalWord}
        correct={correct}
        wrong={wrong}
        openModal={openModal}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default App;
