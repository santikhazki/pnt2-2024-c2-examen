"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { obtenerPeliculas } from "../../../services/endpoint_services";
import "./premios.css";


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
    
            }
        }

        cargarPeliculas();
    }, [id, pageSize, page]);


    return (
        <div className="pelicula-premios-container">
          <h2 className="pelicula-premios-header">Premios de la Película</h2>
          <div className="pelicula-premios-list">
            <div className="premio-item">🏆 <strong>Ganados:</strong> {awards?.wins ?? "N/A"}</div>
            <div className="premio-item">🎖️ <strong>Nominaciones:</strong> {awards?.nominations ?? "N/A"}</div>
            <div className="premio-item">📝 <strong>Descripción:</strong> {awards?.text ?? "No hay descripción."}</div>
          </div>
        </div>
      );
}