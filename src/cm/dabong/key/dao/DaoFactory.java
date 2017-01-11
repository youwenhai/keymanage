package cm.dabong.key.dao;

import java.util.HashMap;
import java.util.Map;

import util.Globals;

@SuppressWarnings({ "unused", "unchecked" })
public class DaoFactory {

	@SuppressWarnings("unchecked")
	private static Map<Class, Object> map
		= new HashMap<Class, Object>();
	private synchronized static Object getObject(Class cla){
		Object obj = map.get(cla);
		try {
			if (Globals.isNull(obj)) {
				obj = cla.newInstance();
				map.put(cla, obj);
			}
			return obj;
		} catch (Exception e) {
			throw new RuntimeException("返回实例失败");
		}
	}

	public static SoftdogDao getSoftdogDao(){
		return (SoftdogDao)getObject(SoftdogDaoImpl.class);
	}
	
	public static UserDao getUserDao(){
		return (UserDao)getObject(UserDaoImpl.class);
	}
}
