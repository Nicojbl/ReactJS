import "./Loading.css";

export const Loading = () => {
  return (
    <div className="loading">
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#ccc"
          fill="none"
          stroke-width="10"
          stroke-dasharray="62.83185307179586 62.83185307179586"
          transform="rotate(287.959 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};
