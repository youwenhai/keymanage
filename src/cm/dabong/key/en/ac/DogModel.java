package cm.dabong.key.en.ac;



import helper.PageData;

import java.io.Serializable;

import cm.dabong.key.en.Softdog;

@SuppressWarnings("serial")
public class DogModel implements Serializable {

	private PageData<Softdog> list;
	private String start;
	private String limit;
	
	private String keyid;

	public String getKeyid() {
		return keyid;
	}

	public void setKeyid(String keyid) {
		this.keyid = keyid;
	}

	public PageData<Softdog> getList() {
		return list;
	}

	public void setList(PageData<Softdog> list) {
		this.list = list;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	
	private Softdog dog;
	public Softdog getDog() {
		return dog;
	}

	public void setDog(Softdog dog) {
		this.dog = dog;
	}
	
	private Long user;

	public Long getUser() {
		return user;
	}

	public void setUser(Long user) {
		this.user = user;
	}
	
	private String reqinfo;

	public String getReqinfo() {
		return reqinfo;
	}

	public void setReqinfo(String reqinfo) {
		this.reqinfo = reqinfo;
	}
	
	
	//
	private String exportContent;
	private String name;
	
	public String getExportContent() {
		return exportContent;
	}

	public void setExportContent(String exportContent) {
		this.exportContent = exportContent;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
