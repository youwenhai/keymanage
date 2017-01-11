/*******************************************************
 *
 * ʹ�ô�JS�ű�֮ǰ������ϸ�Ķ�IA300�����ĵ�!
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
* �������ƣ�IA300_AdminGetLastError()
* ��    �ܣ���ȡ�����롣
*
**********************************************************/
function IA300_AdminGetLastError()
{	
	return IA300_AdminGetInstance().IA300GetLastError();
}

/*******************************************************
*
* �������ƣ�IA300_SetParameters()
* ��    �ܣ�����USB Key����ز�����
* ��    �룺strNewSuperPin���������룻strUserPin:�û����룻strSeed�������룻strPriKey�� 3DES��Կ��strKeyName��USB Key�������� ������
*           strDescription��USB Key�������� ����������strUrl��  USB Key�������� ����ַ)��strOther�� USB Key��������  ( ����)��nUseIE����������ã� 0 δĬ��������� 1Ϊָ��IE�����
* ˵	��������0���ɹ������óɹ���������0��ʧ�ܣ�����IA300GetLastError��ȡ������Ϣ��.
*
**********************************************************/
function IA300_SetParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote)
{
   return IA300_AdminGetInstance().IA300SetParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote);
}

/*******************************************************
*
* �������ƣ�IA300_RemoteSetResponseParameters()
* ��    �ܣ�����USB Key����ز�����
* ��    �룺strNewSuperPin���������룻strUserPin:�û����룻strSeed�������룻strPriKey�� 3DES��Կ��strKeyName��USB Key�������� ������
*           strDescription��USB Key�������� ����������strUrl��  USB Key�������� ����ַ)��strOther�� USB Key��������  ( ����)��nUseIE����������ã� 0 δĬ��������� 1Ϊָ��IE�����
* ˵	��������0���ɹ������óɹ���������0��ʧ�ܣ�����IA300GetLastError��ȡ������Ϣ��.
*
**********************************************************/
function IA300_RemoteSetResponseParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote)
{
   return IA300_AdminGetInstance().IA300RemoteSetResponseParameters(strNewSuperPin,strUserPin,strSeed,strPriKey,strKeyName,strDescripion,strUrl,strOther,nUserIE,nEnableRemote);
}

/*******************************************************
*
* �������ƣ�IA300_GenComplexPwd()
* ��    �ܣ�����������ǿ�Ȱ���Ϊ��д��ĸ��Сд��ĸ�����֣������ַ�����������8-64��Χ�ڣ�
* ��    �룺nlen�� ���ȣ�3des��Կ���ȱ�����24λ��nlen�������볤��8-32λ
* ˵	�������óɹ������������ʧ�ܷ���null
*
**********************************************************/
function IA300_GenComplexPwd(nlen)
{
    return IA300_AdminGetInstance().IA300GenComplexPwd(nlen);
}

/*******************************************************
*
* �������ƣ�IA300_EditWithParameters()
* ��    �ܣ�����Key״̬�£�ע���Key��
* ��    �룺strSuperPin����������
* ˵	�������ô˽ӿ�֮ǰ�������ȵ���IA300RemoteSetResponseParameters��
*           �����strSuperPin�ǽ�Ҫ����Key�ĳ������롣��������ͨ����֤��������Ԥ�����úõ���ز�����
*
**********************************************************/
function IA300_EditWithParameters(strSuperPin)
{
    return IA300_AdminGetInstance().IA300EditWithParameters(strSuperPin);
}

/*******************************************************
*
* �������ƣ�IA300_EditWithParametersEx()
* ��    �ܣ�����USB Key��
* ��    �룺strSuperPin����������
* ˵	�������ô˽ӿ�֮ǰ�������ȵ���IA300RemoteSetResponseParameters��
*           �����strSuperPin�ǽ�Ҫ����Key�ĳ������롣��������ͨ����֤��������Ԥ�����úõ���ز�����
*
**********************************************************/
function IA300_EditWithParametersEx(hID, strSuperPin)
{
	return IA300_AdminGetInstance().IA300EditWithParametersEx(hID, strSuperPin);
}

/*******************************************************
*
* �������ƣ�IA300_RemoteGenResponse()
* ��    �ܣ�����Զ��ע�᣻
* ��    �룺strKeyId:����Key��Ӳ��ID�� strRandom������ʱ��������� strRequest��Զ��������Ϣ��
* ˵	��������Զ�������Ϣ���ӿ���Ҫ����ͻ�������Զ����ŵ�ID������������ܸ��ġ�
* 			���ô˽ӿ�֮ǰ���뽫Ҫ���ò���������ȷ������IA300_SetParameters�ӿ����ã������ɹ����᷵����ȷ��Զ����ŵĲ������˲����������ܴ�������Ϊ�ͻ��˽ӿ�IA300_RemoteChange�ӿڲ�����
*
**********************************************************/
function IA300_RemoteGenResponse(strKeyId, strRandom, strRequest)
{
	return IA300_AdminGetInstance().IA300RemoteGenResponse(strKeyId, strRandom, strRequest);
}

/*******************************************************
*
* �������ƣ�IA300_AdminGetUID()
* ��    �ܣ���ȡ��ǰUSB Key��
* ˵	�����жϵ�ǰUSB Key�Ƿ���ڣ�Ӧ���ڹ����
*
**********************************************************/
function IA300_AdminGetUID()
{
     return IA300_AdminGetInstance().IA300GetUID();
}

/*******************************************************
*
* �������ƣ�IA300_AdminGetUIDEx()
* ��	 �ܣ���ȡ��ǰUSB KeyӲ��ID��
* �� ��: i:����ֵ����ʾ��ǰ���ҵ�Key�����
* ˵	�����˺�����IA300_AdminGetUID����չ�����Һ���ô˺���
*
**********************************************************/
function IA300_AdminGetUIDEx(i)
{
	return IA300_AdminGetInstance().IA300GetUIDEx(i);
}
/*******************************************************
*
* �������ƣ�IA300_CheckExist()
* ��    �ܣ����USB Key�Ƿ���ڡ�
* ˵	�����жϵ�ǰUSB Key�Ƿ���ڣ������ҵ�Key��֧��
*
**********************************************************/
function IA300_AdminCheckExist()
{	
	return IA300_AdminGetInstance().IA300CheckExist();
}

/*******************************************************
*
* �������ƣ�IA300_SecureReadStorage()
* ��    �ܣ���IA300��ȫ�洢��
* ��    �룺nStartAddr����ȡ����ʼ��ַ�� nDataLen����ȡ���ȣ�
* ˵	�����ɹ��򿪺󼴿ɵ��ô˺�����ȡ
*
**********************************************************/
function IA300_SecureReadStorage(nStartAddr, nDataLen)
{
	return IA300_AdminGetInstance().IA300SecureReadStorage(nStartAddr, nDataLen);
}

/*******************************************************
*
* �������ƣ�IA300_SecureWriteStorage()
* ��    �ܣ�дIA300��ȫ�洢��
* ˵	����
*
**********************************************************/
function IA300_SecureWriteStorage(nStartAddr, strBuffer)
{
	return IA300_AdminGetInstance().IA300SecureWriteStorage(nStartAddr, _Base64encode(strBuffer));
}

/*******************************************************
*
* �������ƣ�IA300_ReadUserStorage()
* ��    �ܣ���IA300�û��洢��
* ��		�룺nStartAddr����ʼ��ַ�� nDataLen����ȡ����
* ˵	����
*
**********************************************************/
function IA300_ReadUserStorage(nStartAddr, nDataLen)
{
	return IA300_AdminGetInstance().IA300ReadUserStorage(nStartAddr, nDataLen);
}

/*******************************************************
*
* �������ƣ�IA300_WriteUserStorage()
* ��    �ܣ�дIA300�û��洢��
* ��		�룺nStartAddr����ʼ��ַ�� strBuffer��д�������
* ˵		����nStartAddr:��ʼ��ַ strBuffer:д�����Ϣ
*
**********************************************************/
function IA300_WriteUserStorage(nStartAddr, strBuffer)
{
	return IA300_AdminGetInstance().IA300WriteUserStorage(nStartAddr, _Base64encode(strBuffer));
}

/*******************************************************
*
* �������ƣ�IA300_CleanStorage()
* ��    �ܣ�index: 0 ����û��洢��, 1 ��հ�ȫ�洢��
* ˵	����
*
**********************************************************/
function IA300_CleanStorage(index)
{
	return IA300_AdminGetInstance().IA300CleanStorage(index);
}
/*******************************************************
*
* �������ƣ�createAdminElementIA300()
* ��    �ܣ��Զ��жϲ���ϵͳ��X64��X32���Զ������Ӧ�Ĳ��
* ˵	�����Զ��жϲ���ϵͳ��X64��X32���Զ������Ӧ�Ĳ��_CLSIDΪIA300ClinetID
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
* �������ƣ�DetectIA300Plugin()()
* ��    �ܣ��Զ��ж��Ƿ�ע��ͻ��˲��
* ˵	����IA300ACTIVEX.IA300ActiveXCtrl.1ΪIA300Clinet���ע����NAME
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
* �������ƣ�DetectBrowser()()
* ��    �ܣ��Զ��жϵ�ǰʹ�������
* ˵	�����Զ��ж���������棬���ؽ��Ϊ��ǰ���������
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
* �������ƣ�Base64encode()
* ��    �ܣ������ݽ���Base64����
* ˵	���������н�����ʹ��_utf8_encode()���б���ת�����ټ���,��֤��������
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
* �������ƣ�Base64decode()
* ��    �ܣ������ݽ���Base64����
* ˵	���������н�����ʹ��_utf8_decode()�����ܺ�����ݱ���,��֤��������
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
* �������ƣ�_utf8_encode()
* ��    �ܣ������ݽ���utf8����
* ˵	����
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
* �������ƣ�_utf8_decode()
* ��    �ܣ������ݽ���utf8����
* ˵	����
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
