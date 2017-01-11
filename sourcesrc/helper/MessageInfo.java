package helper;

import java.io.Serializable;

public class MessageInfo implements Serializable {

	private String msg;
	private boolean success;
	
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
}
