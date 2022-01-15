import { useEffect, useState } from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fact, setFact] = useState();

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFact(result.fact);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return <div className="fact"><h1>{fact}</h1><button><i className="fas fa-sync-alt"></i> Refresh</button></div>;
  }
}

export default App;
