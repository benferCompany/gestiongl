

let excelData = [];

document.getElementById("excelFile").addEventListener("change", importarExcel);
document.getElementById("procesar").addEventListener("click", procesarDatos);

function importarExcel(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        excelData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        crearMapeo(Object.keys(excelData[0]));
    };

    reader.readAsArrayBuffer(file);
}

function crearMapeo(columnas) {
    document.getElementById("mapping").style.display = "block";

    const selects = [
        "map_id_producto",
        "map_descripcion",
        "map_costo",
        "map_pvp"
    ];

    selects.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = `<option value="">-- seleccionar --</option>`;

        columnas.forEach(col => {
            const opt = document.createElement("option");
            opt.value = col;
            opt.textContent = col;
            select.appendChild(opt);
        });
    });
}

async function procesarDatos() {
    const map = {
        id_producto: document.getElementById("map_id_producto").value,
        descripcion: document.getElementById("map_descripcion").value,
        costo: document.getElementById("map_costo").value,
        pvp: document.getElementById("map_pvp").value
    };

    const productos = excelData.map((row, index) => ({
        /*id: (index + 1).toString(),*/
        id_producto: row[map.id_producto],
        descripcion: row[map.descripcion],
        costo: parseFloat(row[map.costo]).toFixed(2),
        pvp: parseFloat(row[map.pvp]).toFixed(2)
    }));

const crearProductosSecuencialmente = async (productos) => {
  const resultados = [];

  for (const producto of productos) {
    try {
      const response = await fetch("https://todoelectro.store/servicios/principales/inventario/producto/crear.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
      });

      const json = await response.json();

      if (json.status === "success") {
        console.log(`Producto ${producto.nombre || ''} creado con éxito.`);
        resultados.push(json);
      } else if (json.error && json.error.includes("Duplicate entry")) {
        console.info("Ese código ya se encuentra en uso o el producto es repetido.");
        resultados.push(json);
      } else {
        console.error("Hubo un error en la creación:", json.message);
      }
    } catch (e) {
      console.error("No se pudo conectar con el servidor para este producto", e);
    }
    // Al estar dentro de un bucle 'for' con 'await', 
    // el código se detiene aquí hasta que la petición actual termine
    // antes de pasar al siguiente producto.
  }
  
  return resultados;
};

// Uso:
crearProductosSecuencialmente(productos);
    
}
