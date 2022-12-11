import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "../components/Spinner";
import { getMovieImg } from "../utils/getMovieImg";
import { get } from "../utils/httpClient";
import styles from "./MovieDetails.module.css"; /*para estilos particulareS usaremos modulos css en jsx*/ 

export function MovieDetails() {
  const { movieId } = useParams(); /*con este hook,nos trae el parametro q pasamos a la url route :movieId */ 
  const [isLoading, setIsLoading] = useState(true);  //el estado inicial sera (true)
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setIsLoading(true);  //si la pelicula se llega a cargar

    get("/movie/" + movieId).then((data) => {  //este "movie/ es del servidor del api q nos manda asi"
      setMovie(data);
      setIsLoading(false); //si la pelicula se carge
    });
  }, [movieId]); //la dependencia q va tener este efecto va depender de movieId si me cambia quiero q ejecute el efecto, de lo contrario q no se ejecute de vuelta
/*los useEffect no siempre tendran el arreglo de dependencia vacio,por ejemp si 
cambio el id(identificador de la url)quiero q se vuelva ejecutar denuevo el efecto*/ 
/*cuando carge el componente por primerza vez si o si se carga el efecto, las demas ejecuciones van a depender del arreglo de depencia q se coloca(movieId)  */
  

if (isLoading) {
return <Spinner />; 
 }// si no hicieramos esto tendriamos error,al cargar el componente pq el movie estaria vacio,
/* primero cargamos la data a nuestro setMovie(pq empieza con null), y cada vez q cambia el estado,se ejecuta otra vez la funcion, y asi defrente pasa a return, y esta ves el useeffect ya no se ejecutaria (pq ya se ejecuto) */

  const imageUrl = getMovieImg(movie.poster_path, 500);
  return (
    <div className={styles.detailsContainer}>
      <img
        className={`${styles.col} ${styles.movieImage}`}
        src={imageUrl}
        alt={movie.title}
      />
      <div className={`${styles.col} ${styles.movieDetails}`}>
        <p className={styles.firstItem}>
          <strong>Title:</strong> {movie.title}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {movie.overview}
        </p>
      </div>
    </div>
  );
}

/* if(!movie){ //si no hay movie o movie esta null , esto era antes del spinner,
  return null;
} */