export const formBuscarPorTexto = (param) => {

    const form = document.createElement("form")
    form.id = "formSearchId";
    form.addEventListener("submit", param.evento);
    form.innerHTML = `
    ${param.stylos()}
    <input type="search" name="search" placeholder="buscar ..."/>
    <input type="submit" value="🔍"/>
    `;
    

    return form;
}
