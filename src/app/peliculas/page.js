"use client";
import { useState, useEffect } from "react";
import PeliculaList from "./PeliculaList";
import { obtenerPeliculas } from "../services/endpoint_services";
// Siempre que necesite el useState y/o useEffect tengo que poner use client

export default function PeliculaPage() {

    const [peliculas, setPelicula] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const pageSize = 3; // Define el número de películas por página

    useEffect(() => {
        async function cargarPeliculas() {
            try {
                const data = await obtenerPeliculas(pageSize, paginaActual);
                setPelicula(data);
            } catch (error) {
                console.error("Error al cargar las películas en el componente:", error);
                // Aquí podrías manejar el error mostrando un mensaje al usuario
            }
        }

        cargarPeliculas();
    }, [paginaActual, pageSize]);

    const siguientePagina = () => {
        setPaginaActual((prevPagina) => prevPagina + 1);
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual((prevPagina) => prevPagina - 1);
        }
    };

    return (
        <>
            <div className="container">
                <PeliculaList 
                    Peliculas={peliculas}
                    PageSize={pageSize}
                    Page={paginaActual}
                />
                <div className="pagination-controls">
                    <button onClick={paginaAnterior} disabled={paginaActual === 1}>
                        Anterior
                    </button>
                    <span>Página {paginaActual}</span>
                    <button onClick={siguientePagina}>
                        Siguiente
                    </button>

                </div>
            </div>
        </>
    );
}