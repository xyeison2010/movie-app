
import styles from "./App.module.css"; 
import { BrowserRouter ,Route, Routes, Link } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";
import { LandingPage } from "./pages/LandingPage";

export function App() {
  return (
    <>
    <BrowserRouter>
      <header>
        <Link to="/">
        <h1 className={styles.title}>🍿🍿Best Movies 🍿🍿</h1>
        </Link>
      </header>
      <main>
        <Routes>
    
          <Route  path="/movies/:movieId"  element={ <MovieDetails />} /> 
          <Route path="/" element= { <LandingPage />} />

          </Routes>
      </main>
      </BrowserRouter>
    </>
  );
}
