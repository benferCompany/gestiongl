export const consulta = async (URL) => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    // Leer el JSON siempre, aunque el status no sea 200
    const data = await response.json();

    if (!response.ok) {
      // Lanzar error con información del servidor
      throw new Error(data?.message || `Error HTTP ${response.status}`);
    }

    // Retornar datos en formato consistente
   return data;

  } catch (error) {
    console.error("Error consultando productos:", error);
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
};



export const fadeInFadeOut = (elemento,transitionFadeInt, transitionFadeOut)=>{
  
        elemento.style.display = 'block'; // Aseguramos que esté visible
        setTimeout(() => {
            elemento.classList.add('visible'); // Aplicamos fade-in
        }, transitionFadeInt); // Pequeño delay para que funcione la transición
    
        setTimeout(() => {
    
            elemento.classList.remove('visible'); // Inicia fade-out
            elemento.addEventListener('transitionend', () => {
                elemento.style.display = 'none'; // Oculta después del fade
            }, { once: true });
        },transitionFadeOut)
    
}


