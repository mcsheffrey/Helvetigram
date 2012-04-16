/* Author: Connor McSheffrey

*/

(function() {

	var Twitter = {
		init: function( config ) {
			
			this.url = 'https://api.instagram.com/v1/media/popular?client_id=' + config.clientID + '&callback=?';
			this.template = config.template;
			this.container = config.container;
			this.photoDimension = config.photoDimension;

			this.fetch();
			this.flip();
		},

		attachTemplate: function() {
			var template = Handlebars.compile( this.template );

			this.container.append( template( this.grams ) );

		},

		flip: function() {
			console.log(this.grams);
			
		},

		fetch: function() {
			var self = this;

			$.getJSON( this.url, function( data ) {
				
				
				self.grams = $.map( data.data, function( gram ) {
					return {
						image: gram.images.low_resolution.url,
						id: gram.id,
						height: $('#main').width()/6,
						width: $('#main').width()/6,
					};
				});

				// For future lessons, research $.deferred, viewers. :)
				self.attachTemplate(); 
				self.flip();

				$('img').lazyload({ 
	    		effect : "fadeIn"
	 			});
			});
		}
	};

	Twitter.init({
		template: $('#photos-template').html(),
		container: $('#main'),
		clientID: '5ee7e77d7b0b441f9cd307a5f30c92bb'
	});

})();

// (function($) {
// 	var opts = {
// 		color: '#fff'
// 	},
// 	spinner = new Spinner(opts).spin();
// 	$('#main').append(spinner.el);

// 	var clientID = '5ee7e77d7b0b441f9cd307a5f30c92bb',
// 			containerWidth = $('#main').width(),
// 			photoDimension = containerWidth/4;

// 			console.log(containerWidth);


			

//   $.ajax({
//     url: 'https://api.instagram.com/v1/media/popular?client_id=' + clientID + '&callback=callbackFunction',
//     type: 'GET',
//     dataType: 'jsonp',
//     data: {param1: 'value1'},
//     complete: function(xhr, textStatus) {
//       //called when complete
//     },
//     success: function onPhotoLoaded(data) {

//     		console.log(data);

//     		var photos = data.data,
//     				photoLength = photos.length;

    		
//         if(data.meta.code == 200) {
            
//             if(photoLength > 0) {
//                 for (var i = 0; i <= photos.length/2; i++) {
                    
//                     var str = '<img id="' + data.data[i].id + '" data-original="' + data.data[i].images.low_resolution.url + '" height="' + photoDimension + '" width="' + photoDimension + '" src="img/blank.gif" />';
//                     $('<div></div>').addClass('photo').html(str).appendTo('#main');

//                     spinner.stop();

//                     $('img').lazyload({ 
//     									effect : "fadeIn"
// 										});

// 										console.log('1' + data.data[i].id );

//                 }

//                 for (var i = photoLength/2; i <= photoLength; i++) {
//                 	photos = data.data

//                 	console.log(i);

//                 	console.log(data[i]);

//                 	var str = '<img class="reverse" id="' + photos[i].id + '" data-original="' + data.data[i].images.low_resolution.url + '" height="' + photoDimension + '" width="' + photoDimension + '" src="img/blank.gif" />';

//                 	$('#main img:eq(data.data[i]').append(str);

//                 	console.log('2' + data.data[i].id);
                	
//                 }
//             }else{
//                 alert('empty');
//             }
            
//         }else{
//             alert(data.meta.error_message);
//         }
//     },
//     error: function(xhr, textStatus, errorThrown) {
//       //called when there is an error
//     }
//   });
  
// })(jQuery); 


// var access_token = '3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f';

//     loadFeed();

//     function loadFeed() {
//         var param = {access_token:access_token};
//         cmd(param, onPhotoLoaded);
//     }

//     function cmd(param, callback) {
//         //popular
//         var cmdURL = 'https://api.instagram.com/v1/media/popular?callback=?';
//         $.getJSON(cmdURL, param, callback);
//     }
// for (var i = 0; i <= data.data.length; i++) {
//     		$('#main').append('<img src="' + data.data[i].images.low_resolution.url + '" />')
//     	};
    