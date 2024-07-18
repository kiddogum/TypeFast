import randomWords from "./RandomWords";
import SpeedoMeter from "./SpeedoMeter";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MainContent = () => {
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

  useEffect(() => {
    handleRandom();
  }, []);

  const handleStart = () => {
    setIsCorrect("");
    setTypedWord([]);
    setTotalWord(0);
    setWrong(0);
    setCorrect(0);
    setTime(10);
    setCurrentWord(0);
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

  if (currentWord === 11) {
    setCurrentWord(0);
    setTypedWord([]);
    setWordInput([]);
    handleRandom();
  }

  return (
    <>
      <div className="max-w-max mx-auto mt-20">
        <div className="relative max-w-[500px] h-[250px] mx-auto">
          <SpeedoMeter totalWord={totalWord} />
        </div>
        <div className="relative z-10 w-full bg-slate-800 mx-auto p-3 border-2 border-solid border-slate-700 rounded-xl overflow-x-hidden">
          <div className="min-w-full flex justify-between whitespace-nowrap">
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
        <div className="relative z-10 w-full mt-6 flex justify-around">
          <p
            className={`bg-emerald-600 px-4 py-1 text-desc text-emerald-100 border-emerald-400 border-solid rounded-xl ${
              isCorrect === "isCorrect"
                ? `border-emerald-100 shadow-[0_0_8px_#34d399]`
                : ""
            }`}
          >
            Correct Word: {correct}
          </p>
          <p className="text-title">{time}</p>
          <p
            className={`bg-red-600 px-4 py-1 text-desc text-red-100 border-red-400 border-solid rounded-xl ${
              isCorrect === "isNotCorrect"
                ? `border-red-200 shadow-[0_0_8px_#f87171]`
                : ""
            }`}
          >
            Wrong Word: {wrong}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {openModal && (
          <motion.div
            className="modal-bg absolute z-50 top-0 left-0 w-full h-screen"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              y: -100,
              transition: {
                duration: 0.3,
              },
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-max p-8 backdrop-blur-lg border-slate-400 border-solid border-4 rounded-xl">
              <button
                className="absolute top-3 right-4 text-2xl font-bold text-neutral-300"
                onClick={() => setOpenModal((prev) => !prev)}
              >
                X
              </button>
              <h1 className="text-title text-center">Time's Up!</h1>
              <hr className="small-divide mt-8" />
              <div className="flex my-2 mx-4 justify-between ">
                <p className="text-desc">Total Words:</p>
                <p className="text-desc">{totalWord}</p>
              </div>
              <hr className="small-divide" />
              <div className="flex my-2 mx-4 justify-between ">
                <p className="text-desc">
                  <span className="text-emerald-400">Correct</span> Words:
                </p>
                <p className="text-desc">{correct}</p>
              </div>
              <hr className="small-divide" />
              <div className="flex my-2 mx-4 justify-between ">
                <p className="text-desc">
                  <span className="text-red-400">Wrong</span> Words:
                </p>
                <p className="text-desc">{wrong}</p>
              </div>
              <hr className="small-divide" />
              <div className="flex my-2 mx-4 justify-between ">
                <p className="text-desc">Correct %:</p>
                <p className="text-desc">
                  {Math.round((correct / totalWord) * 100)}%
                </p>
              </div>
              <hr className="small-divide" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainContent;
