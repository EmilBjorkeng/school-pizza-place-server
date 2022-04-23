let exporationDateNB = new Date(); 
exporationDateNB.setDate(exporationDateNB.getDate() + 30); // Expires after 30 days
exporationDateNB = exporationDateNB.toUTCString();
document.cookie = "lang=nb; path=/; expires=" + exporationDateNB;