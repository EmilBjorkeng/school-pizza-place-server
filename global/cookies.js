function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// If you havent seen the cookie poput yet
if (getCookie("seen") != "true") {
    let date = new Date();
    date.setDate(date.getDate() + 30); // Expires after 30 days
    date = date.toUTCString();
    document.cookie = "seen=true; path=/; expires=" + date;

    // Make the popup
    document.body.innerHTML += `
        <div id="cookie">
            <span>Vi bruker cookies for å huske handlekurven din og språkvalget ditt. Cookiene er nødvendig for at siden skal fungere.</span><br>
            <div class="cookieline"></div>
            <span>We use cookies to remeber what is in your cart and your language prefrence. The cookies is nessisery for the site to work.</span><br>
            <button onclick="cookieButton()">OK</button>
        </div>`;
}

// Cookie popup button
function cookieButton() {
    document.getElementById('cookie').style.display = "none";
}