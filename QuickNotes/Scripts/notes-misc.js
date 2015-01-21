function SelectText(element) {
    var doc = document, text = doc.getElementById(element), range, selection;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function selectNote(element) {
    var note = $(element).parent().prev();
    SelectText($(note).prop('id'));
}

$(function () {
    $('#banner').on('click', function () {
        $('#banner').hide();
        if ($('#banner').hasClass('closed-banner')) {
            $('.space').hide();
        }
        $("#myCarousel").animate({
            height: "toggle"
        }, 1000, function () {
            if ($('#banner').hasClass('open-banner')) {
                $('#banner').removeClass('open-banner glyphicon-export').addClass('closed-banner glyphicon-import').show();
                $('.space').show();
            } else {
                $('#banner').removeClass('closed-banner glyphicon-import').addClass('open-banner glyphicon-export').show();
            }
        });
    });
});
