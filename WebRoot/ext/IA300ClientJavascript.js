/*******************************************************
 *
 * ʹ�ô�JS�ű�֮ǰ������ϸ�Ķ�IA300�����ĵ�!
 * 
 * @author		Fuly
 * @version		3.0
 * @date		2012/6/28
 * @explanation	IA300 v3.0���û��洢���Ͱ�ȫ�洢��������2K������
 * 				��Ӧ����չ������������������ͬʱ����֮ǰ�����洢���ĺ���
 *
**********************************************************/

var _IA300Client;
var _TimerErrorMessage;
var _ExpireUrl;

function IA300_GetInstance()
{
    if(_IA300Client == null)
    {
        _IA300Client = document.getElementById("IA300Client");
    }
	
	_IA300Client.Model = 0;
   return _IA300Client; 
}

/*******************************************************
*
* �������ƣ�IA300_CheckPassword()
* ��    �ܣ���USB Key
* ��    �룺password��ҳ�洫�ݽ���������,��USB Key���û�����
* �� �� ֵ������ֵΪ0���ɹ���1Ϊʧ�ܣ��û����벻��ȷ
* ˵	�����˷���δ�򿪷���,Ҳ�ǵ��ж�USB Key�Ƿ�Ϸ���USB Key
*
**********************************************************/
function IA300_CheckPassword(password)
{
     return IA300_GetInstance().IA300Open(password);
}
/*******************************************************
*
* �������ƣ�IA300_LogOut()
* ��    �ܣ��ǳ�IA300USB Key
* �� �� ֵ������0���ʾ�ǳ��ɹ�������Ϊʧ��
* ˵	������IA300Open�ɶ�ʹ�ã��д�������еǳ�USB Key
*
**********************************************************/
function IA300_LogOut() {
    return IA300_GetInstance().IA300Close();
}
/*******************************************************
*
* �������ƣ�IA300_GetLastError()
* ��    �ܣ���ȡIA300����ִ��ʧ�ܵĴ�����
* �� �� ֵ������ֵΪ�������
* ˵	������ȡUSB Key���һ��ִ��ʧ�ܵĴ�����Ϣ���ɽ�ϰ�
*           ���ĵ�����Ź��߲�ѯ������Ϣ
*
**********************************************************/
function IA300_GetLastError()
{
    return IA300_GetInstance().IA300GetLastError();
}
/*******************************************************
*
* �������ƣ�IA300_GetHardwareId()
* ��    �ܣ���ȡUSB Key��Ӳ��ID
* �� �� ֵ������ֵΪ��USB Key��Ӳ��ID������NULLΪʧ��
* ˵	������ȡIA300USB KeyΨһӲ��ID����δ��ȡ������ʹ��
*           IA300_GetLastError()��������ȡ������,Ȼ�����
*           ����ԭ��
*
**********************************************************/
function IA300_GetHardwareId()
{
	return IA300_GetInstance().IA300GetUID();
}
/*******************************************************
*
* �������ƣ�IA300_RequestEnabled()
* ��    �ܣ����USB KeyԶ������ע�Ṧ���Ƿ��
* �� �� ֵ������ֵΪ0����ֹ��1Ϊ��
* ˵	����Զ������ʱ�����Key����ô˷���
*
**********************************************************/
function IA300_RequestEnabled()
{
     return IA300_GetInstance().RequestEnabled;
}
/*******************************************************
*
* �������ƣ�IA300_SHA1WithSeedEx()
* ��    �ܣ�
* �� �� ֵ��
* ˵	������⵽Key����ô˷���
*
**********************************************************/
function IA300_SHA1WithSeedEx(RanDoms)
{
     return IA300_GetInstance().IA300SHA1WithSeedEx(RanDoms);
}
/*******************************************************
*
* �������ƣ�IA300_GetMachineCode()
* ��    �ܣ����Ի�ȡ������̫��MAC��MD5��ֵ��������˼���SHA1ʱ��������������� IA300GetMachineCode������ֵ���ɡ�
* �� �� ֵ������ֵΪMD5���MAC��ַ������ʧ��
* ˵	������⵽Key����ô˷���
*
**********************************************************/
function IA300_GetMachineCode()
{
     return IA300_GetInstance().IA300GetMachineCode();
}

/*******************************************************
*
* �������ƣ�IA300_CalculateClientHash()
* ��    �ܣ�����Ӳ��SHA1����
* ��    �룺randomMessageFromServer��32���ַ��������
* �� �� ֵ������ֵΪ0���ɹ���1Ϊʧ��,����IA300_GetLastErr
*           or()��ȡUSB Key������Ϣ
* ˵	����IA300Key���ɿͻ���ժҪֵ(SHA1�㷨)��Ҫ����32λ
*           �ַ��������Key���������������
*
**********************************************************/
function IA300_CalculateClientHash(randomMessageFromServer)
{
	return IA300_GetInstance().IA300SHA1WithSeed(randomMessageFromServer);
}

/*******************************************************
*
* �������ƣ�IA300_CheckExist()
* ��    �ܣ����USB Key�Ƿ����
* ˵	�����˷������IA300_StartCheckTimer������������ʱ
*           ���USB Key�Ƿ����,�����ڼ����ص�ָ��ҳ��(
*           _ExpireUrl)
*
**********************************************************/
function IA300_CheckExist()
{
	var rtn =IA300_GetInstance().IA300CheckExist();
    if(rtn < 1)
    {
        IA300_LogOut();
        if(_TimerErrorMessage != null)
        {
            alert(_TimerErrorMessage + "  Error Code: " +IA300Client.IA300GetLastError());
        }
        if(_ExpireUrl != null)
		{
			window.location = _ExpireUrl;
		}
	}
	return rtn;
}
/*******************************************************
*
* �������ƣ�IA300_StartCheckTimer()
* ��    �ܣ���ʱ��������
* ��    �룺interval��ʱ��1000/�룻errMsg������Ĵ�����Ϣ
*           logonUrl����ת��ַ
* ˵	�����˷������IA300_CheckExist������������ʱ����
*           ��Key�Ƿ����,�����ڼ����ص�ָ��ҳ��(_ExpireUrl)
*
**********************************************************/
function IA300_StartCheckTimer(interval, errMsg, logonUrl)
{
    _TimerErrorMessage  = errMsg;
    _ExpireUrl = logonUrl;
    //��ʱ���
    window.setInterval(IA300_CheckExist, interval);
}

/*******************************************************
*
* �������ƣ�IA300_ChangePassword()
* ��    �ܣ��޸�����
* ��    �룺oldPassword��ԭʼ���룻newPassword��������
*           newPasswordConfirm��������ȷ��
* �� �� ֵ������ֵ1��ԭʼ����Ϊ�գ�2��������ȷ��ʧ��,����3
*           Ϊ�޸�ʧ�ܣ�����IA300_GetLastError()��ȡUSB Key
*           ������Ϣ
* ˵	�����޸�IA300Key���룬IA300�򿪺���ܵ��ô˷�������
*           ��֤ԭ���룬ͨ��ԭ����������޸�Ϊ�µ�����
*
**********************************************************/
function IA300_ChangePassword(oldPassword, newPassword, newPasswordConfirm)
{
    if(oldPassword == "")
    {
        return 1;
    }
    if(newPassword != newPasswordConfirm)
    {
        return 2;
    }
    if( 0 !=  IA300_GetInstance().IA300ChangePassword(oldPassword,newPassword))
    {
        return 3;
    }
    return 0;
}
/*******************************************************
*
* �������ƣ�IA300_ResetPasswordRequest()
* ��    �ܣ��޸�����
* �� �� ֵ���ɹ����������ɵ�����������Ϣ��ʧ�ܿ���
*           IA300_GetLastError()��ȡUSB Key������Ϣ
* ˵	��������IA300USB Key����������Ϣ��ÿ����һ�δ˷�����
*           ���ɵ����������ǲ�ͬ�ģ������һ�ε������ɵ�
*           ��Ϣ���͵�����ˣ������������ã��ɷ���˽��д�
*           �������һ�������������õ�������
*
**********************************************************/
function IA300_ResetPasswordRequest()
{
	return IA300_GetInstance().IA300GenResetPwdRequest(); 
}
/*******************************************************
*
* �������ƣ�IA300_ResetPassword()
* ��    �ܣ��޸�����
* ��    �룺serverResponse������������������������Ϣ
* �� �� ֵ������ֵΪ0���ɹ���1Ϊʧ��,����IA300_GetLastErr
*           or()��ȡUSB Key������Ϣ
* ˵	����IA300USB Key�������ã����ܷ������������û�����
*           ��Ϣ��������ֵΪ0�����뱻����Ϊ�������˶����
*           ������
*
**********************************************************/
function IA300_ResetPassword(serverResponse)
{
     return IA300_GetInstance().IA300ResetPassword(serverResponse);
}

/*******************************************************
*
* �������ƣ�IA300WriteUserStorage()
* ��    �ܣ��û�������д��
* ��    �룺UserStorage��IA300�û��Զ�������
* ˵	����д���û����������Զ������ݣ�Ϊ���ģ��ͻ���д�룩
*
**********************************************************/
function IA300_WriteUserStorage(UserStorage) {
    return IA300_GetInstance().IA300WriteUserStorage(UserStorage);
}

/*******************************************************
*
* �������ƣ� IA300ReadUserStorage()
* ��    �ܣ��û���������ȡ
* ��    �룺_length��IA300�û��Զ������� ��ȡ����
* ˵	������ȡ�û����������Զ������ݣ�Ϊ���ģ��ͻ��˶�ȡ��
*
**********************************************************/
function IA300_ReadUserStorage(length) {
    return IA300_GetInstance().IA300ReadUserStorage(length);
}

/*******************************************************
*
* �������ƣ�IA300_ReadStorage()
* ��    �ܣ�USB Key��ȫ�洢��д��
* ��    �룺storage��IA300�û��Զ���д��洢������ 
* �� �� ֵ������0,д��洢�����ݳɹ�
* ˵	����д��洢���û��Զ��������(Ϊ����,�ɷ����ȷ��
*           ������д�������)
*
**********************************************************/
function IA300_WriteStorage(storage) {
    return IA300_GetInstance().IA300SecureWriteStorage(storage);
}

/*******************************************************
*
* �������ƣ�IA300_ReadStorage()
* ��    �ܣ�USB Key��ȫ�洢����ȡ
* ��    �룺storage��IA300�û��Զ����ȡ���ݳ��� 
* �� �� ֵ�����س����ڵ�����
* ˵	������ȡ�洢���û��Զ�������(Ϊ����,��Ҫ����˽��)
*
**********************************************************/
function IA300_ReadStorage(storage) {
    return IA300_GetInstance().IA300SecureReadStorage(storage);
}

/*******************************************************
*
* �������ƣ�IA300_WriteUserStorageEx()
* ��    �ܣ��û�������д��
* ��    �룺UserStorage��IA300�û��Զ�������
* ˵	������չ���û�������д�뺯��, ֧�ֶ�ȡ�°汾2K��С������
*
**********************************************************/
function IA300_WriteUserStorageEx(nStartAddr, pBuffer) {
    return IA300_GetInstance().IA300WriteUserStorageEx(nStartAddr, pBuffer);
}
/*******************************************************
*
* �������ƣ� IA300_ReadUserStorageEx()
* ��    �ܣ��û���������ȡ
* ��    �룺_length��IA300�û��Զ������� ��ȡ����
* ˵	������չ���û���������ȡ����, ֧�ֶ�ȡ�°汾2K��С������
*
**********************************************************/
function IA300_ReadUserStorageEx(nStartAddr, nDataLen) {
    return IA300_GetInstance().IA300ReadUserStorageEx(nStartAddr, nDataLen);
}
/*******************************************************
*
* �������ƣ�IA300_SecureWriteStorageEx()
* ��    �ܣ�USB Key��ȫ�洢��д��
* ��    �룺storage��IA300�û��Զ���д��洢������ 
* �� �� ֵ������0,д��洢�����ݳɹ�
* ˵	������չ�İ�ȫ������д�뺯��, ֧�ֶ�ȡ�°汾2K��С������
*
**********************************************************/
function IA300_SecureWriteStorageEx(nStartAddr, pBuffer) {
    return IA300_GetInstance().IA300SecureWriteStorageEx(nStartAddr, pBuffer);
}
/*******************************************************
*
* �������ƣ�IA300_SecureReadStorageEx()
* ��    �ܣ�USB Key��ȫ�洢����ȡ
* ��    �룺nStartAddr:���ݶ�ȡ��ַ; nDataLen����ȡ���ݳ��� 
* �� �� ֵ�����س����ڵ�����
* ˵	������չ���û���������ȡ����, ֧�ֶ�ȡ�°汾2K��С������
*
**********************************************************/
function IA300_SecureReadStorageEx(nStartAddr, nDataLen) {
    return IA300_GetInstance().IA300SecureReadStorageEx(nStartAddr, nDataLen);
}

/*******************************************************
*
* �������ƣ�IA300_DataEncrypt()
* ��    �ܣ��ͻ���3des����
* �� �� ֵ�����ؼ��ܺ������Ϊ�ɹ�����Ϊʧ��
*
**********************************************************/
function IA300_DataEncrypt(pBuffer)
{
    return IA300_GetInstance().IA300DataEncrypt(pBuffer);
}

/*******************************************************
*
* �������ƣ�IA300_RemoteChangeRequest()
* ��    �ܣ�����Զ��ע��
* ��    �룺strRandom������� 
* �� �� ֵ������USB Key��ز������˲�����Ϊ���������Response����Ҫ����
* ˵	����
*
**********************************************************/
function IA300_RemoteChangeRequest(strRandom)
{
    var rtn = IA300_GetInstance().IA300CheckExist();
    if(rtn == 0)
    {
        alert("�����USB Key����ע�����룡");
        return;
    }
    return IA300_GetInstance().IA300RemoteChangeRequest(strRandom);
}
/*******************************************************
*
* �������ƣ�IA300_RemoteChange()
* ��    �ܣ�Զ��ע��
* ��    �룺strResponse������˷��ص�ע�������strRandom������˴��ݹ�������������������ʱ���������������
* �� �� ֵ������0����ʾע��ɹ�������1����ʾע��ʧ�ܡ�
* ˵	����
*
**********************************************************/
function IA300_RemoteChange(strResponse,strRandom)
{
    var rtn = IA300_GetInstance().IA300CheckExist();
    if(rtn == 0)
    {
        alert("�����USB Key���ע�ᣡ");
        return;
    }
    return IA300_GetInstance().IA300RemoteChange(strResponse,strRandom);
}

/*******************************************************
*
* �������ƣ�IA300GetName()
* ��    �ܣ���ȡUSB Key�����õ�USB Key����
* �� �� ֵ������Key�����õ�USB Key����
*
**********************************************************/
function IA300_GetName()
{
    return  IA300_GetInstance().Name;
}
/*******************************************************
*
* �������ƣ�IA300GetDescription()
* ��    �ܣ���ȡUSB Key�����õĹ�˾������Ϣ
* �� �� ֵ������Key�����õĹ�˾����
*
**********************************************************/
function IA300_GetDescription()
{
    return IA300_GetInstance().Description;
}
/*******************************************************
*
* �������ƣ�IA300GetUrl()
* ��    �ܣ���ȡUSB Key�����õ���ַ
* �� �� ֵ������Key�����õ���ַ��Ϣ
* ˵    ��������ַΪ��Key�Զ�������ҳ�ĵ�ַ
*
**********************************************************/
function IA300_GetUrl()
{
    return IA300_GetInstance().Url;
}
/*******************************************************
*
* �������ƣ�IA300GetOther()
* ��    �ܣ���ȡUSB Key�����õ�������Ϣ��������ϵ�绰��
* �� �� ֵ������Key�����õ�������Ϣ
*
**********************************************************/
function IA300_GetOther()
{
    return IA300_GetInstance().Other;
}
/*******************************************************
*
* �������ƣ�createElementIA300()
* ��    �ܣ��Զ��жϲ���ϵͳ��X64��X32���Զ������Ӧ�Ĳ��
* ˵	�����Զ��жϲ���ϵͳ��X64��X32���Զ������Ӧ�Ĳ��_CLSIDΪIA300ClinetID
*
**********************************************************/
//������ж�ϵͳ,�Զ���Ӳ��;
//δ�����Ӧϵͳ��ͬ��������,�ֽ�Ϊx32���
function createElementIA300()
{
    var ia300client;
    var browser = DetectBrowser();
    if(browser == "IE") {
		
        if (IsIE9Above() == true) {
            ia300client = document.createElement('object');
            if (ia300client != null) {
                    ia300client.setAttribute("id", "IA300Client");
                    ia300client.setAttribute("CLASSID", "clsid:6AAEEBD3-838D-4A35-9571-26EFC79882ED");
                    ia300client.setAttribute("width", "0");
                    ia300client.setAttribute("height", "0");
            }
        }
        else  //IE6,7
        {
            ia300client = document.createElement("<object id=\"IA300Client\" CLASSID=\"clsid:6AAEEBD3-838D-4A35-9571-26EFC79882ED\" style=\"left:0px; top:0px; width:0; height:0; \" ></object>");
        }
        document.body.appendChild(ia300client);
    }
    else {

        ia300client = document.createElement('embed');
        if (ia300client != null) {
            ia300client.setAttribute("id", "IA300Client");
            ia300client.setAttribute("width", "0");
            ia300client.setAttribute("height", "0");
            ia300client.setAttribute("type", "application/IA300Plugin");

            document.body.appendChild(ia300client);
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
 
function DetectIA300Plugin() {

    var browser = DetectBrowser();
    if(browser == "IE")
    {
        try
        {   
           var comActiveX = new ActiveXObject("IA300ACTIVEX.IA300ActiveXCtrl.1");   
        }
        catch(e)
        {
           return false;   
        }
        return true;
    }
    else
    {
        var ia300Plugin = navigator.plugins["IA300 Plugin"];
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