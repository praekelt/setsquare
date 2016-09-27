// States for the iframe resize handle.
var drag_active = false;
var drag_element;

// Resizeable iframe
$('.setsquare__handle').on('mousedown', function(evt){
    drag_element = $(this).parent();
    drag_active = true;
    $(this).addClass('setsquare__handle_active');
    // Disable pointer events in iframes while user resizes
    drag_element.find('.setsquare__viewport').css('pointer-events', 'none');
});

$(document).on('mouseup', function(evt){
    drag_active = false;
    $('.setsquare__viewport').css('pointer-events', 'auto');
    $('.setsquare__handle').removeClass('setsquare__handle_active');
});

$(document).on('mousemove', function(evt){
    if (drag_active){
        var offset = element_position(drag_element.get(0));
        var mouseX = evt.pageX - offset.x - 5 ;
        drag_element.width(mouseX);
        update_iframe_status(drag_element, mouseX);
    }
});

// Updates the px/em tag on iframes
function update_iframe_status(elem, width){
    $(elem).find('#pixels').html(width);
    $(elem).find('#rems').html(px_to_em(width));
}

// Calculates an elements offset for relative mouse positioning
function element_position(e) {
    var x = 0, y = 0;
    var inner = true ;

    do {
        x += e.offsetLeft;
        y += e.offsetTop;

        var style = getComputedStyle(e, null);
        var borderTop = getNumericStyleProperty(style, 'border-top-width');
        var borderLeft = getNumericStyleProperty(style, 'border-left-width');

        y += borderTop;
        x += borderLeft;

        if (inner) {
            var paddingTop = getNumericStyleProperty(style, 'padding-top');
            var paddingLeft = getNumericStyleProperty(style, 'padding-left');
            y += paddingTop;
            x += paddingLeft;
        }

        inner = false;
    } while (e = e.offsetParent);

    return { x: x, y: y };
}

// Returns a numeric style property for use in offset calculations
function getNumericStyleProperty(style, prop){
  return parseInt(style.getPropertyValue(prop),10);
}

// Converts pixels to ems
function px_to_em(input) {
    return Math.round((input/16) * 10)/10;
}

// Converts ems to px
function em_to_px(input) {
    return Math.round((input*16) * 10)/10;
}
