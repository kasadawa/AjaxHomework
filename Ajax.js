/**
 * 
 */

var Ajax = {
	
	getXHR: function() {
		var request;
		
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		}
		
		if (typeof ActiveXObject != 'undefined') {
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
		
		throw new Error('AJAX is not supported');
	},
	
	/**
	 * 
	 * @param method
	 * @param url
	 * @param params - {username: 'admin', pass: 'admin'} -> username=admin&pass=admin
	 * @param isAsync
	 * @param callback
	 */
	makeRequest: function(method, url, params, isAsync, callback) {
		var xhr = this.getXHR();
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				callback(xhr);
			}
		}
		
		isAsync = isAsync ? true : false;
		if (method == 'GET') {
			if (url.indexOf('?') != -1) {
				// http://test.com?a=b
				// http://test.com?a=b&username=admin&pass=admin
				url += '&';
			} else {
				//http://test.com/test.php
				//http://test.com/test.php?username=admin&pass=admin
				url += '?';
			}
			
			url += this.parseParams(params);
		}
		
		
		
		xhr.open(method, url, isAsync);
		if (method == 'POST') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		xhr.send(method == 'POST' ? this.parseParams(params) : null );
	},
	parseParams: function(params) {
		var paramsAsString = [];
		
		for (var key in params) {
			var pair = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
			paramsAsString.push(pair);
		}
		
		return paramsAsString.join('&');
	}
		
}