import { useState } from "react";
import "./App.css";

function App() {
  const API_KEY = "bd624a1575a8ad89f17305873761080c";
  const urlBase = `https://api.themoviedb.org/3/search/movie`;
  const [search, setSearch] = useState("");
  const [moviesData, setMoviesData] = useState([]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rs = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`);
      const data = await rs.json();
      setMoviesData(data.results);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe una película"
            value={search}
            onChange={handleInputChange}
          />
          <button type="submit">Buscar</button>
        </form>
        {moviesData && (
          <div className="movie-list">
            {moviesData?.map((movie) => {
              return (
                <div key={movie.id} className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
