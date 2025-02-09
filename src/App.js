import "./App.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Tooltip } from "primereact/tooltip";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

/* Constants */
const stringList = [
  "Hello Eshhhhhhh!",
  "Happy Valentine's Day!",
  "It's time for the big question",
];

/**
 * Custom hook to start a confetti animation when the component mounts.
 * The confetti animation lasts for 1 hour and displays heart-shaped particles
 * in various shades of pink.
 *
 * @function useConfetti
 * @returns {void}
 *
 * @example
 * // Usage in a functional component
 * const MyComponent = () => {
 *   useConfetti();
 *   return <div>Celebrate!</div>;
 * };
 */
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

/**
 * RotatingMessages component displays a series of messages that rotate with a typing effect.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onFinish - Callback function to notify the parent component when the rotation is done.
 *
 * @example
 * <RotatingMessages onFinish={() => console.log('Rotation finished')} />
 *
 * @returns {JSX.Element} The rendered component.
 */
const RotatingMessages = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const typingSpeed = isDeleting ? 1 : 1; //! CHANGE TO 30 : 50

  useEffect(() => {
    if (isFinished) return;

    const handleType = () => {
      const fullText = stringList[loopNum % stringList.length];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1); //! CHANGE TO 2500
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIndex((prevIndex) => (prevIndex + 1) % stringList.length);

        if (loopNum + 1 === stringList.length) {
          setIsFinished(true);
          setTimeout(() => {
            setIsFinished(false);
            onFinish(); // Notify parent component that rotation is done
          }, 1); //! CHANGE TO 3000
        }
      }
    };

    const typingTimeout = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum, typingSpeed, isFinished, onFinish]);

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

/**
 * NewContent component renders a card with a valentine's day theme.
 * It includes an avatar, a message, and two buttons for user interaction.
 * The component uses animations for smooth appearance and button hover effects.
 *
 * @component
 * @example
 * return (
 *   <NewContent />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */
const NewContent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  const handleSuccessClick = () => {
    alert("You clicked Yes! 💖");
  };

  const handleDangerClick = () => {
    alert("You clicked No! 💔");
  };

  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  return (
    <div
      className="new-content"
      style={{
        backgroundColor: "#000000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        className="card-container"
        style={{
          width: "90%",
          maxWidth: "500px",
          transform: visible ? "translateY(0)" : "translateY(30px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease, transform 0.8s ease",
          center: { display: "flex", justifyContent: "center" },
        }}
      >
        <Card
          title="Will You Be My Valentine? 💖"
          className="md:w-25rem"
          style={{
            textAlign: "center",
            background:
              "linear-gradient(135deg,rgb(112, 2, 6) 0%,rgb(107, 3, 100) 100%)",
            padding: "1rem",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(255, 182, 193, 0.6)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Avatar
            image="/EshVishProfilePicture.png"
            size="6xlarge"
            shape="circle"
            style={{
              marginBottom: "1.5rem",
              width: "240px",
              height: "240px",
              border: "5px solid white",
              boxShadow: "0 0 10px rgba(255, 105, 180, 0.7)",
              objectFit: "cover",
            }}
          />
          <p
            className="m-0"
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#fff",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            Would you be my Valentine? 💕
          </p>
          <Toast ref={toast} />
          <ConfirmDialog />
          <div
            style={{
              display: "flex",
              gap: "0.5rem", // Reduced gap to move buttons closer
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              label="Yes 💘"
              onClick={handleSuccessClick}
              style={{
                backgroundColor: "#ff69b4",
                color: "#ffffff",
                fontSize: "1.2rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(255, 105, 180, 0.5)",
                border: "none",
                transition: "0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 0 15px rgba(255, 105, 180, 0.8)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 4px 10px rgba(255, 105, 180, 0.5)";
              }}
            />
            <Button
              label="No 💔"
              onClick={confirm}
              style={{
                backgroundColor: "#dc143c",
                color: "#ffffff",
                fontSize: "1.2rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(220, 20, 60, 0.5)",
                border: "none",
                transition: "0.3s ease",
              }}
              tooltip="Don't Pick me 😠"
              tooltipOptions={{
                position: "bottom",
                mouseTrack: true,
                mouseTrackTop: 25,
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 0 15px rgba(220, 20, 60, 0.8)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 10px rgba(220, 20, 60, 0.5)";
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

/**
 * Main component that conditionally renders either the NewContent component
 * or the RotatingMessages component based on the state of showNewContent.
 *
 * @component
 * @example
 * return (
 *   <Main />
 * )
 */
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
