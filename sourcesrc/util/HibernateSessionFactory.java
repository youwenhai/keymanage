package util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.cfg.Configuration;

public class HibernateSessionFactory {

	private static SessionFactory sf = null;
	private synchronized static SessionFactory getSf(){
		if(sf == null){
			Configuration cfg = new AnnotationConfiguration();
			cfg.configure("/hibernate.cfg.xml");
			sf = cfg.buildSessionFactory();
		}
		return sf;
	}
	
	private static ThreadLocal<Session> sessionLocal 
		= new ThreadLocal<Session>();
	public static synchronized Session getSession(){
		Session s = sessionLocal.get();
		if(s == null){
			s = getSf().openSession();
			sessionLocal.set(s);
		}
		return s ;
	}
	
	
}