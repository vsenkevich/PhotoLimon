$(function() {
    var alreadyFilled = false;
    var states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    function initDialog() {
        clearDialog();
        for (var i = 0; i < states.length; i++) {
            $('.dialog').append('<div>' + states[i] + '</div>');
        }
    }

    function clearDialog() {
        $('.dialog').empty();
    }
    $('.autocomplete input').click(function() {
        if (!alreadyFilled) {
            $('.dialog').addClass('open');
        }

    });
    $('body').on('click', '.dialog > div', function() {
        $('.autocomplete input').val($(this).text()).focus();
        $(".autocomplete .close").addClass('visible');
        alreadyFilled = true;
    });
    $('.autocomplete .close').click(function() {
        alreadyFilled = false;
        $('.dialog').addClass('open');
        $('.autocomplete input').val('').focus();
        $(this).removeClass('visible');
    });

    function match(str) {
        str = str.toLowerCase();
        clearDialog();
        for (var i = 0; i < states.length; i++) {
            if (states[i].toLowerCase().startsWith(str)) {
                $('.dialog').append('<div>' + states[i] + '</div>');
            }
        }
    }
    $('.autocomplete input').on('input', function() {
        $('.dialog').addClass('open');
        alreadyFilled = false;
        match($(this).val());
    });
    $('body').click(function(e) {
        if (!$(e.target).is("input, .close")) {
            $('.dialog').removeClass('open');
        }
    });
    initDialog();
});