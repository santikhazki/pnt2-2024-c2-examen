"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { obtenerPeliculas } from "../../services/endpoint_services";


export default function PageDetails({ params }) {
    const searchParams = useSearchParams()
    const { id } = params;
    const pageSize = searchParams.get('pageSize')
    const page = searchParams.get('page');     
    const [pelicula, setPelicula] = useState([]);

    useEffect(() => {
        async function cargarPeliculas() {
            try {
                const data = await obtenerPeliculas(pageSize, page);
                setPelicula(data.find(pelicula => pelicula["_id"] == id));
                
            } catch (error) {
                console.error("Error al cargar las películas en el componente:", error);
                // Aquí podrías manejar el error mostrando un mensaje al usuario
            }
        }

        cargarPeliculas();
    }, [id, pageSize, page]);


    return (
        <div className="pelicula-item__info">
            <h3>{pelicula?.directors ? pelicula.directors.join(", ") : "Sin director"}</h3>
            <h2>{pelicula?.fullplot || "Sin sinopsis"}</h2>
        </div>
    );
}