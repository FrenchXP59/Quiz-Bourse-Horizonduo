export default function Timer({ seconds, icon }) {
  return (
    <div className="flex flex-col items-center my-4">
      <img
        src={icon}
        alt="Timer"
        className="
          w-16 h-16
          sm:w-20 sm:h-20
          md:w-28 md:h-28
          max-w-[100px] max-h-[100px]
          min-w-[48px] min-h-[48px]
          mb-2
        "
        style={{ background: "none" }}
        draggable={false}
      />
      <span
        className={`
          font-mono text-3xl sm:text-4xl md:text-5xl font-bold mt-2 transition-all duration-150
          ${seconds <= 5 ? "text-red-600" : "text-gray-700"}
          ${seconds <= 3 ? "animate-pulse" : ""}
        `}
      >
        {seconds}
      </span>
    </div>
  );
}