package util;

import helper.PageData;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;



public class GeneralDaoImpl<K, T> implements GeneralDao<K, T>{
	@SuppressWarnings("unchecked")
	private Class cla;
	@SuppressWarnings("unchecked")
	public GeneralDaoImpl(Class cla) {
		// TODO Auto-generated constructor stub
		this.cla = cla;
	}
	
	public void saveOrUpdate(T entity){
		HibernateSessionFactory.getSession().merge(entity);
	}
	
	public int update(String hql , Object[] params){
		
		Query query = HibernateSessionFactory.getSession().createQuery(hql);
		if(params != null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query.executeUpdate();
	}
	
	public List<T> find(String hql , Object[] params){
		Query query = HibernateSessionFactory.getSession().createQuery(hql);
		if(params != null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query.list();
	}
	
	@SuppressWarnings("unchecked")
	public T load(K id){
		return (T)HibernateSessionFactory.getSession().load(cla, (java.io.Serializable)(id));
	}
	
	@SuppressWarnings("unchecked")
	public T get(K id){
		return (T)HibernateSessionFactory.getSession().get(cla, (java.io.Serializable)(id));
	}
	
	public void delete(T entity){
		HibernateSessionFactory.getSession().delete(entity);
	}
	
	public void deleteById(K id){
		HibernateSessionFactory.getSession().delete(this.get(id));
	}
	
	public void persist(T entity){
		HibernateSessionFactory.getSession().persist(entity);
	}
	
	/* (non-Javadoc)
	 * @see com.sh.util.GeneralDao#getTotal(java.lang.String)
	 */
	public String getTotal(String hql){
		
		if(hql.startsWith("from")){
			return "select count(*) " + hql;
		}
		int index = hql.indexOf("from");
		return "select count(*) " + hql.substring(index);
		
	}
	
	
	/* (non-Javadoc)
	 * @see com.sh.util.GeneralDao#findForPage(java.lang.String, java.lang.Object[], int, int)
	 */
	@SuppressWarnings("unchecked")
	public PageData<T> findForPage(String hql , Object[] params , Object topage , Object pageSize ){
		Session session = HibernateSessionFactory.getSession();
		//获取总计录数
		Query query = session.createQuery(getTotal(hql));
		if(params != null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		List ls = query.list();
		
		Long total = 0l;
		
		if(!ls.isEmpty()){
			total = Long.valueOf(ls.get(0).toString());
			
		}
		int s = topage != null && !topage.equals("") ? Integer.valueOf(topage.toString()).intValue() : 0;
        int l = pageSize != null && !pageSize.equals("") ? Integer.valueOf(pageSize.toString()).intValue() : Globals.PAGESIZE;
		
		//当前页数据
		query = session.createQuery(hql)
					.setFirstResult(s)
					.setMaxResults(l);
		if(params != null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		
		List data = query.list();
		return new PageData<T>(data , total);
	}

}
