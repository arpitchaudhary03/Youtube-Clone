import navbar from "../components/navbar.js";
import sideMenu from "../components/sideMenu.js";
import { search_videos, display_data } from "../scripts/searchAppend.js";

let data = JSON.parse(localStorage.getItem("data")) || [];

const header = document.querySelector("header");
header.innerHTML = navbar();

const main = document.querySelector("main");
main.innerHTML = sideMenu("video_container");

let menu = document.querySelectorAll(".menu>div");
menu.forEach((el) => {
    el.addEventListener("click", () => {
        window.location.href = "./index.html";
    })
})

const ham = document.querySelector(".left>i");
const search = document.querySelector(".bx-search");
ham.addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("is_active");
});

let api_key = "AIzaSyCqi4dmD6Shz6ppanbyE2E4M8sp8sBDaqY";

search.addEventListener("click", async () => {
    let input = document.querySelector("#search").value;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${input}&key=${api_key}&maxResults=20`;
    if (input.trim().length > 0) {
        let res = await search_videos(url);
        let parent = document.querySelector("#video_container");
        display_data(res, parent);
    }
});



const play_video = (data) => {
    data.map(async ({ title, id, views, date, channel, view_count, desc }) => {
        document.querySelector("#video_container").innerHTML = null;

        let div = document.createElement("div");

        let iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
        iframe.allow = "autoplay; fullscreen";

        let name = document.createElement("h3");
        name.innerText = title;

        let div1 = document.createElement("div");

        let div2 = document.createElement("div");
        let count_views = document.createElement("p");
        count_views.innerHTML = `${views} views`;

        let publishDate = document.createElement("p");
        publishDate.innerHTML = date;

        div2.append(count_views, publishDate);

        let div3 = document.createElement("div");

        const formatLike = (n) => {
            if (n < 1e3) return n;
            if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
            if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
            if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
            if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
        };

        let no_of_likes = formatLike(+view_count.likeCount);

        let likes = document.createElement("h3");
        likes.innerHTML = `<i class='bx bx-like'></i> ${no_of_likes}`;

        let dislikes = document.createElement("h3");
        dislikes.innerHTML = `<i class='bx bx-dislike'></i> DISLIKE`;

        let share = document.createElement("h3");
        share.innerHTML = `<i class='bx bx-share' ></i> SHARE`;

        div3.append(likes, dislikes, share);
        div1.append(div2, div3);

        let div4 = document.createElement("div");
        let img = document.createElement("img");
        img.src = channel.thumbnails.high.url;

        let div5 = document.createElement("div");

        let cname = document.createElement("h4");
        cname.innerHTML = channel.title;

        let des = document.createElement("p");
        des.innerHTML = desc;

        div5.append(cname, des);
        div4.append(img, div5);

        const comments = async () => {
            try {
                let url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${api_key}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=50`;
                let res = await fetch(url);
                let data = await res.json();
                return data.items;
            } catch (error) {
                console.log(error);
            }
        };
        let comments_data = await comments();

        let total_comments = document.createElement("h4");
        total_comments.innerHTML = `Showing ${comments_data.length} of ${view_count.commentCount} comments`;

        let comments_div = document.createElement("div");
        comments_div.id = "comments";
        comments_data.map(({ snippet: { topLevelComment: { snippet } } }) => {
            let div = document.createElement("div");

            let img = document.createElement("img");
            img.src = snippet.authorProfileImageUrl;

            let div1 = document.createElement("div");

            let date = new Date(snippet.publishedAt);

            let day = date.getDate();
            day < 10 ? day = `0${day}` : day = day;
            let month = date.getMonth() + 1;
            month < 10 ? month = `0${month}` : month = month;
            let year = date.getFullYear();


            let stringdate = `${day}-${month}-${year}`;


            let name = document.createElement("h5");
            name.innerHTML = `${snippet.authorDisplayName} <span>${stringdate}</span>`;

            let text = document.createElement("p");
            text.innerHTML = snippet.textOriginal;

            let like_div = document.createElement("div");

            let like = document.createElement("p");
            like.innerHTML = `<i class='bx bx-like'></i> ${snippet.likeCount}`;

            let dislikes = document.createElement("p");
            dislikes.innerHTML = `<i class='bx bx-dislike'></i>`;

            let reply = document.createElement("p");
            reply.innerHTML = "Reply";

            like_div.append(like, dislikes, reply);

            div1.append(name, text, like_div);

            div.append(img, div1);

            comments_div.append(div);
        })





        div.append(iframe, name, div1, div4, total_comments, comments_div);

        document.querySelector("#video_container").append(div);
    })
}

play_video(data);