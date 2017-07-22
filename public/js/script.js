$(function() {

    var alignModal = function() {
        var modalDialog = $(this).find(".modal-dialog");
        // Applying the top margin on modal dialog to align it vertically center */
        modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
    };

    $(".modal").on("shown.bs.modal", alignModal);

    // Align modal when user resize the window
    $(window).on("resize", function() {
        $(".modal:visible").each(alignModal);
    });

    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    $('.slider-parent').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
    });
});