import { useMemo } from "react";
import styles from "./styles.module.css";
import { FaCloud } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";

const AirplaneLoading = () => {
  const clouds = useMemo(() => {
    const numberOfClouds = 5;
    return Array.from({ length: numberOfClouds }).map((_, i) => {
      const top = Math.random() * 80;
      const duration = 15 + Math.random() * 15;
      const delay = Math.random() * duration;
      const isFront = Math.random() < 0.5;
      return {
        id: i,
        style: {
          top: `${top}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          zIndex: isFront ? 2 : 0,
        },
      };
    });
  }, []);

  return (
    <div className={styles.container}>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1d1d1" />
            <stop offset="50%" stopColor="#8c8c8c" />
            <stop offset="100%" stopColor="#4a4a4a" />
          </linearGradient>
        </defs>
      </svg>

      {clouds.map((cloud) => (
        <FaCloud key={cloud.id} className={styles.cloud} style={cloud.style} />
      ))}
      <div className={styles.planeContainer}>
        <IoIosAirplane className={`${styles.plane}`} />
      </div>
    </div>
  );
};

export default AirplaneLoading;
