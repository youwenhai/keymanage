/*******************************************************
 *
 * 使用此JS脚本之前请先仔细阅读IA300帮助文档!
 * 
 * @author	Fuly
 * @version	3.0
 * @date	2012/6/28
 *
**********************************************************/

var _IA300AdminClient;
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function IA300_AdminGetInstance()
{
    if(_IA300AdminClient == null)
    {
        _IA300AdminClient = document.getElementById("IA300AdminClient");
    }
	_IA300AdminClient.Model = 0;
   return _IA300AdminClient; 
}

function IA300_Type()
{
	return _IA300AdminClient.Type;
}

/*******************************************************
*
* 函数名称：IA300_AdminGetLastError()
* 功    能：获取错误码。
*
**********************************************************/
function IA300_AdminGetLastError()
{	
	return IA300_AdminGetInstance().IA300GetLastError();
}

/*******************************************************
*
* 函数名称：IA300_SetParameters()
* 功    能：设置USB Key的相关参数。
* 输    入：strNewSuperPin：超级密码；strUserPin:用户密码；strSeed：种子码；strPriKey： 3DES密钥；strKeyName：USB Key属性设置 （名）
*           strDescription：USB Key属性设置 （描述）；strUrl：  USB Key属性设置 （网址)；strOther： USB Key属性设置  ( 其它)；nUseIE：浏览器设置， 0 未默认浏览器； 1为指定IE浏览器
* 说	明：返回0：成功，设置成功。不等于0：失败，可用IA300GetLastError获取错误信息。.
*
**********************************************************/
function IA300_SetParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote)
{
   return IA300_AdminGetInstance().IA300SetParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote);
}

/*******************************************************
*
* 函数名称：IA300_RemoteSetResponseParameters()
* 功    能：设置USB Key的相关参数。
* 输    入：strNewSuperPin：超级密码；strUserPin:用户密码；strSeed：种子码；strPriKey： 3DES密钥；strKeyName：USB Key属性设置 （名）
*           strDescription：USB Key属性设置 （描述）；strUrl：  USB Key属性设置 （网址)；strOther： USB Key属性设置  ( 其它)；nUseIE：浏览器设置， 0 未默认浏览器； 1为指定IE浏览器
* 说	明：返回0：成功，设置成功。不等于0：失败，可用IA300GetLastError获取错误信息。.
*
**********************************************************/
function IA300_RemoteSetResponseParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote)
{
   return IA300_AdminGetInstance().IA300RemoteSetResponseParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote);
}

/*******************************************************
*
* 函数名称：IA300_GenComplexPwd()
* 功    能：获得随机数，强度包含为大写字母，小写字母，数字，三种字符串，长度在8-64范围内；
* 输    入：nlen： 长度，3des密钥长度必须是24位；nlen：种子码长度8-32位
* 说	明：调用成功返回随机数，失败返回null
*
**********************************************************/
function IA300_GenComplexPwd(nlen)
{
    return IA300_AdminGetInstance().IA300GenComplexPwd(nlen);
}

/*******************************************************
*
* 函数名称：IA300_EditWithParameters()
* 功    能：在有Key状态下，注册该Key；
* 输    入：strSuperPin：超级密码
* 说	明：调用此接口之前，必须先调用IA300RemoteSetResponseParameters，
*           传入的strSuperPin是将要设置Key的超级密码。超级密码通过验证才能设置预先设置好的相关参数。
*
**********************************************************/
function IA300_EditWithParameters(strSuperPin)
{
    return IA300_AdminGetInstance().IA300EditWithParameters(strSuperPin);
}

/*******************************************************
*
* 函数名称：IA300_EditWithParametersEx()
* 功    能：设置USB Key；
* 输    入：strSuperPin：超级密码
* 说	明：调用此接口之前，必须先调用IA300RemoteSetResponseParameters，
*           传入的strSuperPin是将要设置Key的超级密码。超级密码通过验证才能设置预先设置好的相关参数。
*
**********************************************************/
function IA300_EditWithParametersEx(hID, strSuperPin)
{
	return IA300_AdminGetInstance().IA300EditWithParametersEx(hID, strSuperPin);
}

/*******************************************************
*
* 函数名称：IA300_RemoteGenResponse()
* 功    能：处理远程注册；
* 输    入：strKeyId:申请Key的硬件ID； strRandom：申请时的随机数； strRequest：远程申请信息；
* 说	明：生成远程设号信息，接口需要传入客户端申请远程设号的ID和随机数，不能更改。
* 			调用此接口之前必须将要设置参数设置正确（调用IA300_SetParameters接口设置），若成功将会返回正确的远程设号的参数（此参数经过加密处理）。作为客户端接口IA300_RemoteChange接口参数。
*
**********************************************************/
function IA300_RemoteGenResponse(strKeyId, strRandom, strRequest)
{
	return IA300_AdminGetInstance().IA300RemoteGenResponse(strKeyId, strRandom, strRequest);
}

/*******************************************************
*
* 函数名称：IA300_AdminGetUID()
* 功    能：获取当前USB Key。
* 说	明：判断当前USB Key是否存在，应用于管理层
*
**********************************************************/
function IA300_AdminGetUID()
{
     return IA300_AdminGetInstance().IA300GetUID();
}

/*******************************************************
*
* 函数名称：IA300_AdminGetUIDEx()
* 功	 能：获取当前USB Key硬件ID。
* 输 入: i:索引值，标示当前查找到Key的序号
* 说	明：此函数是IA300_AdminGetUID的扩展，查找后调用此函数
*
**********************************************************/
function IA300_AdminGetUIDEx(i)
{
	return IA300_AdminGetInstance().IA300GetUIDEx(i);
}
/*******************************************************
*
* 函数名称：IA300_CheckExist()
* 功    能：检查USB Key是否存在。
* 说	明：判断当前USB Key是否存在，返回找到Key的支数
*
**********************************************************/
function IA300_AdminCheckExist()
{	
	return IA300_AdminGetInstance().IA300CheckExist();
}

/*******************************************************
*
* 函数名称：IA300_SecureReadStorage()
* 功    能：读IA300安全存储区
* 输    入：nStartAddr：读取的起始地址； nDataLen：读取长度；
* 说	明：成功打开后即可调用此函数读取
*
**********************************************************/
function IA300_SecureReadStorage(nStartAddr, nDataLen)
{
	return IA300_AdminGetInstance().IA300SecureReadStorage(nStartAddr, nDataLen);
}

/*******************************************************
*
* 函数名称：IA300_SecureWriteStorage()
* 功    能：写IA300安全存储区
* 说	明：
*
**********************************************************/
function IA300_SecureWriteStorage(nStartAddr, strBuffer)
{
	return IA300_AdminGetInstance().IA300SecureWriteStorage(nStartAddr, _Base64encode(strBuffer));
}

/*******************************************************
*
* 函数名称：IA300_ReadUserStorage()
* 功    能：读IA300用户存储区
* 输		入：nStartAddr：起始地址； nDataLen：读取长度
* 说	明：
*
**********************************************************/
function IA300_ReadUserStorage(nStartAddr, nDataLen)
{
	return IA300_AdminGetInstance().IA300ReadUserStorage(nStartAddr, nDataLen);
}

/*******************************************************
*
* 函数名称：IA300_WriteUserStorage()
* 功    能：写IA300用户存储区
* 输		入：nStartAddr：起始地址； strBuffer：写入的数据
* 说		明：nStartAddr:开始地址 strBuffer:写入的信息
*
**********************************************************/
function IA300_WriteUserStorage(nStartAddr, strBuffer)
{
	return IA300_AdminGetInstance().IA300WriteUserStorage(nStartAddr, _Base64encode(strBuffer));
}

/*******************************************************
*
* 函数名称：IA300_CleanStorage()
* 功    能：index: 0 清空用户存储区, 1 清空安全存储区
* 说	明：
*
**********************************************************/
function IA300_CleanStorage(index)
{
	return IA300_AdminGetInstance().IA300CleanStorage(index);
}
/*******************************************************
*
* 函数名称：createAdminElementIA300()
* 功    能：自动判断操作系统是X64或X32并自动添加相应的插件
* 说	明：自动判断操作系统是X64或X32并自动添加相应的插件_CLSID为IA300ClinetID
*
**********************************************************/
function createAdminElementIA300()
{
    var IA300AdminClient;
    var browser = DetectBrowser();
    if(browser == "IE") {
		
        if (IsIE9Above() == true) {
            IA300AdminClient = document.createElement('object');
            if (IA300AdminClient != null) {
                    IA300AdminClient.setAttribute("id", "IA300AdminClient");
                    IA300AdminClient.setAttribute("CLASSID", "clsid:B01957B4-4BF5-4189-BE5E-512333382AC3");
                    IA300AdminClient.setAttribute("width", "0");
                    IA300AdminClient.setAttribute("height", "0");
            }
        }
        else  //IE6,7
        {
            IA300AdminClient = document.createElement("<object id=\"IA300AdminClient\" CLASSID=\"clsid:B01957B4-4BF5-4189-BE5E-512333382AC3\" style=\"left:0px; top:0px; width:0; height:0; \" ></object>");
        }
        document.body.appendChild(IA300AdminClient);
    }
    else {

        IA300AdminClient = document.createElement('embed');
        if (IA300AdminClient != null) {
            IA300AdminClient.setAttribute("id", "IA300AdminClient");
            IA300AdminClient.setAttribute("width", "0");
            IA300AdminClient.setAttribute("height", "0");
            IA300AdminClient.setAttribute("type", "application/IA300Admin");

            document.body.appendChild(IA300AdminClient);
        }
    }
  
}
/*******************************************************
*
* 函数名称：DetectIA300Plugin()()
* 功    能：自动判断是否注册客户端插件
* 说	明：IA300ACTIVEX.IA300ActiveXCtrl.1为IA300Clinet插件注册后的NAME
*
**********************************************************/
 
function DetectIA300AdminPlugin() {

    var browser = DetectBrowser();
    if(browser == "IE")
    {
        try
        {   
           var comActiveX = new ActiveXObject("IA300AdminX.IA300AdminXCtrl");   
        }
        catch(e)
        {
           return false;   
        }
        return true;
    }
    else
    {
        var ia300Plugin = navigator.plugins["IA300Admin Plugin"];
        if (ia300Plugin != null) 
        {
            return true;
        }
		
        return false;
    }
      
}
/*******************************************************
*
* 函数名称：DetectBrowser()()
* 功    能：自动判断当前使用浏览器
* 说	明：自动判断浏览器引擎，返回结果为当前浏览器名称
*
**********************************************************/
function DetectBrowser()
 {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

	var browser="Unknown";
    if (Sys.ie){browser="IE";}
    if (Sys.firefox) {browser="Firefox";}
    if (Sys.chrome) {browser="Chrome";}
    if (Sys.opera) {browser="Opera";}
    if (Sys.safari) { browser = "Safari"; }

    return browser;
}

function IsIE9Above() {
    var ua = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1];
    
    if (parseInt(ua, 10) >= 9) {
        return true;
    }

    return false;
}
/*******************************************************
*
* 函数名称：Base64encode()
* 功    能：对数据进行Base64加密
* 说	明：函数中将数据使用_utf8_encode()进行编码转换后再加密,保证数据完整
*
**********************************************************/
function _Base64encode(input) {

	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	input = _utf8_encode(input);

	while (i < input.length) {

		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	}
	return output;
}

/*******************************************************
*
* 函数名称：Base64decode()
* 功    能：对数据进行Base64解密
* 说	明：函数中将数据使用_utf8_decode()将解密后的数据编码,保证数据完整
*
**********************************************************/
function _Base64decode(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length) {

		enc1 = this._keyStr.indexOf(input.charAt(i++));
		enc2 = this._keyStr.indexOf(input.charAt(i++));
		enc3 = this._keyStr.indexOf(input.charAt(i++));
		enc4 = this._keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

	}

	output = _utf8_decode(output);

	return output;
}

/*******************************************************
*
* 函数名称：_utf8_encode()
* 功    能：将数据进行utf8编码
* 说	明：
*
**********************************************************/
function _utf8_encode(string) {
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
			utftext += String.fromCharCode(c);
		}
		else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		}
		else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}
	return utftext;
}

/*******************************************************
*
* 函数名称：_utf8_decode()
* 功    能：将数据进行utf8解码
* 说	明：
*
**********************************************************/
function _utf8_decode(utftext) {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;

	while ( i < utftext.length ) {

		c = utftext.charCodeAt(i);

		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		}
		else if((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		}
		else {
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}
