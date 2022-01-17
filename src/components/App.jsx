import { useEffect, useState, useRef } from "react";
import NavButton from "./NavButton";
import Footer from "./Footer";

import { gsap } from "gsap";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [currentPic, setCurrentPic] = useState(0);
  const [direction, setDirection] = useState("");

  const pictureRef = useRef();

  // Only runs after first render
  useEffect(() => {
    fetch("https://silver-le-maine-coon.herokuapp.com/api/photos")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPictures(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    // .then(() => {
    //   scaleInPicture();
    // });
  }, []);

  // Runs after first render every time `currentPic` changes if isLoaded.
  // useEffect(() => {
  //   if (isLoaded) {
  //     scaleInPicture();
  //   }
  // }, [currentPic]);

  function scaleInPicture() {
    // gsap.from(pictureRef.current, { scale: 0 });

    direction === "left"
      ? gsap.from(pictureRef.current, { x: "-50%", autoAlpha: 0 })
      : gsap.from(pictureRef.current, { x: "50%", autoAlpha: 0 });
  }

  function getPrevPicture() {
    setCurrentPic((previousValue) => previousValue - 1);
    setDirection("left");
  }

  function getNextPicture() {
    setCurrentPic((previousValue) => previousValue + 1);
    setDirection("right");
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="page">
        <div className="content">
          <div className="picture">
            <img
              src={pictures[currentPic]}
              ref={pictureRef}
              onLoad={() => scaleInPicture()}
            />
            <div className="nav-buttons">
              {currentPic != 0 && (
                <NavButton direction="left" onPictureChange={getPrevPicture} />
              )}
              {currentPic != pictures.length - 1 && (
                <NavButton direction="right" onPictureChange={getNextPicture} />
              )}
            </div>
          </div>
        </div>
        <Footer quote="quote" author="author" />
      </div>
    );
  }
}

export default App;
