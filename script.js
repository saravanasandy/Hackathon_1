const videoContainer = document.querySelector('.Body-content');

let api_key = "AIzaSyD--sDRddM5d0wZIB_vsTQ2APTzV1EKJCg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";

let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part:'Snippet',
    chart :'mostPopular',
    maxResults : 50,
    regionCode : 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(error =>console.log(error));

const getChannelIcon =(video_data) => {
     
     fetch(channel_http + new URLSearchParams({
        key : api_key,
        part : 'snippet',
        id : video_data.snippet.channelId
     }))
     .then(res => res.json())
     .then (data =>{
        // console.log(data);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        // console.log(video_data);
        makeVideoCard(video_data);
     })

}

const makeVideoCard = (data)=>{
     videoContainer.innerHTML += `
     <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon1" alt="">
                <div class="info">
                    <h4 class="tit">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
            </div>
        </div>
     `;
}

 // *******************  searchbar   ***************************************

 const searchBox = document.querySelector('.search-bar');
 const searchBtn = document.querySelector('.search-btn');
 let searchLink = "https://www.youtube.com/results?search_query=";

 searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = searchLink + searchBox.value;
    }
 })


 const subscriberCount = document.getElementById("Subscriberid");
 const viewdetails = document.getElementById("views");
 const videocount = document.getElementById("videocount");

//  subscriberCount.value = "10000";
//  viewdetails.value = "600";
//  videocount.value = "25";
 const Userid = 'UCwJ0ddm6BweKtQxyRCi66sQ';
 

 let detailData = ()=>{
   fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=${api_key}`)
     .then(response => {
         return response.json()
     })
     .then(data => {
         console.log(data);
         subscriberCount.value = data["items"][0].statistics.subscriberCount;
         viewdetails.value = data["items"][0].statistics.viewCount;
         videocount.value = data["items"][0].statistics.videoCount;
         
     })
 }
 detailData();
