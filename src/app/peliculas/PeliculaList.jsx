import "./peliculas.css";
import Pelicula from "./Pelicula";

export default function PeliculaList(props) {
  return (
    <ul className="pelicula-list">
      {props.Peliculas.map((pelicula) => {
        return (
          <Pelicula
            key={pelicula["_id"]}
            ID={pelicula["_id"]}
            Title={pelicula["title"]}
            Plot={pelicula["plot"]}
            Poster={pelicula["poster"]}
            PageSize={props.PageSize}
            Page={props.Page}
          />
        );
      })}
    </ul>
  );
}