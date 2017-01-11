
package cm.dabong.key.dao;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.hql.ast.tree.IsNullLogicOperatorNode;

import helper.Hql;
import helper.PageData;
import helper.Where;
import util.GeneralDaoImpl;
import util.Globals;
import util.HibernateSessionFactory;
import cm.dabong.key.en.Softdog;
import cm.dabong.key.en.User;



public class SoftdogDaoImpl extends GeneralDaoImpl<String, Softdog> implements SoftdogDao {
	public SoftdogDaoImpl() {
		super(Softdog.class);
	}
	public PageData<Softdog> find(Object dogid, Object start , Object limit) {
		//组合条件
		Hql hql = Hql.start("from Softdog a").addWhere("where", Where.get().like("a.dogid", dogid));
		PageData<Softdog> pd =  findForPage(hql.toString(), hql.getParams(), start, limit);
		return pd;
	}

	
	public void del(String dogid){
		String hql = "update from Softdog s set s.user = null where s.dogid = ?";
		this.update(hql, new Object[]{
			dogid	
		});
	}
	
	public void phydel(String dogid){
		String hql = "delete from Softdog s where s.dogid = ?";
		this.update(hql, new Object[]{
			dogid	
		});
	}
	
	
	public Softdog find(Long userid){
		List<Softdog> list = this.find("from Softdog s where s.user.userid = ?", new Object[]{
				userid
		});
		if(list.isEmpty())
			return null;
		else 
			return list.get(0);
	}
	
	public Softdog find(String dogid){
		List<Softdog> list = this.find("from Softdog s where s.dogid = ?", new Object[]{
				dogid
		});
		if(list.isEmpty())
			return null;
		else 
			return list.get(0);
	}
	
	public int reg(Softdog dog){
		
		SQLQuery query = 
			HibernateSessionFactory.getSession().createSQLQuery("insert into Softdog(dogid , dogseed , dogkey , url , isLocked) values(? , ? , ? , ? , ?)");
		Object[] params = new Object[]{
				dog.getDogid(),
				dog.getDogseed(),
				dog.getDogkey(),
				dog.getUrl(),
				0
		};
		if(params != null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query.executeUpdate();
	}
}
