package cm.dabong.key.en;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.apache.struts2.json.annotations.JSON;
@Entity
public class Softdog implements Serializable {

	private String dogid;
	private String dogseed;
	private String dogkey;
	private String url;
	private Integer isLocked;
	private User user;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public String getDogid() {
		return dogid;
	}
	public void setDogid(String dogid) {
		this.dogid = dogid;
	}
	public String getDogseed() {
		return dogseed;
	}
	public void setDogseed(String dogseed) {
		this.dogseed = dogseed;
	}
	public String getDogkey() {
		return dogkey;
	}
	public void setDogkey(String dogkey) {
		this.dogkey = dogkey;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getIsLocked() {
		return isLocked;
	}
	public void setIsLocked(Integer isLocked) {
		this.isLocked = isLocked;
	}
	@JSON(serialize = true)
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="userid")
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public String toString() {
		return "isLocked:"+isLocked+"\tdog:"+dogid;
	}
}
