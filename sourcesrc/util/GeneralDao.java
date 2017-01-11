package util;

import java.util.List;

public interface GeneralDao<K, T> {
	public T get(K id);
	
	public void saveOrUpdate(T entity);
	
	public T load(K id);
	
	public void delete(T entity);
	
	public void deleteById(K id);
	
	public void persist(T entity);
	
	public int update(String hql , Object[] params);
	
	public List<T> find(String hql , Object[] params);
}
