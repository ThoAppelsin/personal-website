var contentsandlabels = {};
var columnL;
var schedule;
var selection;
var images = new Array();
var imagenames = [
	"Bank out of nowhere.jpg",
	"Barren landscape.jpg",
	"Dog thinking on life and stuff.jpg",
	"Kill your television.jpg",
	"Lighthouse out of nowhere.jpg",
	"Mystery hill with mysterious visitor.jpg",
	"Possibly toxic mushroom.jpg",
	"Red maple leaves.jpg",
	"This guy knows how to live.jpg",
	"This kid's on it.png",
	"Tree on a hill.jpg",
	"Tree out of nowhere.jpg",
	"Woah not gonna happen.jpg"
	];
var wallpaperoverlay = {};
var storage = {};
var activecontent;
var previouscontent;
var activeopacity;
var previousopacity;
var disclaimer;

function initialize () {
	columnL = document.getElementById('columnL');
	schedule = document.getElementById('schedule');
	disclaimer = document.getElementById('disclaimer');

	// following lines are for navigation bar filling

	contentsandlabels.contents = document.body.getElementsByClassName('content');
	contentsandlabels.labels = new Array();
	contentsandlabels.labelname = new Array();
	contentsandlabels.opacity = 0.00;
	for (var i = 0; i < contentsandlabels.contents.length; i++) {
		contentsandlabels.labels[i] = document.createElement('div');
		contentsandlabels.labels[i].setAttribute('class', 'navigation');
		contentsandlabels.labels[i].addEventListener('click', displaycontent);
		contentsandlabels.labelname[i] = contentsandlabels.contents[i].getAttribute('id');
		contentsandlabels.labelname[i] = contentsandlabels.labelname[i][0].toUpperCase() + contentsandlabels.labelname[i].substr(1, contentsandlabels.labelname[i].length - 1);
		contentsandlabels.labels[i].innerHTML = contentsandlabels.labelname[i];
		contentsandlabels.labels[i].style['opacity'] = contentsandlabels.opacity.toString();
		columnL.appendChild(contentsandlabels.labels[i]);
	}
	labelsappeargradually();
	contentsandlabels.labels[0].style['background-color'] = '#F08880';
	contentsandlabels.labels[0].style['color'] = '#FFF';
	selection = 0;
	activecontent = contentsandlabels.contents[selection];

	// following lines are for thumbnail element creation

	var thumbnailelement;
	for (var i = 0; i < imagenames.length; i++) {
		thumbnailelement = document.createElement('img');
		thumbnailelement.setAttribute('class', 'wallpaperthumbnail');
		thumbnailelement.setAttribute('src', 'Wallpaper Thumbnails\\thumbnail ' + imagenames[i]);
		thumbnailelement.setAttribute('title', imagenames[i].substr(0, imagenames[i].length - 4));
		thumbnailelement.setAttribute('alt', i.toString());
		thumbnailelement.setAttribute('onclick', 'displayimage(this);');
		document.getElementById('wallpapercontainer').appendChild(thumbnailelement);
	}

	// following lines are for random phone number generation

	var phonenumberspan = document.getElementById('phonenumber');
	var randomphonenumber = "053";
	for (var i = 0; i < 11; i++)
		if (i == 1 || i == 5 || i == 8) {
			randomphonenumber += " ";
		} else {
			randomphonenumber += Math.floor( Math.random() * 10 ).toString();
		}
	phonenumberspan.innerHTML = randomphonenumber;

	// following lines are for image preloading

	for (var i = 0; i < imagenames.length; i++) {
		images.push(document.createElement('img'));
		images[i].src = 'Wallpapers\\' + imagenames[i];
		images[i].setAttribute('alt', i.toString());
		images[i].setAttribute('class', 'wallpaper');
	}

	// the following lines are for browser window resize adjustments

	window.onresize = sizechange;
	sizechange();
}

function labelsappeargradually (label) {
	var rate = window.PointerEvent ? 0.06 : 0.09;
	if (contentsandlabels.opacity > 1 - rate) {
		for (var i = 0; i < contentsandlabels.labels.length; i++)
			contentsandlabels.labels[i].style['opacity'] = '1.00';
	}
	else {
		contentsandlabels.opacity += rate;
		for (var i = 0; i < contentsandlabels.labels.length; i++)
			contentsandlabels.labels[i].style['opacity'] = contentsandlabels.opacity.toString();
		window.setTimeout(labelsappeargradually, 5);
	}
}

function modifyrightborder (collapse) {
	var marginwidth = 100 - window.innerWidth + document.body.clientWidth;
	if (collapse) {
		for (var i = 0; i < contentsandlabels.contents.length; i++) {
			contentsandlabels.contents[i].style['border-right-width'] = '0px';
		}
	}
	else {
		for (var i = 0; i < contentsandlabels.contents.length; i++) {
			contentsandlabels.contents[i].style['border-right-width'] = marginwidth + 'px';
		}
	}
}

function modifynavigation (shrink) {
	if (shrink) {
		for (var i = 0; i < contentsandlabels.labels.length; i++) {
			contentsandlabels.labels[i].innerHTML = contentsandlabels.labelname[i][0];
			contentsandlabels.contents[i].style['left'] = '65px';
		}
		columnL.style['width'] = '65px';
		disclaimer.style['left'] = '65px';
	}
	else {
		for (var i = 0; i < contentsandlabels.labels.length; i++) {
			contentsandlabels.labels[i].innerHTML = contentsandlabels.labelname[i];
			contentsandlabels.contents[i].style['left'] = '150px';
		}
		columnL.style['width'] = '150px';
		disclaimer.style['left'] = '150px';
	}
}

function sizechange () {
	modifyrightborder(window.innerWidth < 960);
	modifynavigation(window.innerWidth < 400);
}

function contentswitch () {
	var stepping = window.PointerEvent ? 0.04 : 0.10;
	activeopacity += stepping;
	previousopacity -= stepping;
	previouscontent.style['opacity'] = previousopacity.toString();
	activecontent.style['opacity'] = activeopacity.toString();
	if (activeopacity > 1 - stepping) {
		previouscontent.style['display'] = 'none';
		previouscontent.style['opacity'] = '0.00';
		activecontent.style['display'] = 'block';
		activecontent.style['opacity'] = '1.00';
		sizechange();
	}
	else {
		window.setTimeout(contentswitch, 5);
	}
}

function displaycontent (event) {
	var targetindex = contentsandlabels.labels.indexOf(event.target);
	if (selection != targetindex) {
		for (var i = 0; i < contentsandlabels.labels.length; i++) {
			if (contentsandlabels.labels[i] == event.target) {
				contentsandlabels.labels[i].style['background-color'] = '#F08880';
				contentsandlabels.labels[i].style['color'] = '#FFF';
			} else {
				contentsandlabels.labels[i].style['background-color'] = '';
				contentsandlabels.labels[i].style['color'] = '';
			}
		}

		if (previouscontent) {
			previouscontent.style['opacity'] = '0.00';
			previouscontent.style['display'] = 'none';
		}

		activeopacity = 0.05;
		previousopacity = 0.95;

		previouscontent = activecontent;
		previouscontent.style['opacity'] = previousopacity.toString();
		activecontent = contentsandlabels.contents[targetindex];
		activecontent.style['opacity'] = activeopacity.toString();
		activecontent.style['display'] = 'block';
		sizechange();
		contentswitch();

		selection = targetindex;
	}
}

function scheduletoggle () {
	if (schedule.style['display'] == 'none')
		schedule.style['display'] = 'table';
	else
		schedule.style['display'] = 'none';
}

function selectall (object) {
	// Thanks to Eugene at http://stackoverflow.com/a/14816523/2736228
	var range, selection;
    
    if (window.getSelection && document.createRange) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(object);
        selection.removeAllRanges();
        selection.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(object);
        range.select();
    }
}

function displayimage (thumb) {
	wallpaperoverlay.dim = document.createElement('div');
	wallpaperoverlay.dim.setAttribute('id', 'dimscreen');
	document.body.appendChild(wallpaperoverlay.dim);

	wallpaperoverlay.navigationoverlay = document.createElement('div');
	wallpaperoverlay.navigationoverlay.setAttribute('id', 'navigationoverlay');
	if (window.PointerEvent) {
		wallpaperoverlay.navigationoverlay.addEventListener('pointerdown', handledown);
		wallpaperoverlay.navigationoverlay.addEventListener('pointerup', handleup);
		wallpaperoverlay.navigationoverlay.addEventListener('pointermove', handlemove);
	}
	else {
		wallpaperoverlay.navigationoverlay.addEventListener('touchstart', handledown);
		wallpaperoverlay.navigationoverlay.addEventListener('touchend', handleup);
		wallpaperoverlay.navigationoverlay.addEventListener('touchmove', handlemove);
	}
	wallpaperoverlay.navigationoverlay.addEventListener('click', handleclick);
	wallpaperoverlay.navigationoverlay.style['z-index'] = '199';
	document.body.appendChild(wallpaperoverlay.navigationoverlay);

	wallpaperoverlay.currentindex = parseInt(thumb.getAttribute('alt'));
	wallpaperoverlay.navigationoverlay.appendChild(images[wallpaperoverlay.currentindex]);

	document.body.style['overflow'] = 'hidden';

	wallpaperoverlay.leftkeyincooldown = 0;
	wallpaperoverlay.rightkeyincooldown = 0;
	document.documentElement.addEventListener('keydown', handlearrowsdown);
	document.documentElement.addEventListener('keyup', handlearrowsup);
}

// function q () {
// 	wallpaperoverlay.wallpaperimage.dispatchEvent(wallpaperoverlay.customevent);
// }

// function handlecontextmenu (event) {
// 	event.preventDefault();
// 	var wallpaperrectangle = wallpaperoverlay.wallpaperimage.getBoundingClientRect();
// 	if (event.clientX >= wallpaperrectangle.left && event.clientX <= wallpaperrectangle.right && event.clientY >= wallpaperrectangle.top && event.clientY <= wallpaperrectangle.bottom) {
// 		wallpaperoverlay.customevent = document.createEvent('MouseEvents');
// 		wallpaperoverlay.customevent.initMouseEvent('click', true, true, window, 0, event.screenX, event.screenY, event.clientX, event.clientY, false, false, false, false, 2, null);
// 		window.setTimeout(q, 10);
// 	}
// 	return false;
// }

// 27 is for escape
// 37 is for left arrow
// 39 is for right arrow

function handlearrowsup (event) {
	if (event.keyCode == 27) {
		hideimage();
	}
	if (event.keyCode == 37 && wallpaperoverlay.leftkeyincooldown) {
		window.clearTimeout(wallpaperoverlay.leftkeytimeout);
		wallpaperoverlay.leftkeytimeout = null;
		wallpaperoverlay.leftkeyincooldown = 0;
	}
	if (event.keyCode == 39 && wallpaperoverlay.rightkeyincooldown) {
		window.clearTimeout(wallpaperoverlay.rightkeytimeout);
		wallpaperoverlay.rightkeytimeout = null;
		wallpaperoverlay.rightkeyincooldown = 0;
	}
}

function handlearrowsdown (event) {
	var cooldown = 400;
	if (event.keyCode == 37 && !wallpaperoverlay.leftkeyincooldown) {
		prev(false);
		wallpaperoverlay.leftkeyincooldown = 1;
		wallpaperoverlay.leftkeytimeout = window.setTimeout(function() {wallpaperoverlay.leftkeyincooldown = 0;}, cooldown);
	}
	if (event.keyCode == 39 && !wallpaperoverlay.rightkeyincooldown) {
		next();
		wallpaperoverlay.rightkeyincooldown = 1;
		wallpaperoverlay.rightkeytimeout = window.setTimeout(function() {wallpaperoverlay.rightkeyincooldown = 0;}, cooldown);
	}
}

function handledown (event) {
	storage.a = window.PointerEvent ? event.pageX : event.changedTouches[0].pageX;
	storage.b = window.PointerEvent ? event.pageY : event.changedTouches[0].pageY;
	if (window.PointerEvent)
		storage.q = 1;
	wallpaperoverlay.initialindex = wallpaperoverlay.currentindex;
}

function prev (frommove) {
	if (wallpaperoverlay.currentindex > 0) {
		if (wallpaperoverlay.currentindex == wallpaperoverlay.initialindex && frommove) {
			wallpaperoverlay.navigationoverlay.appendChild(images[wallpaperoverlay.currentindex - 1]);
			images[wallpaperoverlay.initialindex].style['opacity'] = '0.00';
		}
		else if (wallpaperoverlay.currentindex - 1 == wallpaperoverlay.initialindex && frommove) {
			images[wallpaperoverlay.initialindex].style['opacity'] = '1.00';
			wallpaperoverlay.navigationoverlay.removeChild(images[wallpaperoverlay.currentindex]);
		}
		else
			wallpaperoverlay.navigationoverlay.replaceChild(images[wallpaperoverlay.currentindex - 1], images[wallpaperoverlay.currentindex]);
		wallpaperoverlay.currentindex--;
	}
}

function next (frommove) {
	if (wallpaperoverlay.currentindex < imagenames.length - 1) {
		if (wallpaperoverlay.currentindex == wallpaperoverlay.initialindex && frommove) {
			wallpaperoverlay.navigationoverlay.appendChild(images[wallpaperoverlay.currentindex + 1]);
			images[wallpaperoverlay.initialindex].style['opacity'] = '0.00';
		}
		else if (wallpaperoverlay.currentindex + 1 == wallpaperoverlay.initialindex && frommove) {
			images[wallpaperoverlay.initialindex].style['opacity'] = '1.00';
			wallpaperoverlay.navigationoverlay.removeChild(images[wallpaperoverlay.currentindex]);
		}
		else {
			wallpaperoverlay.navigationoverlay.replaceChild(images[wallpaperoverlay.currentindex + 1], images[wallpaperoverlay.currentindex]);
		}
		wallpaperoverlay.currentindex++;
	}
}

function prevornext () {
	var wallpaperrectangle = images[wallpaperoverlay.currentindex].getBoundingClientRect();
	if (storage.x < wallpaperrectangle.left || storage.x > wallpaperrectangle.right || storage.y < wallpaperrectangle.top || storage.y > wallpaperrectangle.bottom)
		hideimage();
	else {
		var wallpaperwidth = wallpaperrectangle.right - wallpaperrectangle.left;
		if (storage.x >= wallpaperrectangle.left && storage.x <= wallpaperrectangle.left + wallpaperwidth * 0.4)
			prev(false);
		else if (storage.x <= wallpaperrectangle.right && storage.x >= wallpaperrectangle.right - wallpaperwidth * 0.4)
			next(false);
	}
}

function distancesquared (x, a, y, b) {
	x -= a;
	y -= b;
	return x * x + y * y;
}

function handlemove (event) {

	if (!(window.PointerEvent) || event.pointerType == 'touch') {
		event.preventDefault();

		var thresholddistance = 110;
		var thresholdangle = Math.PI / 4;

		storage.x = window.PointerEvent ? event.pageX : event.changedTouches[0].pageX;
		storage.y = window.PointerEvent ? event.pageY : event.changedTouches[0].pageY;

		if (distancesquared(storage.x, storage.a, storage.y, storage.b) > thresholddistance * thresholddistance) {
			var swipeangle = Math.atan2(storage.y - storage.b, storage.x - storage.a);
			if (swipeangle > Math.PI - thresholdangle || swipeangle < thresholdangle - Math.PI)
				next(true);
			else if (swipeangle < thresholdangle && swipeangle > -thresholdangle)
				prev(true);

			if (window.PointerEvent)
				storage.q = 0;

			storage.a = storage.x;
			storage.b = storage.y;
		}
	}
}

function handleup (event) {
	if (wallpaperoverlay.currentindex != wallpaperoverlay.initialindex) {
		wallpaperoverlay.navigationoverlay.removeChild(images[wallpaperoverlay.initialindex]);
		images[wallpaperoverlay.initialindex].style['opacity'] = '1.00';
	}
}

function handleclick (event) {
	storage.x = event.clientX;
	storage.y = event.clientY;
	if (storage.q || !(window.PointerEvent))
		prevornext();
	if (window.PointerEvent)
		storage.q = 1;
}

function hideimage () {

	document.body.removeChild(wallpaperoverlay.dim);
	document.body.removeChild(wallpaperoverlay.navigationoverlay);

	document.documentElement.removeEventListener('keydown', handlearrowsdown);
	document.documentElement.removeEventListener('keyup', handlearrowsup);
	document.body.style['overflow'] = 'auto';
}

// function nametaker (namespan) {
// 	var nameinput = document.createElement('input');
// 	nameinput.setAttribute('type', 'text');
// 	nameinput.setAttribute('autofocus', 'true');
// 	nameinput.setAttribute('formaction', 'getname(this);');
// 	nameinput.setAttribute('formmethod', 'get');
// 	namespan.parentNode.replaceChild(nameinput, namespan);
// }

// function getname (nameinput) {
// 	var namespan = document.createElement('span');
// 	namespan.innerHTML = nameinput.innerHTML;
// 	nameinput.parentNode.replaceChild(namespan, nameinput);
// }