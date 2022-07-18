import navbar from "../components/navbar.js";
import sideMenu from "../components/sideMenu.js";
import { search_videos, display_data } from "../scripts/searchAppend.js";

const header = document.querySelector("header");
header.innerHTML = navbar();

const main = document.querySelector("main");
main.innerHTML = sideMenu("container");

let menu = document.querySelectorAll(".menu>div");
menu.forEach((el) => {
    el.addEventListener("click", () => {
        window.location.href = "./index.html";
    })
})

const ham = document.querySelector(".left>i");
const search = document.querySelector(".bx-search");
let api_key = "AIzaSyCqi4dmD6Shz6ppanbyE2E4M8sp8sBDaqY";

let popular_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=in&key=${api_key}&maxResults=20`;

let res = await search_videos(popular_url);
let parent = document.querySelector("#container");
display_data(res, parent);

search.addEventListener("click", async () => {
    let input = document.querySelector("#search").value;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${input}&key=${api_key}&maxResults=20`;
    if (input.trim().length > 0) {
        let res = await search_videos(url);
        let parent = document.querySelector("#container");
        display_data(res, parent);
    }
});



ham.addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("is_active");
});