export const trAJson = (tr, json) => {
    const tds = tr.querySelectorAll("td:not(.td-btn)");
    return json.content.map((col, i) => ({
        header: col.header,
        name: col.name,
        value: tds[i]?.innerText.trim() || "",
        type: (col.name === "pvp" || col.name === "costo") ? "number" : "text"
    }));


}




export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}