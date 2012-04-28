// Connor McSheffrey
// @mcsheffrey


(function() {

	var Twitter = {
		init: function( config ) {
			
			this.url = 'https://api.instagram.com/v1/media/popular?client_id=' + config.clientID + '&callback=?';
			this.template = config.template;
			this.container = config.container;
			this.photosWidth = config.photosWidth;
			this.photos = [];
			this.count = 0;
			this.looped = true;

			// set the img to have fixed dimensions, we'll switch this to percentages once the page loads
			this.photoDimension = $('#main').width()/this.photosWidth;

			// Round up how many photos fit vertically in the window
			this.photosHeight = Math.ceil(($(window).height() / this.photoDimension) * 1) / 1;

			// Number of photos we want to load to fill the window
			this.photoLimit = this.photosHeight*this.photosWidth;
			
			this.refresh();
		},

		// Fetch popular feed from Instragram API
		fetch: function() {
			return $.ajax({
				url: this.url,
				dataType: 'jsonp'
			});
		},

		refresh: function() {
			var self = this;

			this.fetch().done(function(results) {

				self.mapGrams(results);

				$('img').lazyload({ 
	    		effect : "fadeIn"
	 			});
				
			});
		},

		// Map results to photos array
		mapGrams: function(results) {

			var self = this;

			if (results.meta.code === 200 ) {

					function photo(front,back) {
						this.front = front;
						this.back = back;
					}
					

					for (var i = 0; i < results.data.length; i++) {
						console.log(self.count);
						
						self.photos.push(new photo(results.data[i], results.data[i+1]));
						i++
					};

					console.log(self.photos);
					
					console.log(self.photos.length);
					console.log(self.photoLimit);
					
					

					// if (self.photos.length < self.photoLimit) {


					// 	self.refresh();
					// } else {
						self.buildFrag();
						self.attachTemplate();
						self.flip();
					// }

			} else {
				console.log('no results');
			}

		},

		// Compile the handlebars template
		attachTemplate: function() {

			var template = Handlebars.compile( this.template );

			this.container.append( template( this.grams ) );			
			
		},

		// Fisher–Yates shuffle
		shuffle: function(array) {
    	var tmp, current, top = array.length;
	
    	if(top) while(--top) {
    	    current = Math.floor(Math.random() * (top + 1));
    	    tmp = array[current];
    	    array[current] = array[top];
    	    array[top] = tmp;
    	}
	
    	return array;
		},

		// Randomly add css flip transform to each photo then remove in reverse order
		flip: function() {
			var self = this;

			var photoContainers = $('#main').children('.photo-container'),
					index = 0;
			this.shuffle(photoContainers);

			photoContainers.each(function(i) {
			  setTimeout(function () {
    			$(photoContainers[index]).addClass('flip');
    			
   	 			index++;
				}, i*4000);
			});

		},

		// build handlebars template grams
		buildFrag: function() {
			var self = this;

			console.log(self.photos);
			

			this.grams = $.map( self.photos, function( gram, index ) {
				
					return {
						front: gram.front.images.low_resolution.url,
						back: gram.back.images.low_resolution.url,
						id: gram.id,
						height: self.photoDimension,
						width: self.photoDimension,
					};
				});

		}

	};

	Twitter.init({
		template: $('#photos-template').html(),
		container: $('#main'),
		clientID: '5ee7e77d7b0b441f9cd307a5f30c92bb',
		photosWidth: 4
	});

})();
    