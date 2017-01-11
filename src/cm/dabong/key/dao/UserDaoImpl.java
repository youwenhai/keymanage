package cm.dabong.key.dao;

import helper.Hql;
import helper.PageData;
import util.GeneralDaoImpl;
import cm.dabong.key.en.User;

public class UserDaoImpl extends GeneralDaoImpl<Long , User> implements UserDao {

	public UserDaoImpl() {
		super(User.class);
	}
	
	public PageData<User> find(Object start , Object limit){
		Hql hql = Hql.start("from User u ").add("where u.unitid <> 0");
		return this.findForPage(hql.toString(), null, start, limit);
	}
}
