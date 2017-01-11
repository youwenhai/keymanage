<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>大邦U盾管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="ext/IA300AdminJavascript.js"></script>
	<script type="text/javascript" src="ext/IA300ClientJavascript.js"></script>
	
	<link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css">
		
	<script type="text/javascript" src="ext/adapter/ext/ext-base.js"></script>	
	<script type="text/javascript" src="ext/ext-all.js"></script>
	<script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="ext/gridToExcel.js"></script>
	<script type="text/javascript">
		window.onload=function(){
			var browser = DetectBrowser();
	        if(browser == "Unknown"){
	            alert("不支持该浏览器， 如果您在使用傲游或类似浏览器，请切换到IE模式");
	            return ;
	        }
	        //createElementIA300() 对本页面加入IA300插件
	        createAdminElementIA300();
	        //DetectActiveX() 判断IA300Admin是否安装
	        var create = DetectIA300AdminPlugin();
	       	if(create == false){
	            alert("IA300管理员插件未安装! 会导致管理操作不了");
	            return false;
	        }
	        
	        createElementIA300();
			//DetectActiveX() 判断IA300Clinet是否安装
			var create = DetectIA300Plugin();
			if (create == false) {
				alert("IA300客户端插件未安装! 会导致普通人员操作不了");
				return false;
			}
		}
	</script>
  </head>
  
  <body>
    <script type="text/javascript" src="ext/key.manager.js"></script>
  </body>
</html>
