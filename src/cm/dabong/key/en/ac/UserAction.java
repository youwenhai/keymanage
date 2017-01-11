package cm.dabong.key.en.ac;

import util.GeneralAction;
import cm.dabong.key.dao.DaoFactory;

public class UserAction extends GeneralAction<UserModel>{

	
	protected Class getModelClass() {
		// TODO Auto-generated method stub
		return UserModel.class;
	}
	public String show(){
		this.getModel().setList(
				DaoFactory.getUserDao().find(
						this.getModel().getStart(), 
						this.getModel().getLimit()));
		return "show";
	}

}
