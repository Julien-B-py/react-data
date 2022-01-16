import { useEffect, useState } from "react";
import NavButton from "./NavButton";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [currentPic, setCurrentPic] = useState(0);

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
  }, []);

  function getPrevPicture() {
    setCurrentPic((previousValue) => previousValue - 1);
  }

  function getNextPicture() {
    setCurrentPic((previousValue) => previousValue + 1);
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div>
        <div className="picture">
          <img src={pictures[currentPic]} />
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
    );
  }
}

export default App;
