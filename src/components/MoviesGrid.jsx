import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css"; /*css grid */
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component"; //libreria externa
import { Empty } from "./Empty";

export function MoviesGrid({ search }) {
  //la primera variable nunca se va a modificar, para modificarlo siempre se usara su set(modificador) 
  const [movies, setMovies] = useState([]);  // nos traemos las movies, y la funcion para poder cambiar esa movie
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);  

  useEffect(() => {  /* cuando se carge mi componente al dom, esto luego se cargara como efecto secundario, nos deja hacer llamadas asincronas*/ 
    setIsLoading(true);
    const searchUrl = search
      ? "/search/movie?query=" + search + "&page=" + page
      : "/discover/movie?page=" + page;
    get(searchUrl).then((data) => {
      setMovies((prevMovies) => prevMovies.concat(data.results)); /*aca obitene el result verdadero con data, concatenamos las pelicular anteriores o lo actuales,por el scrool infinito pq va cambiande pagina*/ 
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });
  }, [search, page]);  /*y al final este arreglo de dependecias [] ,para que se ejecute una sola vez el useffect asi evitamos bucles infinitos, porque el useeffect se ejecuta tmb cuando se cambia el estado del componente */

  if (!isLoading && movies.length === 0) {
    return <Empty />;
  }

  
  return (
    <InfiniteScroll     
      dataLength={movies.length}
      hasMore={hasMore}
      next={() => setPage( (prevPage) => prevPage + 1 )}
      loader={<Spinner />}
    >
      <ul className={styles.moviesGrid}>   {/*con map puedo recorrer mi objeto uno x uno y transformar en cualquier cosa ,en este caso en un li */ }
        {movies.map((movie) => (   
          <MovieCard key={movie.id} movie={movie} /> /*el key es un atributo especial q son optimizaciones para un listado*/ 
        ))}
      </ul>
    </InfiniteScroll>
  );
}
// uso llaves puedo implementar funciones de javascript
/*para llamar una api asincrona de un servidor se usa hooks*/
 /*arrow function no es necesario poner un return, */