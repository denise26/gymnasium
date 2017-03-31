// JavaScript Document
//adding functions from other sources	
	(function(window){

	// watchResize method
	// https://gist.github.com/aarongustafson/4157402
	window.watchResize = function( callback ){
        var resizing;
        callback.size = 0;
        function done()
        {
            var curr_size = window.innerWidth;
            clearTimeout( resizing );
            resizing = null;
            // only run on a true resize
            if ( callback.size != curr_size )
            {
                callback();
                callback.size = curr_size;
            }
        }
        window.addEventListener('resize', function(){
            if ( resizing )
            {
                clearTimeout( resizing );
                resizing = null;
            }
            resizing = setTimeout( done, 50 );
        });
        // init
        callback();
    };
	
	//adding mediaq
	// Get the active Media Query as defined in the CSS
	// Use the following format:
	// #getActiveMQ-watcher { font-family: "default"; }
	// @media only screen and (min-width:20em){ #getActiveMQ-watcher { font-family: "small"; } }
	// etc.
	window.getActiveMQ = function()
	{
			// Build the watcher
		var $watcher = document.createElement('div'),
			// alias getComputedStyle
			computed = window.getComputedStyle,
			// Regexp for removing quotes
			re = /['"]/g;
		
		// set upt the watcher and add it to the DOM
		$watcher.setAttribute( 'id', 'getActiveMQ-watcher' );
		$watcher.style.display = 'none';
		document.body.appendChild( $watcher );
		
		// We’ll redefine this method the first time it’s run
		// For old IE
		if ( 'currentStyle' in $watcher )
		{
			window.getActiveMQ = function()
			{
				return $watcher.currentStyle['fontFamily'].replace( re, '' );
			};
		}
		// For modern browsers
		else if ( computed )
		{
			window.getActiveMQ = function()
			{
				return computed( $watcher, null ).getPropertyValue( 'font-family' ).replace( re, '' );
			};
		}
		// For everything else
		else
		{
			window.getActiveMQ = function()
			{
				return 'unknown';
			};
		}
		return window.getActiveMQ();
	};

	
	//my code

if (! 'classList' in document.body ){ return; }


var $html=document.getElementsByTagName('html')[0],
    page_classes = $html.classList,
	$menu_opener = document.getElementById( 'nav-jump' ), 
	$menu_closer = document.getElementById( 'menu-close' ),	
    drawer_enabled_class = 'drawer-nav-enabled',
	drawer_open_class = 'drawer-nav-open';
	

var toggleDrawerNav_running = false;
function toggleDrawerNav( event ) {
	event.preventDefault();
	//check to mkae sure it's not already running
	if ( toggleDrawerNav_running ){ return; }
	// block any secondary requests until finished
	toggleDrawerNav_running = true;
	//toggle class
	page_classes.toggle( drawer_open_class );
	
	
	//timeout function: turns off toggledrawernav after set time
	//time measured in miliseconds (touch devices have delay of 300 ms. toggles running indicator off once animation finished
	
	setTimeout( function(){
		toggleDrawerNav_running= false;
		}, 500);
	}
	// runs previous watch resize function 
	window.watchResize(function(){
	
			var current_MQ = window.getActiveMQ();
	
		if( current_MQ == 'small' && 
		! page_classes.contains(drawer_enabled_class)){
			page_classes.add( drawer_enabled_class );

			//handle hte click and touch events
$menu_opener.addEventListener('click', toggleDrawerNav, false);
$menu_opener.addEventListener('touchdown', toggleDrawerNav, false);
$menu_closer.addEventListener('click', toggleDrawerNav, false);
$menu_closer.addEventListener('touchdown', toggleDrawerNav, false);

			//add the enabled class

		} else if (window, current_MQ != 'small' &&  page_classes.contains('drawer-nav-enabled')){
			//ignore these events
			//remove enabled class
//disable drawr style


$menu_opener.removeEventListener('click', toggleDrawerNav, false);
$menu_opener.removeEventListener('touchdown', toggleDrawerNav, false);
$menu_closer.removeEventListener('click', toggleDrawerNav, false);
$menu_closer.removeEventListener('touchdown', toggleDrawerNav, false);
page_classes.remove(drawer_enabled_class);
			}
	});
	}(this));