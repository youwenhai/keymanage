package cm.dabong.key.en.ac;

import helper.PageData;

import java.io.Serializable;

import cm.dabong.key.en.User;

public class UserModel implements Serializable {

	private PageData<User> list;
	private String limit;
	private String start;
	
	public PageData<User> getList() {
		return list;
	}
	public void setList(PageData<User> list) {
		this.list = list;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	
}
