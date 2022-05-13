//lors du clique sur le bouton Connexion la fonction login est lancé


jQuery(function ($) {
    //btnConnexion2.onclick = () => login();

    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 200) {
            $('.navbar').addClass('fixed-top');
        } else if ($(this).scrollTop() == 0) {
            $('.navbar').removeClass('fixed-top');
        }
    });

    function adjustNav() {
        var winWidth = $(window).width(),
            dropdown = $('.dropdown'),
            dropdownMenu = $('.dropdown-menu');

        if (winWidth >= 768) {
            dropdown.on('mouseenter', function () {
                $(this).addClass('show')
                    .children(dropdownMenu).addClass('show');
            });

            dropdown.on('mouseleave', function () {
                $(this).removeClass('show')
                    .children(dropdownMenu).removeClass('show');
            });
        } else {
            dropdown.off('mouseenter mouseleave');
        }
    }

    $(window).on('resize', adjustNav);

    adjustNav();

});
//fonction login pour vérifier le mot de passe et lui donner l'accès au pannel admin si le mot de passe est correct
async function login() {
    if (!password1.checkValidity()) {
        Std.afficherErreur('Entrer un mot de passe');
        return;
    }

    try {
        const data = (await axios.post("/api/admin/login", { password:password1.value})).data;

        sessionStorage.setItem("token", data);
        let parametre = {message : "Vous êtes connecté", fermeture : 1, surFermeture : () =>  window.location.href='/admin', type : 'success'}
        Std.afficherMessage(parametre);

    } catch (e) {
        Std.afficherErreur("Mot de passe incorrect");
        throw e;
    }
}

