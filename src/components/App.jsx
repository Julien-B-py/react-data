import { useEffect, useState, useRef } from "react";
import NavButton from "./NavButton";
import Footer from "./Footer";

import { gsap } from "gsap";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(0);
  const [currentPic, setCurrentPic] = useState(0);
  const [direction, setDirection] = useState("");

  const pictureRef = useRef();

  // Only runs after first render
  useEffect(() => {
    let photos = fetch("https://silver-le-maine-coon.herokuapp.com/api/photos");
    let quotes = fetch("https://silver-le-maine-coon.herokuapp.com/api/quotes");

    Promise.all([photos, quotes])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        setPictures(data[0]);
        setQuotes(data[1]);
        selectRandomQuote(data[1]);

        setIsLoaded(true);
      })
      .catch(function (error) {
        // if there's an error

        setError(error);
        setIsLoaded(true);
      });
  }, []);

  function selectRandomQuote(array) {
    const minIndex = 0;
    const maxIndex = array.length;
    const randomIndex = Math.floor(Math.random() * maxIndex);
    setRandomQuote(randomIndex);
  }

  function scaleInPicture() {
    // gsap.from(pictureRef.current, { scale: 0 });

    direction === "left"
      ? gsap.from(pictureRef.current, { x: "-50%", autoAlpha: 0 })
      : gsap.from(pictureRef.current, { x: "50%", autoAlpha: 0 });
  }

  function changePicture(dir) {
    dir === "left"
      ? setCurrentPic((previousValue) => previousValue - 1)
      : setCurrentPic((previousValue) => previousValue + 1);
    setDirection(dir);
    selectRandomQuote(quotes);
  }

  if (error) {
    return <div className="center-content">Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="center-content">Chargement...</div>;
  } else {
    return (
      <div className="page">
        <div className="content">
          <h1>Silver</h1>
          <div className="picture">
            <img
              src={pictures[currentPic]}
              ref={pictureRef}
              onLoad={() => scaleInPicture()}
            />
            <div className="nav-buttons">
              {currentPic != 0 && (
                <NavButton direction="left" onPictureChange={changePicture} />
              )}
              {currentPic != pictures.length - 1 && (
                <NavButton direction="right" onPictureChange={changePicture} />
              )}
            </div>
          </div>

          <div>
            <p>{"Photo " + (currentPic + 1) + "/" + pictures.length}</p>
          </div>
        </div>
        <Footer
          quote={quotes[randomQuote].text}
          author={quotes[randomQuote].author}
        />
      </div>
    );
  }
}

export default App;
