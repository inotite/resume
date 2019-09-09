// plug it in, plug it in
(function($) {

	var paraCount = function() {

		return {

			options: {
				itemClass: 'awesome',
				baseUrl: "/",
				navPath: "",
				callMe: function() {
					console.log("ring, ring...");
				}
			},

			// --------------------------------------------------------------------

			init: function(options, element) {
				this.options = $.extend(this.options, options);
				this.elem = element;
				this.attachEvents();
				this.someMethod();
			},

			// --------------------------------------------------------------------

			someMethod: function() {
				alert('someMethod called');
				return $(this.elem); // for chaining
			},

			// --------------------------------------------------------------------

			attachEvents: function() {

				var self = this;

				/////////////////////////

				$(self.elem).on("hover", function(e) {
					
					alert(1);

					var $currentElement = $(this),
						$paragraphs;

					$paragraphs = $(self.elem).find("p");
					$paragraphs.addClass(self.options.itemClass).css({ "color" : "red" });

					self.paragraphCount = $paragraphs.length;

				});

				/////////////////////////

				$(self.elem).on("click", function(e) {

					console.log("SAASDSADSA");
					
					/*

					var request = $.ajax({
						url: self.options.baseUrl,
						type: "POST",
						data: { "id" : 7 },
						dataType: "html"
					});

					e.preventDefault();

					request.success(function(msg) {
						console.log(msg);
					});

					request.error(function(jqXHR, textStatus) {
						console.warn("Request failed.");
					});

					request.complete(function(jqXHR, textStatus) {
						console.log("done!");
						self.options.callMe();
					});


					*/
				});

			}

		};

	};

	// --------------------------------------------------------------------

	$.fn.paraCount = function(options) {
		// create an instance for each element in the set
		return this.each(function() {
			var myParaCount = new paraCount();
			myParaCount.init(options, this);
			// this lets us call methods on the selector
			$(this).data("paraCount", myParaCount);
		});
	};

})(jQuery);