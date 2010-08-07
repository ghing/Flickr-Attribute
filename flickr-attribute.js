/*
 * This script is based on jQuery Bookmarklet - version 1.0 originally written 
 * by Brett Barros with modifications by Paul Irish 
 * (http://latentmotion.com/how-to-create-a-jquery-bookmarklet/)
 *
 * If you use this script, please link back to the source
 *
 * Copyright (c) 2010 Latent Motion (http://latentmotion.com/how-to-create-a-jquery-bookmarklet/)
 * Released under the Creative Commons Attribution 3.0 Unported License,
 * as defined here: http://creativecommons.org/licenses/by/3.0/
 *
 */
 
window.bookmarklet = function(opts){fullFunc(opts)};
 
// These are the styles, scripts and callbacks we include in our bookmarklet:
window.bookmarklet({

    // You can include your own js/css
    js  : ['http://geoff.terrorware.com/js/zeroclipboard/ZeroClipboard.js'],    
    css : ['http://geoff.terrorware.com/hacks/flickr-attribute/flicker-attribute.css'],
    //jqpath : 'myCustomjQueryPath.js', <-- option to include your own path to jquery
    ready : function() {
	// The meat of your jQuery code goes here
        ZeroClipboard.setMoviePath( 'http://geoff.terrorware.com/js/zeroclipboard/ZeroClipboard.swf' );

	username = $(".username a").html();
        username_href = $(".username a").attr("href");
        realname = $(".realname a").html();
        user_photostream_url = "http://flickr.com" + username_href;
        photo_url = window.location.href;
        name = (realname != 'No real name given') ? realname : username; 
        license_url = $("a[rel*='license']").attr("href");
        if (license_url) {
          license_url_parts = license_url.split('/');
          license = license_url_parts[4];
          license_text = " using a <a href=\"" + license_url + "\">CC-" + license.toUpperCase() + "</a> license";
        }
        else {
          license_text = '';
        }

        attribution_text = "Photo by <a href=\"" + user_photostream_url + 
                          "\">" + name + "</a> via <a href=\"" + photo_url +
                          "\">Flickr</a>" + license_text + "."; 

        bar_html = '<div id="flickr-attribute"><input id="flickr-attribute-text" type="text" /> <div id="flickr-attribute-copy-button">Copy</div> <div id="flickr-attribute-close-button"><a onclick="close_flickr_attribute();">Close</a></div></div>' 

        $('body').first().prepend(bar_html);
        $("#flickr-attribute input[type='text']").attr('value', attribution_text);

        var clip = new ZeroClipboard.Client();
        clip.setText(attribution_text);

        clip.addEventListener( 'mouseDown', function(client) { 
            // set text to copy here
            clip.setText($("#flickr-attribute-text").attr("value"));
        } );

        clip.glue('flickr-attribute-copy-button');
                        
    }
})

function close_flickr_attribute() {
    $("#flickr-attribute").detach();
}

function fullFunc(a){function d(b){if(b.length===0){a.ready();return false}$.getScript(b[0],function(){d(b.slice(1))})}function e(b){$.each(b,function(c,f){$("<link>").attr({href:f,rel:"stylesheet"}).appendTo("head")})}a.jqpath=a.jqpath||"http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";(function(b){var c=document.createElement("script");c.type="text/javascript";c.src=b;c.onload=function(){e(a.css);d(a.js)};document.body.appendChild(c)})(a.jqpath)};
