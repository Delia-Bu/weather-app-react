import config from "./config.js";

var script = document.createElement("script");

script.src = "https://maps.googleapis.com/maps/api/js?key=" + config.MY_KEY;

document.head.appendChild(script);
