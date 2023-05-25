import React, { useEffect } from "react";
import "./Preloader.css";
import { preLoaderAnim } from "../../Animations";
export default function Preloader() {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Made by </span>
        <span>Seddik Mehdi </span>
        <span>and</span>
        <span>Capitain Antoine</span>
      </div>
    </div>
  );
}
