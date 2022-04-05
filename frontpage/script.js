let details = navigator.userAgent
let phones = /android|iphone/i
let isMobileDevice = phones.test(details);

if (isMobileDevice) {
    document.getElementById('top').style.display = "none";
    document.getElementById('phonemenu').style.display = "block";
    document.getElementById('bannerimg').style.width = "100%";
    document.getElementById('bannertext').style.fontSize = "75px";
}

function menulines() {
    
}