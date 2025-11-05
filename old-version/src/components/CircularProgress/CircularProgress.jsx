import styles from "./CircularProgress.module.css";

const CircularProgress = ({
  size = 100,
  strokeWidth = 10,
  value = 0,
  max = 100,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const clampedValue = Math.min(Math.max(value, 0), max);
  const progressPercent = (clampedValue / max) * 100;
  const offset = circumference * (1 - progressPercent / 100);

  return (
    <svg width={size} height={size}>
      <circle
        className={styles.bg}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className={styles.progress}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

export default CircularProgress;
