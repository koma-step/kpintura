function overStarbox(id){
	var value = parseInt(id[id.length-1]);
	for(var i = 1; i <= value; i++){
		document.getElementById('starbox-'+i).className = "starbox starbox-active col-md-5";
	}
	switch(value){
		case 1: document.getElementById('starbox-hint').innerHTML = "Pas à votre goût...";
		break;
		case 2: document.getElementById('starbox-hint').innerHTML = "Peut mieux faire";
		break;
		case 3: document.getElementById('starbox-hint').innerHTML = "Assez cool";
		break;
		case 4: document.getElementById('starbox-hint').innerHTML = "Superbe !";
		break;
		case 5: document.getElementById('starbox-hint').innerHTML = "Magnifique ! :-D";
		break;
	}
}

function clickStarbox(id){
	var value = id[id.length-1];
	document.getElementById('starbox-note').value = value;
	leaveStarbox();
}

function leaveStarbox(){
	if(note != ""){
		var note = document.getElementById('starbox-note').value;
			note = Math.round(parseFloat(note));

		for(var i = 1; i <= 5; i++){
			if(i < note)
				document.getElementById('starbox-'+i).className = "starbox starbox-active col-md-5";
			else if(i == note)
				document.getElementById('starbox-'+i).className = "starbox starbox-selected col-md-5";
			else
				document.getElementById('starbox-'+i).className = "starbox starbox-passive col-md-5";
		}
	}
	else{
		for(var i = 1; i <= 5; i++)
			document.getElementById('starbox-'+i).className = "starbox starbox-active col-md-5";
	}
	document.getElementById('starbox-hint').innerHTML = "";
}