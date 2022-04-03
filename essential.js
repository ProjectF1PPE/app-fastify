window.onload = () => {
    let header = document.getElementById('header');
    header.innerHTML =  "<span id='headerText'>Title</span>"
        + "<span id='headerSubtext'>Subtitle</span>";

    let navbar = document.getElementById('navbar');
    navbar.innerHTML =
        "<ul id='navLinks'>"
        + "<li><a href='index.html'>Home</a></li>"
        + "<li><a href='about.html'>About</a>"
        + "<li><a href='donate.html'>Donate</a></li>"
        + "</ul>";
    navbar.classList.add('collapse', 'navbar-collapse', 'pc', 'navbar', 'navbar-expand-md', 'navbar-dark');

    document.getElementById("footer").innerHTML = "<p id='copyright'>Copyright &copy; " + new Date().getFullYear() + " Nedhor. Tous droits réservés.</p>"
}