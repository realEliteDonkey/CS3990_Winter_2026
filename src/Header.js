export function initHeader() {
    const header_container = $("#header-container, #header_container");

    header_container.css({
        "grid-column-start": "1",
        "grid-column-end": "11",
        "grid-row-start": "1",
        "grid-row-end": "3",
        "background-color": "white",
        "min-height" : "80px",
        "display" : "flex",
    });

    let title = "<h1>Web Title</h1>";
    header_container.append(title);
    
    $("#header_container h1").css({
        "color": "white",
        "min-width" : "100%",
        "max-height" : "25%",
        "background-color" : "#7700ff",
        "color" : "rgb(20, 20, 20)",
        "display" : "flex",
        "align-items" : "center",
        "justify-content" : "center",
    });
}
