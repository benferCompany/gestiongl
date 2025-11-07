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


export const consultaPorTexto = async (param) => {
  try {
    const response = await fetch(param.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: param.body
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


export const eliminarDatosPorId = async (URL, id_producto) => {
  try {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id_producto })
    });

    // Leer siempre la respuesta como JSON
    const data = await response.json();

    if (!response.ok) {
      // Lanzar error con información del servidor
      throw new Error(data?.message || `Error HTTP ${response.status}`);
    }

    // Retornar datos en formato consistente
    return data;

  } catch (error) {
    console.error("Error eliminando producto:", error);
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
};



export const fadeInFadeOut = (elemento, transitionFadeInt, transitionFadeOut) => {


  setTimeout(() => {
    elemento.classList.add('visible'); // Aplicamos fade-in
  }, transitionFadeInt); // Pequeño delay para que funcione la transición

  setTimeout(() => {

    elemento.classList.remove('visible'); // Inicia fade-out
    elemento.addEventListener('transitionend', () => {
      elemento.style.display = 'none'; // Oculta después del fade
    }, { once: true });
  }, transitionFadeOut)

}




export const getButtonByText = (element, text) => {
  return [...element.querySelectorAll('button')]
    .find(btn => btn.textContent.trim() === text);
}

export const buscarButton = (e) => {
  const btn = e.evento.closest("button");


  // Verificamos si el clic ocurrió dentro de un botón en el tbody
  if (btn && e.tbody.contains(btn)) {
    if (btn.classList.contains(e.clasesButton[0])) {

      e.accionEditar(btn);
    } else if (btn.classList.contains(e.clasesButton[1])) {

      e.accionEliminar(btn);
    }
  }
}



//evento button
let ultimoPresionado = null
export const eventoButton = (parametro) => {


  const button = document.createElement("button");
  button.addEventListener("click", (e) => {
    console.log(e.target.innerText)
    if (e.target.innerText == ultimoPresionado) { return };
    ultimoPresionado = e.target.innerText;

    parametro.evento();

  })
  button.innerText = parametro.nombre;


  return button;
}

export const llenarFormulario = (form, datosCliente) => {

  const inputId = document.createElement("input");
  inputId.type = "hidden";
  inputId.name = "id";   // nombre del campo que recibís en backend
  form.appendChild(inputId);

  // Recorremos cada input y lo llenamos según el name
  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => {
    const key = input.name;           // nombre del input
    if (datosCliente[key] !== undefined) {
      input.value = datosCliente[key];  // asignamos el valor del JSON
    }
  });
  console.log(form)
  return form;

}

export const trEnJson = (tr) => {
  const headers = document.querySelectorAll("table thead th");

  const normalizeKey = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")                 // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
      .replace(/\s+/g, "");            // elimina espacios
  };

  const paramJson = {};
  headers.forEach((th, index) => {
    const key = normalizeKey(th.innerText.trim());
    const value = tr.children[index].innerText.trim();
    paramJson[key] = value;
  });

  console.log(paramJson);
  return paramJson
}





export function observarCambios(elemento, metodo) {
  // Creamos el observador
  const observer = new MutationObserver((mutations) => {
    // Por cada cambio detectado, llamamos al método que nos pasaron
    mutations.forEach(mutation => metodo(mutation));
  });

  // Configuramos qué tipo de cambios observar
  observer.observe(elemento, {
    childList: true,       // hijos agregados o eliminados
    attributes: true,      // cambios en atributos
    subtree: true,         // incluir los nodos hijos
    characterData: true
  });

  return observer;
}
