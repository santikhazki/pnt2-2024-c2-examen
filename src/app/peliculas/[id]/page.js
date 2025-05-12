"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { obtenerPeliculas } from "../../services/endpoint_services";
import "./detalle.css";

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
            
            }
        }

        cargarPeliculas();
    }, [id, pageSize, page]);


    return (
        <div className="pelicula-detalle-container">
          <h3 className="pelicula-detalle-directores">
            {pelicula?.directors ? pelicula.directors.join(", ") : "Sin director"}
          </h3>
          <p className="pelicula-detalle-sinopsis">
            {pelicula?.fullplot || "Sin sinopsis"}
          </p>
        </div>
      );
}