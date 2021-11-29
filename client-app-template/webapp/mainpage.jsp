<%-- 
    Document   : index
    Created on : 26/12/2015, 13:12:36
    Author     : omartini
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Cadastro Marcas - Martini Marcas e Patentes Ltda.</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

<link href="resources/assets/css/style.css" rel="stylesheet" />

<script
	src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script
	src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js"></script>

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

<!-- <script src="resources/javascript/jquery.min.js"></script> -->
<!-- <script src="resources/javascript/jquery.mobile-1.4.5.min.js"></script> -->
<style>
.jumbotron {
	width: 400px;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
}

.table {
	margin-top: 20px;
}

.form-control {
	margin-top: 5px;
}

.textarea {
	overflow: hidden;
	overflow-x: hidden;
	overflow-y: hidden;
	padding: 10px;
}

#header {
	background-color: black;
	color: white;
	text-align: center;
	padding: 5px;
}

#nav {
	line-height: 30px;
	background-color: #eeeeee;
	height: auto;
	width: 300px;
	float: left;
	padding: 5px;
	width: 300px;
}

#section {
	width: 350px;
	float: left;
	padding: 10px;
}

#footer {
	background-color: black;
	color: white;
	clear: both;
	text-align: center;
	padding: 5px;
}
</style>

<script>
	
</script>

</head>
<body>
	<% response.sendRedirect("/pages/pessoa.jsf"); %>
	
	<div id="header">
		<div>
			<h3>Setor de Header</h3>
		</div>
	</div>
	<div id="nav" class=jumbotron>
		<div class="container">
			<h3>Setor de Nav</h3>
		</div>
	</div>

	<div id="section">
			<h3>Setor de Section</h3>
	</div>

	<div id="footer">
			<h3>Setor de Footer</h3>
	</div>

</body>

</html>
