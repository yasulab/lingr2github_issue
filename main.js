var option = null ;

// get data first
chrome.extension.sendRequest( { 
        //localStorageからuserIdとpasswdを読み込むお願いをする
        action : "getValues" , 
	    args   : [{ 
		"username" : "" ,
		"reponame" : ""
		    }]
	    } , function( response ){
        option = response.values ;

        // Then, start content script.
        main();
    });

function main(){
    username = option["username"] ? option["username"] : "yasulab" ;
    reponame = option["reponame"] ? option["reponame"] : "lingr2github_issue" ;

    var baseUrl = "https://github.com/" + username + "/" + reponame + "/issues/";

    var result = '';
    // need to wait for rendering #decorated_text by Lingr.
    $(document).delay(1500).queue(function(){
	    $(".decorated p").each(function() {
		    result = $(this).html();
		    result = result.replace(/#([0-9]+)/g, "<a href='"+baseUrl+"$1'>#$1</a>");
		    $(this).html( result );
		});

	    // start replacing after #decorated_text was rendered.
	    $(document).dequeue();
	});
}