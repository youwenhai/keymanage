package cm.dabong.key.dao;

import helper.PageData;
import cm.dabong.key.en.User;
import util.GeneralDao;

public interface UserDao extends GeneralDao<Long , User>{

	public PageData<User> find(Object start , Object limit);
}