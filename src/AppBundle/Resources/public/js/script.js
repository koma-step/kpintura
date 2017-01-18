function openDropdown(id){
	document.getElementById(id).className = 'dropdown open';
}

function closeDropdown(id){
	document.getElementById(id).className = 'dropdown';
}

function focusSearchInput(){
	document.getElementById('search-input').focus();
}

function submitSearch(){
	document.getElementById('form-search').submit();
}