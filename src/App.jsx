import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_URL = `https://api.themoviedb.org/3`;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [debouncedInput, setDebouncedInput] = useState("");
  useDebounce(() => setDebouncedInput(searchTerm), 500, [searchTerm]);

  // Fetch Movies from API
  const fetchMovies = async (query = "") => {
    setIsFetching(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data, "Movies list");
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data?.results || []);
      if (query && data?.results?.length > 0) {
        await updateSearchCount(query, data?.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies");
      setMovieList([]);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const result = await getTrendingMovies();
      setTrendingList(result); // get Trending List
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  useEffect(() => {
    fetchMovies(debouncedInput);
    return () => {};
  }, [debouncedInput]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={"./hero.png"} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </header>

        {trendingList?.length > 0 && (
          <section className="trending">
            <h2 className="mt-10px]">Trending Movies</h2>

            <ul>
              {trendingList?.map((movie, index) => (
                <li key={movie.$id || index}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* Popular Movies */}

        <section className="all-movies">
          <h2 className="mt-[20px]">Popular Movies</h2>
          {isFetching ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
