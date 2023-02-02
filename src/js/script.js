window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header'),
    headerItems = document.querySelectorAll('.menu'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header_active');
    });

    headerItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header_active');
        })
    })
});

$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/arr_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/arr_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            },

        ]
    });

    // Tabs

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // Catalog COntent Slide

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list-wrapper').eq(i).toggleClass('catalog-item__list-wrapper_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_catalog').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите ваше имя",
                    minlength: jQuery.validator.format("Имя должно состоять минимум из {0} символов")
                },
                phone: "Введите ваш номер телефона",
                email: {
                    required: "Введите ваш email",
                    email: "Введите email в формате name@domain.com"
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // input mask for phone
    $('input[name=phone]').mask('+38 (099) 999-99-99');

    // Sending forms from the site to E-mail
    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut('slow');
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and page up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.pgup').fadeIn('slow');
        } else {
            $('.pgup').fadeOut('slow');
        }
    });

    $("a[href=#up]").on("click", function () {
        let href = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(href).offset().top+"px"
        });

        return false;
    });

    new WOW().init();
});