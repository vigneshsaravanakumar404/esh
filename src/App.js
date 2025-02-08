import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const stringList = [
  "Hallo!",
  "Are you eshhhh?",
  "I should confirm just to be sure",
  "Good luck!",
  "",
];

const RotatingMessages = () => {
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
          setTimeout(() => setIsFinished(false), 3000);
        }
      }
    };

    const typingTimeout = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum, typingSpeed, isFinished]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewContent(true); // Show new content after all messages are displayed
    }, stringList.length * 3000); // Total duration based on number of messages

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {showNewContent ? <NewContent /> : <RotatingMessages />}
    </div>
  );
};

export default Main;
