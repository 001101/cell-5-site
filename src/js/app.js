'use strict';

$(document).ready(function() {
    var SPEED = 15000;

    // Tagline
    $('.tagline-services').slick({
        // autoplay: true,
        // autoplaySpeed: SPEED,
        slidesToShow: 1,
        arrows: false,
        focusOnSelect: true,
        fade: true,
        dots: true,
        asNavFor: '.services-wrapper'
    })

    // Services
    $('.services-wrapper').slick({
        // autoplay: true,
        // autoplaySpeed: SPEED,
        slidesToShow: 1,
        arrows: false,
        focusOnSelect: true,
        fade: true,
        asNavFor: '.tagline-services'
    });

    // Services nav
    var rollServicesNav = function() {
        return setInterval(function() {
            var active = $('.services-nav li.active');
            var next = active.next();

            active.removeClass('active');
            if(next.length === 0) {
                $('.services-nav li:first-child').find('a').click();
            } else {
                next.find('a').click();
            }
        }, SPEED);
    }

    var rollServicesNavInterval = rollServicesNav();

    $('.services-nav a').on('click', function() {
        var index = $('.services-nav a').index(this) + 1;
        $('h2 .slick-dots li:nth-child(' + index + ')').click();

        $('.services-nav li.active').removeClass('active');
        $(this).parent('li').addClass('active');

        clearInterval(rollServicesNavInterval);
        rollServicesNavInterval = rollServicesNav();
    });


    // To close nav dropdown when a nav link is clicked
    $('header .nav-link').on('click', animateSectionScroll);
    $('#logo a').on('click', animateTopScroll);
    $('.sitefooter-bottom a').on('click', animateTopScroll);

    function animateSectionScroll(e) {
        e.preventDefault();

        if(window.innerWidth <= 767) {
            $('.navbar-toggler').click();
        }

        var section = $(this).attr('href');
        $('html,body').animate({
            scrollTop: section === '#home' || section === '#' ? 0 : $(section).offset().top
        }, 500);
    }

    function animateTopScroll(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    }

    var
        testimonialsYOffset = Math.floor($('#testimonials').offset().top),
        profilesYOffset = Math.floor($('#profiles').offset().top),
        contactUsYOffset = Math.floor($('#contact-us').offset().top);

    $(window).on('scroll', function() {
        var yOffset = window.pageYOffset,
            childNum = 4;

        // To change active nav link
        if (yOffset >= 0 && yOffset < testimonialsYOffset) {
            childNum = 1;
        } else if (yOffset >= testimonialsYOffset && yOffset < profilesYOffset) {
            childNum = 2;
        } else if (yOffset >= profilesYOffset && yOffset < contactUsYOffset) {
            childNum = 3;
        }

        $('header .nav-item.active').removeClass('active');
        $('header .nav-item:nth-child(' + childNum + ')').addClass('active');

        // To shrink nav on scroll
        if($(window).scrollTop()) {
            $('#logo').addClass('shrink');
        } else {
            $('#logo').removeClass('shrink');
        }
    });
});

(function ($) {
    "use strict";

    // Team carousel
    $('.team').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        asNavFor: '.teamNav-slide',
        arrows: true,
        nextArrow: '<span class="slick-next-arrow" role="button"><i class="fa fa-angle-right"></i></span>',
        prevArrow: '<span class="slick-prev-arrow" role="button"><i class="fa fa-angle-left"></i></span>',
    });

    $('.teamNav-slide').slick({
        slidesToShow: 3,
        arrows: false,
        asNavFor: '.team',
    });

    // Contact form submission
    var form = $('#contact-form')
    ,   name = $('#name')
    ,   email = $('#email')
    ,   message = $('#message');

    form.submit(function (e) {
        e.preventDefault();

        var data = {
            name: name.val(),
            email: email.val(),
            message: message.val(),
        }

        var errors = validate(data);

        if (errors) {
            showMessage('danger', 'Please fill in the form correctly.');
            return;
        }

        axios.post(form.prop('action'), data)
        .then(function (response) {
            showMessage('success', 'Message successfully sent!');
            // clear form
            form[0].reset();
        })
        .catch(function (error) {
            showMessage('danger', 'Something went wrong. Please try again some other time.');
        });
    });

    function validate(data) {
        var errors = false;

        var emailReg = /^([a-zA-Z0-9\\.]+)@([a-zA-Z0-9\\-\\_\\.]+)\.([a-zA-Z0-9]+)$/i;

        if (data.name == '' || ! emailReg.test(data.email) || data.message == '') {
            return ! errors;
        }

        return errors;
    }

    function showMessage(alertType, message) {
        var markup = '<div class="alert alert-' + alertType + '">' + message + '<div>';

        $('.alert').remove();
        form.append(markup);
    }
} (jQuery) );
