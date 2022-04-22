function dropdownMenu() {
    dropdownmenu = document.getElementsByClassName('dropdown-menu')[0];
    if (dropdownmenu.style.display == "block") {
        dropdownmenu.style.display = "none";
    } else {
        dropdownmenu.style.display = "block";
    }
}