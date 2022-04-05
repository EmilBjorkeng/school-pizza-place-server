let details = navigator.userAgent
let phones = /android|iphone/i
let isMobileDevice = phones.test(details);

if (isMobileDevice) {
    document.getElementById('top-bar').style.display = "none";
    document.getElementById('phone-menu').style.display = "block";
    document.getElementById('bannerText').style.fontSize = "75px";
    document.getElementById('github').style.display = "none";
}