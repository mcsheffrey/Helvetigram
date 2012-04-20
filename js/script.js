// Connor McSheffrey
// @mcsheffrey


(function() {

	var Twitter = {
		init: function( config ) {
			
			this.url = 'https://api.instagram.com/v1/media/popular?client_id=' + config.clientID + '&callback=?';
			this.template = config.template;
			this.container = config.container;
			this.photoDimension = config.photoDimension;

			this.refresh();
		},

		// Compile the handlebars template
		attachTemplate: function() {
			var template = Handlebars.compile( this.template );

			this.container.append( template( this.grams ) );			
			
		},

		refresh: function() {
			var self = this;

			this.fetch().done(function(results) {

				self.buildFrag(results);
				self.attachTemplate();
				self.flip();

				$('img').lazyload({ 
	    		effect : "fadeIn"
	 			});
				
			});
		},

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

		flip: function() {

			self = this;

			var photoContainers = $('#main').children('.photo-container'),
					index = 0;
			this.shuffle(photoContainers);

			photoContainers.each(function(i) {
			  setTimeout(function () {
    			$(photoContainers[index]).addClass('flip');
    			console.log($(photoContainers[index]));
    			
   	 			index++;
				}, i*4000);
			});

		},

		buildFrag: function(results) {
			var self = this;

			this.grams = $.map( results.data, function( gram ) {
					return {
						image: gram.images.low_resolution.url,
						id: gram.id,
						height: $('#main').width()/6,
						width: $('#main').width()/6,
					};
				});

		},

		fetch: function() {
			return $.ajax({
				url: this.url,
				dataType: 'jsonp'
			});
		}
	};

	Twitter.init({
		template: $('#photos-template').html(),
		container: $('#main'),
		clientID: '5ee7e77d7b0b441f9cd307a5f30c92bb'
	});

})();
    