package test;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import cm.dabong.key.en.Softdog;

import util.HibernateSessionFactory;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Object[] params = new Object[]{
				"2a602491249dce4502d418193b2f1c96",
				"M0UxNTJBQzM1NzJCNGNjYTk3NUJEMEVE",
				"NjEyOEM5QUNERThDNDk0Mzk5",
				"http://localhost:8090/keymanage",
				0
		};
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		Softdog dog = new Softdog();
		dog.setDogid("2a602491249dce4502d418193b2f1c96");
		dog.setDogkey("NjEyOEM5QUNERThDNDk0Mzk5");
		dog.setDogseed("M0UxNTJBQzM1NzJCNGNjYTk3NUJEMEVE");
		dog.setUrl("http://localhost:8090/keymanage");
		dog.setIsLocked(0);
		SQLQuery query = session.createSQLQuery("insert into softdog(dogid , dogseed , dogkey , url , isLocked) values(? , ? , ? , ? , ?)");
		if(params != null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		int b = query.executeUpdate();
		System.out.println(b);
		tx.commit();
		session.close();
	}

}
