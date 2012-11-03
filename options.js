$( function(){
  $().toastmessage( { position : 'middle-center' } );

  // Notice
  $( '#demo-notice' ).click( function(){
    $().toastmessage( 'showNoticeToast', 'Add a test link to "#1".' );
  });
 // Success
  $( '#demo-success' ).click( function(){
    $().toastmessage( 'showSuccessToast', 'Successfully saved.' );
  });
  // Warning
  $( '#demo-warning' ).click( function(){
    $().toastmessage( 'showWarningToast', 'warning' );
  });
  // Error
  $( '#demo-error' ).click( function(){
    $().toastmessage( 'showErrorToast', 'error' );
  });

  // Example Option
  $( '#demo-option' ).click( function(){
    $().toastmessage( 'showToast', {
      text   : 'message text',
		sticky : true, // popup remains forever
      type   : 'notice'
    });
  });
});

function trimSlash(input) {
    // do something like strip('/') in Ruby
    return input.replace(/^\/+|\/+$/g, '');
}

function saveToLocalStorage(trimmedUrl){
    var data = trimmedUrl.split('/');
    localStorage['username'] = data[0];
    localStorage['reponame'] = data[1];
}

function createTestLink(username, reponame) {
    return "http://github.com/" + username + "/" + reponame + "/issues/1";
}

function restoreInput() {
    username = localStorage['username'] ? localStorage['username'] : defaultUsername;
    reponame = localStorage['reponame'] ? localStorage['reponame'] : defaultReponame;
    $('#path2repo').val(username+"/"+reponame);
}

function saveInput() {
    userInput = $('#path2repo').val();
    trimmedInput = trimSlash(userInput);
    //localStorage['path2repo'] = trimmedInput;
    $().toastmessage( 'showSuccessToast', 'Successfully saved.' );
    
    saveToLocalStorage(userInput);
}

function checkInput() {
    //userInput = localStorage['userInput'];
    //trimmedInput = trimSlash(userInput);
    
    $('#testLink').html("<a href='" +
			createTestLink(localStorage['username'],localStorage['reponame'])+
			"'>#1</a>");
    $().toastmessage( 'showNoticeToast', 'Add a test link to "#1".' );
}

function clearInput() {
    localStorage.clear();
}

var defaultUsername = "yasulab";
var defaultReponame = "lingr2github_issue";

$("#saveBtn").click(function(){ saveInput(); });
$("#checkBtn").click(function(){ checkInput(); });
$("#clearBtn").click(function(){ clearInput(); });

// restore from local strage when opened
$(document).ready(function() {
	restoreInput();

	// enter to save
	$("#path2repo").keypress(function (ev) {
		if ((ev.which && ev.which === 13) ||
		    (ev.keyCode && ev.keyCode === 13)) {
		    saveInput();
		}
	    });
    });
