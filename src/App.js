import "./App.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from 'primereact/progressspinner';
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
const useConfetti = (isActive) => {
  useEffect(() => {
    if (!isActive) return;

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

    window.confetti({
      ...defaults,
      particleCount: 150,
      scalar: 5,
      origin: { x: 0.5, y: 0.25 },
    });

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      window.confetti({
        ...defaults,
        particleCount: 10,
        scalar: 5,
        origin: { x: Math.random(), y: Math.random() * 0.1 },
      });
    }, 150);

    return () => clearInterval(interval); // Stop confetti when component unmounts
  }, [isActive]);
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
  const [confettiActive, setConfettiActive] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [downloadBarActive, setDownloadBarActive] = useState(false);



  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  useEffect(() => {
    if (confettiActive) {
      setTimeout(() => setConfettiActive(false), 5000); // Confetti will stop after 5 seconds
    }
  }, [confettiActive]);

  const handleSuccessClick = () => {
    if (!checked) {
      alert("Please accept the terms and conditions first! 😠");
      return;
    }

    setConfettiActive(true);

    setTimeout(() => {
      window.location.href = "/us";
    }, 5000);
  };


  // Spam Popups
  const spam = () => {
    const imageCount = 50;
    const images = [
      "/20241118_152739565_iOS.png",
      "/20241118_152735920_iOS.png",
      "/20241118_152732646_iOS.png",
      "/20241118_152729317_iOS.png",
      "/20241118_152725774_iOS.png",
      "/20241118_152721858_iOS.png",
      "/20241118_152718198_iOS.png",
      "/20241118_152713132_iOS.png",
      "/20241118_152709974_iOS.png",
      "/20241118_152706894_iOS.png",
      "/20241118_152703749_iOS.png",
      "/20241118_152700521_iOS.png",
      "/20241118_152657464_iOS.png",
      "/20241118_152653338_iOS.png",
      "/20241118_152648987_iOS.png",
      "/20241118_152645209_iOS.png",
      "/20241118_152641358_iOS.png",
      "/20241118_152638283_iOS.png",
      "/20241118_152633678_iOS.png",
      "/20241118_152628392_iOS.png",
      "/20241118_152624044_iOS.png",
      "/20241118_152616477_iOS.png",
      "/20241118_152612803_iOS.png",
      "/20241118_152608592_iOS.png",
      "/20241118_152605038_iOS.png",
      "/20241118_152601792_iOS.png",
      "/20241118_152558093_iOS.png",
      "/20241118_152554473_iOS.png"
    ];
    const body = document.querySelector("body");

    for (let i = 0; i < imageCount; i++) {
      const img = document.createElement("img");
      const imageUrl = images[Math.floor(Math.random() * images.length)];
      img.src = imageUrl;
      img.style.position = "absolute";
      img.style.width = "100px";  // Adjust image size if necessary
      img.style.height = "100px"; // Adjust image size if necessary
      img.style.left = Math.random() * (window.innerWidth - 100) + "px";
      img.style.top = Math.random() * (window.innerHeight - 100) + "px";
      img.style.zIndex = 9999; // Ensure the images are on top of other elements
      body.appendChild(img);
    }
  };



  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "error",
      summary: "Confirmed",
      detail: "Downloading Esh Virus...",
      life: 5000,
    });
    setDownloadBarActive(true);
    setTimeout(spam, 1000); // Call spam after 1 second
    setTimeout(() => setDownloadBarActive(false), 1000);
  };

  const reject = () => {
    toast.current.show({
      severity: "success",
      summary: "Thats what I thought",
      detail: "You are not a meanie",
      life: 3000,
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to become a meanie?",
      header: "Become Menie",
      icon: "pi pi-info-circle",
      defaultFocus: "error",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  const handleDialog = () => {
    setVisibleDialog(true);
  };

  useConfetti(confettiActive);

  return (
    <div
      className="new-content"
      style={{
        backgroundColor: "#000000",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      {downloadBarActive && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
      <div
        className="card-container"
        style={{
          width: "90%",
          maxWidth: "500px",
          transform: visible ? "translateY(0)" : "translateY(30px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease, transform 0.8s ease",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          title="Will You Be My Valentine? 💖"
          className="md:w-25rem"
          style={{
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgb(112, 2, 6) 0%, rgb(107, 3, 100) 100%)",
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

          <Toast ref={toast} />
          <ConfirmDialog />
          <Dialog
            header="Vish's Valentine Terms and Conditions 🐟"
            visible={visibleDialog}
            style={{ width: "75vw" }}
            onHide={() => setVisibleDialog(false)}
          >
            <ol className="m-0">
              <li>No take backs on becoming valentine</li>
              <li>Unlimited Esh hugs</li>
              <li>Frequent Esh Pictures and Fit Checks</li>
            </ol>
          </Dialog>

          <div className="p-field-checkbox" style={{ marginBottom: "1rem" }}>
            <Checkbox
              inputId="binary"
              checked={checked}
              onChange={(e) => setChecked(e.checked)}
            />
            <label
              htmlFor="binary"
              className="p-checkbox-label"
              onClick={handleDialog}
              style={{
                cursor: "pointer",
                alignItems: "center",
                fontSize: "1rem",
                lineHeight: "1.4",
                flexWrap: "wrap",
                marginLeft: "0.5rem",
              }}
            >
              <span style={{ marginRight: "0.3rem" }}>
                I accept Vish's Valentine
              </span>

              <span
                style={{
                  color: "#FF0000",
                  textDecoration: "underline",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                terms and conditions
                <img
                  src="https://static.thenounproject.com/png/1406946-200.png"
                  alt="external link icon"
                  style={{
                    marginLeft: "0.3rem",
                    width: "1rem",
                    height: "1rem",
                  }}
                />
              </span>
            </label>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
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
                e.target.style.boxShadow =
                  "0 4px 10px rgba(220, 20, 60, 0.5)";
              }}
            />
          </div>
        </Card>

      </div>
      <Toast ref={toast} />
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
