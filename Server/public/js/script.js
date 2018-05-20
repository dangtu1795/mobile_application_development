$(document).ready(function () {
    $('.navbar-nav li').removeClass('active');
    var url = window.location;
    // Will only work if string in href matches with location
    $('.navbar-nav a[href="' + url + '"]').parent().addClass('active');

    // Will also work for relative and absolute hrefs
    $('.navbar-nav a').filter(function () {
        return this.href == url;
    }).parent().addClass('active').parent().parent().addClass('active');
});

$('.navbar-nav a').click(function (e) {
    $('.navbar-nav li').removeClass('active');
    $(this).parent().addClass('active');
});