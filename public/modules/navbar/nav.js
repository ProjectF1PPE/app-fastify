//lors du clique sur le bouton Connexion la fonction login est lancé
btnConnexion.onclick = () => login();

jQuery(function ($) {
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

$(document).ready(function() {
    $('#loginModal').modal('show');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});
//fonction login pour vérifier le mot de passe et lui donner l'accès au pannel admin si le mot de passe est correct
async function login() {
    if (!password1.checkValidity()) {
        alert('Entrer un mot de passe');
        return;
    }

    try {
        const data = (await axios.post("/api/admin/login", { password:password1.value})).data;
        alert("Vous êtes connecté");
        sessionStorage.setItem("token", data);
        window.location.href='/admin';
    } catch (e) {
        alert("Mot de passe incorrect");
        throw e;
    }
}

