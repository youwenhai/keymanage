package helper;

import java.util.ArrayList;
import java.util.List;

public class Hql {
	private String sqlstr;
	private List params = new ArrayList();
	private Hql(String start) {
		sqlstr = start;
	}
	public static Hql start(String s){
		return new Hql(s);
	}
	public Hql addWhere(String prefix, Where where){
		if(where.getSqlstr() == null){
			return this;
		}
		sqlstr = sqlstr + " " + prefix + " " + where.getSqlstr();
		params.addAll(where.getParams());
		return this;
	}
	@Override
	public String toString() {
		return this.sqlstr;
	}
	public Object[] getParams(){
		return this.params.toArray();
	}
	public Hql add(String str){
		sqlstr = sqlstr + " " + str;
		return this;
	}
	public Hql and(String str, Object param){
		if(param != null && !param.equals("")){
			sqlstr = sqlstr + " and " + str;
			this.params.add(param);
		}
		return this;
	}
}
