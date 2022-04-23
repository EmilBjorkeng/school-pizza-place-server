let exporationDateEN = new Date(); 
exporationDateEN.setDate(exporationDateEN.getDate() + 30); // Expires after 30 days
exporationDateEN = exporationDateEN.toUTCString();
document.cookie = "lang=en; path=/; expires=" + exporationDateEN;