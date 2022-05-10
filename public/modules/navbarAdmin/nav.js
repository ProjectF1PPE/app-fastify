jQuery(function ($) {
    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 200) {
            $('.navbar').addClass('fixed-top');
        } else if ($(this).scrollTop() == 0) {
            $('.navbar').removeClass('fixed-top');
        }
    });

    btnConnexion.onclick = () => login();

    password1.onkeydown = (ev) => {
        if (ev.keyCode === 13) {
            login();
        }
    };

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

async function login() {
    try {
        const data = (await axios.post("/api/admin/login", {password:password1.value}));
        alert("Vous êtes connecté");
        window.location.href='/index.html';
    } catch (e) {
        alert("Mot de passe incorrect");
        throw e;
    }
}

