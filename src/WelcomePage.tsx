import { motion } from "framer-motion";

type WelcomePageProps = {
  movePage: () => void;
};

const WelcomePage = ({ movePage }: WelcomePageProps) => {
  return (
    <motion.div
      className="w-max mx-auto self-center text-center"
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, type: "spring" },
      }}
    >
      <h1 className="text-title">Welcome To Type Fast!</h1>
      <p className="mt-2 text-desc">Are you ready to Improve Your Typing?</p>
      <button onClick={movePage} className="outline-button mt-6 ">
        Continue
      </button>
    </motion.div>
  );
};

export default WelcomePage;
