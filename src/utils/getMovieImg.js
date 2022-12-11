import placeholder from "../placeholder.jpg";

export function getMovieImg(path, width) {
  return path ? `https://image.tmdb.org/t/p/w${width}${path}` : placeholder;  // si no tiene imagen, muestre
  //este img placeholer
}
