package cm.dabong.key.en;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="app_user")
public class User implements Serializable {

	private Long userid;
	private String realName;
	private int unitid;
	public int getUnitid() {
		return unitid;
	}

	public void setUnitid(int unitid) {
		this.unitid = unitid;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "userid:"+userid+"\trealName"+realName;
	}
}
