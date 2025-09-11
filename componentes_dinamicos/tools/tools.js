export const trAJson = (tr, json) => {
    console.log(json)
    const tds = tr.querySelectorAll("td:not(.td-btn)");
    return json.content.map((col, i) => ({
        header: col.header,
        name: col.name,
        value: tds[i]?.innerText.trim() || "",
        type: (col.name === "pvp" || col.name === "costo") ? "number" : "text"
    }));


}