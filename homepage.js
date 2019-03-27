var text = document.querySelector(".text");
var rightArrow = document.querySelector("#arrow-right");
var leftArrow = document.querySelector("#arrow-left");

var initialPosition = 42;
var minPosition = 97;
var maxPosition = -253;
var position = initialPosition;  // used to concotnate the position and %, starts at 30% width

window.addEventListener("wheel", function(event){
    mousescroll(event);
})
rightArrow.addEventListener("mousedown", function(){
    autoScroll(true, rightArrow);
})
leftArrow.addEventListener("mousedown", function(){
    autoScroll(false, leftArrow);
})

function mousescroll(event) {
    // console.log(position);
    if(getDirection(event)){  // scroll up
        if (position < minPosition) { // makes sure text doesnt go too far left
            position += 4;
        } else {
            position = maxPosition
        }
    }
    else {  // scroll down
        if (position > maxPosition) {
            position -= 4;
        } else {
            position = minPosition;
        }
    }

    text.style.left = position + "%";

    scroll(0,0); // Makes the page scroll to top, so even if the page is 101 height it can scroll forever

    // console.log(text.style.left)
}

function getDirection(event) {  // checks if scrolling up or down [true if up, down if false]
    var delta;

    if (event.wheelDelta){
        delta = event.wheelDelta;
    }else{
        delta = -1 * event.deltaY;
    }

    if (delta < 0){
        return false;
    }else if (delta > 0){
        return true;
    }
}

function buttonPress(button, speed){  // happens each time you click on the button to make it scroll once
    if(button){  // scroll up
        if (position < minPosition) { // makes sure text doesnt go too far left
            position += speed;
        } else {
            position = maxPosition
        }
    }
    else {  // scroll down
        if (position > maxPosition) {
            position -= speed;
        } else {
            position = minPosition;
        }
    }

    text.style.left = position + "%";

    scroll(0,0); // Makes the page scroll to top, so even if the page is 101 height it can scroll forever
}

function autoScroll(directionBool, parent) {  // allows buttonPress to be run while the button is held down
    // buttonPress(directionBool, .5);
    var autoScroll = setInterval(function(){
        buttonPress(directionBool, .4);
        parent.addEventListener("mouseup", function(){
            clearInterval(autoScroll);
        })
    }, 16.67) // 60fps (1000/60)
}
