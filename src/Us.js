import React, { useEffect } from "react";

const message = (
  <>
    I'm so happy you're my Valentine!!! I never thought this would happen again, but here we are! Two years in a row. I keep missing you ever since we went to college. It's really sad I can't see my valentine everyday. I love you so much, and I hope we are each other's Valentines year after year.
    <br />
    <br />
    P.S. Thank you for accepting the terms and conditions to get to this page. I tricked you hahaha 😊
  </>
);

const useConfetti = (isActive) => {
  useEffect(() => {
    if (!isActive) return;

    const duration = 60 * 60 * 1000 * 10;
    const animationEnd = Date.now() + duration;
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      zIndex: 0,
      startVelocity: 50,
      shapes: ["heart"],
      colors: ["FFC0CB", "FF69B4", "FF1493", "C71585", "FF6347"],
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
        scalar: 3,
        origin: { x: Math.random(), y: Math.random() * 0.1 },
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);
};

const Us = () => {
  useConfetti(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "2vh",
        background: "black",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "80vw",
          height: "80vh",
          background: "rgba(255, 182, 193, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 4px 30px rgba(255, 105, 180, 0.2)",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/EshVishUs.jpg"
            alt="Esh and Vish together"
            style={{
              width: "90%",
              height: "auto",
              margin: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(255, 105, 180, 0.4)",
              border: "5px solid #ff69b4", // Added border
              backgroundColor: "rgba(255, 182, 193, 0.2)", // Added background color
            }}
          />

        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            width: "80%",
            padding: "3rem",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textShadow: "2px 2px 10px rgba(255, 105, 180, 0.4)",
              wordWrap: "break-word",
              color: "#ff69b4",
            }}
          >
            Hi Eshhhhhhhhhhhh,
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              opacity: "0.8",
              wordWrap: "break-word",
              color: "#ff99cc",
            }}
          >
            {message}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "10%",
            bottom: "10%",
            width: "2px",
            background: "linear-gradient(to bottom, rgba(255, 182, 193, 0), #ff69b4, rgba(255, 182, 193, 0))",
            boxShadow: "0 0 15px rgba(255, 105, 180, 0.6)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Us;
