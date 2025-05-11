import "./peliculas.css";
import Link from "next/link";

export default function Pelicula(props) {
    return (
        <li className="pelicula-item">
            <div className="card pelicula-item__content">
                <Link href={`/peliculas/${props.ID}?pageSize=${props.PageSize}&page=${props.Page}`}>
                    <div className="pelicula-item__image avatar">
                        <img src={props.Poster} />
                    </div>
                    <div className="pelicula-item__info">
                        <h2>{props.Title}</h2>
                        <h3>{props.Plot}</h3>
                    </div>
                </Link>
                <Link href={`/peliculas/${props.ID}/premios?pageSize=${props.PageSize}&page=${props.Page}`}>
                    <button className="ver-premios-button">Ver Premios</button>
                </Link>
            </div>
        </li>
    );
}