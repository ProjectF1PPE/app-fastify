jQuery(function ($) {
    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 200) {
            $('.navbar').addClass('fixed-top');
        } else if ($(this).scrollTop() == 0) {
            $('.navbar').removeClass('fixed-top');
        }
    });
    btnConnexion.onclick = async () => {
        try {
            const data = (await axios.post("/api/admin/login")).data;
            afficher(data);
        } catch (e) {
            throw e;
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

