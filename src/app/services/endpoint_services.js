export async function obtenerPeliculas(pageSize, page) {
    try {
      const response = await fetch(
        `https://mflixbackend.azurewebsites.net/api/movies?pageSize=${pageSize}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener las películas:", error);
      throw error; // Re-lanza el error para que el componente pueda manejarlo si es necesario
    }
  }