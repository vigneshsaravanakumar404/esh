import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const stringList = [
  "Hello Eshhhhhhh!",
  "Happy Valentine's Day!",
  "Do you want to be my valentine",
];

const useConfetti = () => {
  useEffect(() => {
    // Start confetti when the component mounts
    const duration = 60 * 60 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      zIndex: 0,
      startVelocity: 30,
      shapes: ["heart"],
      colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      window.confetti({
        ...defaults,
        particleCount: 1,
        scalar: 5,
        origin: { x: Math.random(), y: Math.random() * 0.1 },
      });
    }, 150);

    return () => clearInterval(interval); // Stop confetti when component unmounts
  }, []);
};

const RotatingMessages = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const typingSpeed = isDeleting ? 30 : 50;

  useEffect(() => {
    if (isFinished) return;

    const handleType = () => {
      const fullText = stringList[loopNum % stringList.length];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIndex((prevIndex) => (prevIndex + 1) % stringList.length);

        if (loopNum + 1 === stringList.length) {
          setIsFinished(true);
          setTimeout(() => {
            setIsFinished(false);
            onFinish(); // Notify parent component that rotation is done
          }, 3000);
        }
      }
    };

    const typingTimeout = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum, typingSpeed, isFinished, onFinish]);

  useConfetti();

  return (
    <AnimatePresence>
      <motion.div
        key={index}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text"
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
};

const NewContent = () => {
  return (
    <div className="new-content">
      <h1>This is the new content!</h1>
      <p>You have successfully viewed all the messages.</p>
    </div>
  );
};

const Main = () => {
  const [showNewContent, setShowNewContent] = useState(false);

  return (
    <div className="container">
      {showNewContent ? (
        <NewContent />
      ) : (
        <RotatingMessages onFinish={() => setShowNewContent(true)} />
      )}
    </div>
  );
};

export default Main;
