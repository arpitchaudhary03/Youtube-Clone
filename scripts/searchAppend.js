const search_videos = async (url) => {
    try {

        let res = await fetch(url);
        let data = await res.json();
        return data.items;
    } catch (error) {
        console.log(error);
    }
};

const display_data = (data, parent) => {
    parent.innerHTML = null;
    data.forEach(async ({ id, snippet: { title }, snippet: { publishedAt }, snippet: { channelId }, snippet: { description }, snippet: { thumbnails: { high: { url } } }, id: { videoId } }) => {

        const channel_content = async () => {
            try {
                let url = `https://youtube.googleapis.com/youtube/v3/channels?id=${channelId}&key=AIzaSyCqi4dmD6Shz6ppanbyE2E4M8sp8sBDaqY&part=snippet`;
                let res = await fetch(url);
                let data = await res.json();
                let channel = data.items[0].snippet;
                return channel;
            } catch (error) {
                console.log(error);
            }
        };

        let channel = await channel_content();

        const views = async () => {
            try {
                let view_id;
                videoId ? view_id = videoId : view_id = id;
                let url = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${view_id}&key=AIzaSyCqi4dmD6Shz6ppanbyE2E4M8sp8sBDaqY`;
                let res = await fetch(url);
                let data = await res.json();
                let count = data.items[0].statistics;
                return count;
            } catch (error) {
                console.log(error);
            }
        }

        let view_count = await views();
        // console.log(view_count);
        const formatView = (n) => {
            if (n < 1e3) return n;
            if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
            if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
            if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
            if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
        };

        let no_of_views = formatView(+view_count.viewCount);

        let date = new Date(publishedAt);

        let day = date.getDate();
        day < 10 ? day = `0${day}` : day = day;
        let month = date.getMonth() + 1;
        month < 10 ? month = `0${month}` : month = month;
        let year = date.getFullYear();


        let stringdate = `${day}-${month}-${year}`;

        let div = document.createElement("div");
        div.addEventListener("click", () => {
            let vid;
            videoId ? vid = videoId : vid = id;
            video_data(title, vid, no_of_views, stringdate, channel, view_count, description);
        })



        let img = document.createElement("img");
        img.src = url;

        let div2 = document.createElement("div");

        let img2 = document.createElement("img");
        img2.src = channel.thumbnails.high.url;

        let div3 = document.createElement("div");
        let name = document.createElement("h4");
        name.innerText = title;

        let cname = document.createElement("p");
        cname.innerText = channel.title;

        let div4 = document.createElement("div");

        let count_views = document.createElement("p");
        count_views.innerHTML = `${no_of_views} views`;

        let publishDate = document.createElement("p");
        publishDate.innerHTML = stringdate;

        div4.append(count_views, publishDate);

        div3.append(name, cname, div4);
        div2.append(img2, div3);
        div.append(img, div2);
        parent.append(div);
    });

};

const video_data = (title, id, views, date, channel, view_count, desc) => {
    let data = [];
    data.push({ title, id, views, date, channel, view_count, desc });
    localStorage.setItem("data", JSON.stringify(data));
    window.location.href = "./video.html";
}
export { search_videos, display_data };