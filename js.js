 

var buttonCount = 1;
var maxButtons = 4;

var colors = ["NULL", "red", "darkOrange", "gold", "lime", "cyan", "indigo", "magenta"];
var currentColor = 1;

var current = document.getElementsByClassName("current")[0];
var right = document.getElementsByClassName("right")[0];
var left = document.getElementsByClassName("left")[0];
var names = document.getElementById("names");
var skills = document.getElementById("skills");
var projects = document.getElementById("projects");
var contact = document.getElementById("contact");

function buttonsSwitch(max, button) { /*Incrament*/
	if (button === max) {
		return button = 1;
	}
	return button + 1;
}
function buttonsSwitchMinus(max, button) { /*Decrament*/
	if (button === 1) {
		return max;  // fix
	}
	return button - 1;
}

function chooseAction(button){
	contact.classList.remove("current"); /* Makes each item have hidden*/
	contact.classList.add("hidden");
	names.classList.remove("current");
	names.classList.add("hidden");
	projects.classList.remove("current");
	projects.classList.add("hidden");
	skills.classList.remove("current");
	skills.classList.add("hidden");

	switch (button) { /*Adds current to the correct item*/
  		case 1:
  			names.classList.remove("hidden");
    		names.classList.add("current");
			break;
  		case 2:
  			projects.classList.remove("hidden");
    		projects.classList.add("current");
    		break;
  		case 3:
  			skills.classList.remove("hidden");
    		skills.classList.add("current");	
   			break;
  		case 4:
  			contact.classList.remove("hidden");
    		contact.classList.add("current");
    		break;
  		case 5:
  	}
}

function init(){ // run at start to create init colors
	currentColor = Math.floor(Math.random() * colors.length)
	current = document.getElementsByClassName("current")[0];
	currentColor = buttonsSwitch(colors.length-1, currentColor);

	current.style.backgroundColor = colors[currentColor];
	left.style.backgroundColor = colors[buttonsSwitchMinus(colors.length+1, currentColor)];
	right.style.backgroundColor = colors[buttonsSwitch(colors.length-1, currentColor)];
}
init();

right.addEventListener("click", function(){ /*Swap card forward*/
  	buttonCount = buttonsSwitch(maxButtons, buttonCount);
  	console.log(buttonCount)
	chooseAction(buttonCount);
	console.log(current);

	current = document.getElementsByClassName("current")[0];
	currentColor = buttonsSwitch(colors.length-1, currentColor);

	left.style.backgroundColor = colors[buttonsSwitchMinus(colors.length+1, currentColor)];
	left.style.transition = ".9s background-color 0s";
	current.style.backgroundColor = colors[currentColor];
	right.style.backgroundColor = colors[buttonsSwitch(colors.length-1, currentColor)];
	right.style.transition = ".9s background-color 0s";
});
left.addEventListener("click", function(){ /*Swap card backwards*/
	buttonCount = buttonsSwitchMinus(maxButtons, buttonCount);
	chooseAction(buttonCount);

	current = document.getElementsByClassName("current")[0];
	currentColor = buttonsSwitchMinus(colors.length-1, currentColor);

	left.style.backgroundColor = colors[buttonsSwitchMinus(colors.length-1, currentColor)];
	left.style.transition = ".9s background-color 0s";
	current.style.backgroundColor = colors[currentColor];
	right.style.backgroundColor = colors[buttonsSwitch(colors.length+1, currentColor)];
	right.style.transition = ".9s background-color 0s";
});