<%--

    Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.

    The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
    Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
    or distribution is prohibited.

--%>
<!DOCTYPE html>
<%--

    Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.

    The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
    Hans Michelsensgatan 9, SE-211 20 Malm�, Sweden. Any unauthorized review, use, disclosure
    or distribution is prohibited.

--%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>Mina �renden - Login</title>
    <meta name="description" content="Streamflow MyCases"/>
    <meta name="viewport" content="width=device-width"/>
    <link rel="stylesheet" href="css/login.css"/>
	<link rel="shortcut icon" href="favicon.png"> 
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,400italic,700">
</head>
<body>
		
	
	<div id="wrapper">

		<form name="f" class="login-form" action="j_spring_security_check" method="post">
		
			<div class="header">
				<h1>Streamflow Mina �renden</h1>		
			</div>
		
			<div class="content">
				<input name="j_username" type="text" class="input username" placeholder="Anv�ndarnamn" />
				<input name="j_password" type="password" class="input password" placeholder="L�senord" />
			</div>
	
			<div class="footer">
				<button type="submit" name="submit">Login</button>
			</div>
		
		</form>

	</div>
	
</body>
</html>