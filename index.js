var boxesContainer = document.getElementById("main-container");
var moreInfoBoxes = document.getElementsByClassName("more-info");
var allBoxes  	 = document.getElementsByClassName("box");
var allFull		 = document.getElementsByClassName("full");

// Sets of 6 shades for each color
const redBoxColors = ["#f60000", "#c50000", "#940000", "#fb9999", "#fa6666", "#f60000"];
const orangeBoxColors = ["#ff8c00", "#cc7000", "#995400", "#ffba66", "#ffa333", "#ff8c00"];
const yellowBoxColors = ["#fedc56", "#e5c64d", "#cbb045", "#fee378", "#fee067", "#fedc56"];
const greenBoxColors = ["#4de94c", "#3eba3d", "#2e8c2e", "#94f294", "#71ed70", "#4de94c"];
const blueBoxColors = ["#3783ff", "#2c69cc", "#214f99", "#87b5ff", "#5f9cff", "#3783ff"];
const indigoBoxColors = ["#4815aa", "#3a1188", "#2b0d66", "#a48ad5", "#6d44bb", "#4815aa"];
var monochromeColorsArray = [redBoxColors, orangeBoxColors, yellowBoxColors, greenBoxColors, blueBoxColors, indigoBoxColors];

// Default colors
var defaultColors = ["#F60000", "#FF8C00", "#FEDC56", "#4DE94C", "#3783FF", "#4815AA"];
var defaultColorsInverse = ["#09ffff", "#0073ff", "#0123a9", "#b216b3", "#c87c00", "#b7ea55"];

// Each of the full box sections
var fullEducation = document.getElementById("education-full");
var fullExperience = document.getElementById("experience-full");
var fullProjects = document.getElementById("projects-full");
var fullAbout = document.getElementById("about-full");
// var fullSkills = document.getElementById("skills-full");
var fullContact = document.getElementById("contact-full");
const fullDivArray = [fullExperience, fullAbout, fullProjects, fullEducation, "", fullContact];

// Buttons to add fun effects
var buttonInvert = document.getElementById("button-invert");
var buttonRave = document.getElementById("button-rave");

// All projects to add github utilities to
var gitProjects = document.getElementsByClassName("github-project");

// ---Setup---
	addButtons();
	raveButtonClick();

	addEachLatestCommit(gitProjects);




// Pre: Should be run once in setup and never again
// Post: Adds a clickEvent to 
function addButtons()
{
	for(var i = 0; i < allBoxes.length; ++i)
	{
		if (allBoxes[i].classList.contains("more-info"))
		{
			allBoxes[i].addEventListener("click", function(){
				swapBoxesController([this.id[0] - 1]);
				// NOTE: For this to work, all boxes must have a class nindex where n is a number 1-6 
				// This must be the first class in the variable
			});
		}
	}
}

// Pre requires an array of 6 HEX codes
// Post, sets each box equal to the color in array cooresponding to its index
function recolor(array)
{
	for(var i = 0; i < allBoxes.length; ++i)
	{
		allBoxes[i].setAttribute("style", "background-color: " + array[i % 6] + ";");
	}
}

// Post: Returns true if the homepage boxes are visible
function isHomepage()
{
	// Starts with a counter set to 0 and incraments by 1 each time it runs
	// This will return true the 1st, 3rd, 5th, etc times run
    if( typeof isHomepage.bool == 'undefined' ) {
        isHomepage.bool = false;
    }
    isHomepage.bool = !isHomepage.bool
    return !isHomepage.bool;
}

// Pre: Requires an index 0-5, cooresponding to a set of subpage boxes in the fullDivArray

 // If the user is on the homepage
	// Shows the subpage cooresponding to index's boxes
	// Sets the boxes to inverse color pattern
// If the user is on a subpage 
function swapBoxesController(index)
{
	if (isHomepage())
	{
		showHomeBoxes(); 
		recolor(defaultColors);
	}
	else
	{
		// recolor(defaultColorsArray[index]);
		recolor(defaultColorsInverse);
		showSubBoxes(index);
	}
}

// Post: Hides all non-homepage boxes and makes the homepage boxes reappear
function showHomeBoxes()
{
	boxesContainer.setAttribute("style", "display: flex !important");
	for(var i = 0; i < fullDivArray.length; ++i)
	{
		if (fullDivArray[i])
		{  // Will give a warning without the if statement when run with return button on subpages
			fullDivArray[i].setAttribute("style", "display: none !important");
		}
	}

}

// Pre: Requires an index 0-5, cooresponding to a set of subpage boxes in the fullDivArray
// Post: Hides all homepage boxes and makes the subpage, index's boxes visible
function showSubBoxes(index)
{
	fullDivArray[index].setAttribute("style", "display: flex !important");
	boxesContainer.setAttribute("style", "display: none !important");
}

function raveButtonClick(timesRun=10)
{
	// Creates a flag to test if it is already running
	if( typeof raveButtonClick.raveIntervalFlag == 'undefined')
	{
		raveButtonClick.raveIntervalFlag = false;
	}
	
	buttonRave.addEventListener("click", function()
	{
		// Checks the flag to see if the function is already running
		// If so it cancels the remaining time
		if (raveButtonClick.raveIntervalFlag)  
		{
			clearInterval(raveInterval);
			recolor(defaultColors);
			raveButtonClick.raveIntervalFlag = false;
			return;
		}

		var i = 0;  // Could just count backward from timesRun, but this letters monochromearray start at 0
		raveButtonClick.raveIntervalFlag = true;

		raveInterval = setInterval(function()
		{
			recolor(monochromeColorsArray[i % 6]);

			++i;
			// When timeRuns is 0, it ends
			if (i  > timesRun)
			{
				clearInterval(raveInterval);
				recolor(defaultColors)
				raveButtonClick.raveIntervalFlag = false;
				return;
			}

		}, 1000);
		
	});
}

// Pre: Requires an array of html text elements where the id of the element is it's github repo name
// Post: Goes through each element and adds it's latest commit
function addEachLatestCommit(projectArray)
{

	for(var i = 0; i < projectArray.length; ++i)
	{
		// https://api.github.com/repos/Hunter-Jones/computersciencenotes/commits/master
		var commitElement = projectArray[i].getElementsByClassName("github-commit")[0];
		var commitUrl = "https://api.github.com/repos/Hunter-Jones/" + projectArray[i].id + "/commits/master";


		// https://api.github.com/repos/hunter-jones/computersciencenotes
		var descriptionElement = projectArray[i].getElementsByClassName("github-description")[0];
		var descriptionUrl = "https://api.github.com/repos/hunter-jones/" + projectArray[i].id;
		
		xhrRequest(commitUrl, commitElement, parseCommitMessage);
		xhrRequest(descriptionUrl, descriptionElement, parseDescriptionMessage);
		
	}
}
// GET IDS FIZED


// Helper function that runs on each addEachLatestCommit
// Pre: requires a url, a document element, and a callback function
// Post: uses xhr, to go to url and then parses with json, then calls callbackfunction to allow you to parse it even further, then sets element equal to the data
function xhrRequest(url, element, callackFunction)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.send(null);

	xhr.onreadystatechange = function () 
	{
 		// Request is done
  		if (xhr.readyState === 4) 
  		{
  			// Successful return
   			if (false) 
   			{
      			var parsedData = JSON.parse(xhr.responseText)

      			// Adds the commit message to the element
      			element.innerHTML = callackFunction(parsedData);
   			} 
   			else 
   			{
     			// console.log("There is an error reaching github's api. The data being presented is what is last saved"); // An error occurred during the request.
    		}
  		}
	};
}

// Helper function of lastGitCommit
// Pre: requires the xhr data after being JSON.parsed and an optional variable for the max size of the messge
// Post: parses the message to be added
function parseCommitMessage(data, maxMessageSize=125)
{
	var content = data.commit.message;
    var date = parseDate(data.commit.committer.date);

    var message =  "Latest commit <br>" + date + "<br>" + content;

    // if over size limit
    if(maxMessageSize != -1 && message.length >= maxMessageSize - 3)
    {
    	return message.substring(0, maxMessageSize - 3) + "...";
    }
    // If not over size limit
    return message;
}

function parseDescriptionMessage(data)
{
	return data.description;
}


// Pre: Requires a date in the YYYY-MM-DDTHH:MM:SSZ format
// Post: Returns a more human readable date in the format of MonthName D/DD, YYYY
function parseDate(githubDate)
{
	var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var year = githubDate.substring(0, 4);
	var monthIndex = githubDate.substring(5, 7);
	var day = githubDate.substring(8, 10);

	return monthsArray[monthIndex - 1] + " " + day +", " + year;
}
