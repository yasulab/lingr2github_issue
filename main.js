// NOTE: Change this base URL to your github repository's issue.
var baseUrl = "http://github.com/yasulab/lingr2github_issue/issues/";


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



   
