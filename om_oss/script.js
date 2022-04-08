let details = navigator.userAgent
let phones = /android|iphone/i
let isMobileDevice = phones.test(details);

if (isMobileDevice) {
    document.getElementById('top-bar').style.display = "none";
    document.getElementsByClassName('box')[0].style.fontSize = "50px";
    document.getElementsByClassName('box')[1].style.fontSize = "50px";
    document.getElementsByClassName('box')[0].style.width = "100%";
    document.getElementsByClassName('box')[1].style.width = "100%";
}