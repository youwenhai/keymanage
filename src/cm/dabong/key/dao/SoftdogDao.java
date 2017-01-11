package cm.dabong.key.dao;

import helper.PageData;
import util.GeneralDao;
import cm.dabong.key.en.Softdog;



public interface SoftdogDao extends GeneralDao<String, Softdog>{
	//分页查询
	public PageData<Softdog> find(Object dogid, Object start , Object limit);
	
	public void del(String dogid);
	
	public void phydel(String dogid);
	
	public Softdog find(Long userid);
	
	public int reg(Softdog dog);
	
	public Softdog find(String dogid);
}