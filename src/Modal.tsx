import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  totalWord: number;
  correct: number;
  wrong: number;
  openModal: boolean;
  handleOpenModal: () => void;
};

const Modal = ({
  totalWord,
  correct,
  wrong,
  openModal,
  handleOpenModal,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          className="modal-bg fixed z-50 top-0 left-0 w-full h-screen"
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-max p-8 backdrop-blur-lg border-slate-400 border-solid border-4 rounded-xl sm:p-4 sm:w-4/5">
            <button
              className="absolute top-3 right-4 text-2xl font-bold text-neutral-300"
              onClick={handleOpenModal}
            >
              X
            </button>
            <h1 className="text-title text-center">Time's Up!</h1>
            <hr className="small-divide mt-8" />
            <div className="flex my-2 mx-4 justify-between sm:mx-1">
              <p className="text-desc">Total Words:</p>
              <p className="text-desc">{totalWord}</p>
            </div>
            <hr className="small-divide" />
            <div className="flex my-2 mx-4 justify-between sm:mx-1">
              <p className="text-desc">
                <span className="text-emerald-400">Correct</span> Words:
              </p>
              <p className="text-desc">{correct}</p>
            </div>
            <hr className="small-divide" />
            <div className="flex my-2 mx-4 justify-between sm:mx-1">
              <p className="text-desc">
                <span className="text-red-400">Wrong</span> Words:
              </p>
              <p className="text-desc">{wrong}</p>
            </div>
            <hr className="small-divide" />
            <div className="flex my-2 mx-4 justify-between sm:mx-1">
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
  );
};

export default Modal;
