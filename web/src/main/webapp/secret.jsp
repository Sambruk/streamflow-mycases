<%@ page import="com.jayway.surface.mycases.security.StreamflowEndUser" %>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>User authenticated</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>

	<%

			StreamflowEndUser enduser = (StreamflowEndUser) SecurityContextHolder.getContext().getAuthentication().getDetails();

			pageContext.setAttribute("enduser", enduser);
	%>
<h1>User has been authenticated</h1>

Username: <c:out value="${enduser.username}"/> <br/>
Name: <c:out value="${enduser.name}"/> <br/>
Id: <c:out value="${enduser.pnr}"/> <br/>
</body>