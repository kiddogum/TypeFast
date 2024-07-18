type SpeedoMeterType = {
  totalWord: number;
};

const SpeedoMeter = ({ totalWord }: SpeedoMeterType) => {
  return (
    <div className="absolute w-[500px] aspect-square sm:w-full">
      <div className="speedometer relative w-full aspect-square p-20 rounded-full sm:p-10"></div>
      <div
        className="needle transition-all duration-300"
        style={{ rotate: `${Math.min(180, 180 * (totalWord / 100))}deg` }}
      ></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-title">{totalWord}</h1>
        <h1 className="text-title">WPM</h1>
      </div>
    </div>
  );
};

export default SpeedoMeter;
