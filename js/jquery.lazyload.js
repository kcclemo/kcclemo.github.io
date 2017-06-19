/**
 * A jQuery plugin that help you improve your overall site performance.
 * LazyLoader v1.0.0 (https://github.com/RobinBertilsson/jquery-lazyload)
 * Copyright 2017.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
	throw new Error('$.lazyLoad requires jQuery');
}

(function ($) {
	'use strict';

	/**
	 * @param {any} property - The property you want to check.
	 * @param {any} defaultValue - The fallback value to return.
	*/
	var ifEmptyUse = function (property, defaultValue) {
		if (property)
			return property;
		else 
			return defaultValue;
	}

	/**
	 * @param {string} title - The console.log title.
	 * @param {any} toLog - The message to log.
	 * @param {object} options - The message to log.
	*/
	var printDebug = function (toLog, options, title, level) {
		if (!title) title = "";
		if (!level) level = 'log';
		if (options.debug) console[level](title, toLog)
	}

	var loadImage = function (path, doneClass) {
		return $('<img src="'+ path +'" class="'+ doneClass +'">').trigger('load', function () {
			console.log("loaded");
		});
	}

   	/**
	 * @param {string} options.attribute - The data-attr with the high-res image url.
	 * @param {string} options.doneClass - The class to append when the img is loaded (success).
	 * @param {number} options.timeout - Sets a timeout before loading the image.
	 * @param {boolean} options.debug - Will console.log all actions.
	*/
	$.fn.lazyLoad = function (options) {
		if (!options)
			options = {};

		var defaults = {
			attribute: ifEmptyUse(options.attribute, 'data-src'),
			doneClass: ifEmptyUse(options.doneClass, 'lazy-success'),
			timeout: ifEmptyUse(options.timeout, 0),
			debug: ifEmptyUse(options.debug, false)
		};

		printDebug("You're running $.lazyLoad in debug mode, this is not recommended for production", options, '', 'info');
		printDebug(defaults, options, "[LazyLoad Options]");

		var imgSrc = $(this).attr(defaults.attribute);
		var $image = loadImage(imgSrc, defaults.doneClass);
		var $parent = $(this).parent();

		$image.one("load", function() {
			printDebug($image, options, "[Image loaded]");
			$parent.css('position', 'relative');
			$parent.append($image);
		});
	}
})(jQuery);
