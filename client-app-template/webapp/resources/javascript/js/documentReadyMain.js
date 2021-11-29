$(document)
			.ready(
					function() {

						$('#Add')
								.click(
										function() {
											$('#pane')
													.append(
															$('<textarea class="new" rows="1" cols="40"></textarea><br/>'));
											//$('textarea:last').focus();
										});

						$('#Add2')
								.click(
										function() {
											$('#pane')
													.append(
															$('<textarea class="new" rows="1" cols="40">Some text</textarea><br/>'));
											$('textarea:last').focus();
										});

						//inital resize
						resizeTextArea($('#responseShopCartBase'));

						// 						//'live' event
						// 						$('.textarea').live('keyup', function(event) {
						// 							event.preventDefault();
						// 							var elem = $(this);

						// 							//bind scroll
						// 							if (!elem.data('has-scroll')) {
						// 								elem.data('has-scroll', true);
						// 								elem.bind('scroll keyup', function() {
						// 									resizeTextArea($(this));
						// 								});
						// 							}

						// 							resizeTextArea($(this));
						// 						});

						$('#submitAjax').click(function(event) {
							event.preventDefault();
							var username = $('#userTest').val();
							$.get('ActionServlet', {
								user : username
							}, function(responseText) {

								$('#welcometext').text(responseText);

								console.log(responseText);

							});
						});

						$('#submitPrimeJSFEJB3')
								.click(
										function(event) {
											event.preventDefault();

											$(location)
													.attr('href',
															window.location.href + 'listaMercadorias.jsf');
											//				'http://wservices-sysmartek.rhcloud.com/listaMercadorias.jsf');
											//  					$(window).attr('location','http://localhost:8080/cdi-jsf-1.0/');
											//  					$(location).prop('href', 'http://localhost:8080/cdi-jsf-1.0/');

										});
						
						$('#submitSpringMVC')
								.click(
										function(event) {
											event.preventDefault();

											alert('Meu amor Preciso Estudar Sprimg MVC');
											return null;

											$(location)
													.attr('href',
															window.location.href + 'listaMercadorias.jsf');
											//  					$(window).attr('location','http://localhost:8080/cdi-jsf-1.0/');
											//  					$(location).prop('href', 'http://localhost:8080/cdi-jsf-1.0/');

										});

						$("a.callShoppProductEmpty").click(function(event) {
							event.preventDefault();
							var url = $(this).attr("href");

							$.get(url, function(data) {

								console.log(data);
								$('#responseShopCartBase').text(data);

							});
						});

						$("#callAddProduct").click(function(event) {
							event.preventDefault();
							var url = servicesEJBs[5];
							var productName = $('#fieldProduct').val();
							var classifDesc = 'DVD';

							$.get(url, {
								product : productName,
								classif : classifDesc
							}, function(data) {

								$(responsesEJBs[5]).text(data);
								console.log(data);
							});
						});

						$("#callCheckOutProduct").click(function(event) {
							event.preventDefault();
							var url = servicesEJBs[5];
							var checkoutType = 'yes';

							$.get(url, {
								checkout : checkoutType
							}, function(data) {

								$(responsesEJBs[5]).text(data);
								console.log(data);
							});
						});

						$("a.callCDI").click(function(event) {
							event.preventDefault();
							var url = $(this).attr("href");

							$.get(url, function(data) {

								console.log(data);
								$('#responsePerformanceCDI').text(data);

							});
						});

						$("a.callLocalStatelessEJB").click(function(event) {
							event.preventDefault();
							var url = $(this).attr("href");

							$.get(url, function(data) {

								console.log(data);
								$('#responseLocalStatelessEJB').text(data);

							});
						});

						$("a.callRemoteStatelessEJB").click(function(event) {
							event.preventDefault();
							var url = $(this).attr("href");

							$.get(url, function(data) {

								console.log(data);
								$('#responseRemoteStatelessEJB').text(data);

							});
						});

						$("a.callRemoteStatefulEJB").click(function(event) {
							event.preventDefault();
							var url = $(this).attr("href");

							$.get(url, function(data) {

								console.log(data);
								$('#responseRemoteStatefulEJB').text(data);

							});
						});

						$("a.callRemoteSingletonEJB").click(function(event) {
							event.preventDefault();
							var url = $(this).attr("href");

							$.get(url, function(data) {

								console.log(data);
								$('#responseRemoteSingletonEJB').text(data);

							});
						});

					});