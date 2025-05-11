"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { obtenerPeliculas } from "../../../services/endpoint_services";


export default function PeliculaAwards({ params }) {
    const searchParams = useSearchParams()
    const { id } = params;
    const pageSize = searchParams.get('pageSize')
    const page = searchParams.get('page');
    const [awards, setAwards] = useState({});
    // const [pelicula, setPelicula] = useState({});

    useEffect(() => {
        async function cargarPeliculas() {
            try {
                const data = await obtenerPeliculas(pageSize, page);
                const pelicula = data.find(pelicula => pelicula["_id"] == id)
                // setPelicula(pelicula)
                setAwards(pelicula["awards"]);

            } catch (error) {
                console.error("Error al cargar las películas en el componente:", error);
                // Aquí podrías manejar el error mostrando un mensaje al usuario
            }
        }

        cargarPeliculas();
    }, [id, pageSize, page]);


    return (
        <div className="pelicula-item__info">
            <h3>Wins: {awards["wins"]}</h3>
            <h3>Nominations: {awards["nominations"]}</h3>
            <h3>Text: {awards["text"]}</h3>
        </div>
    );
}