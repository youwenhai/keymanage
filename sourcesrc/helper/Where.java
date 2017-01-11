package helper;

import java.util.ArrayList;
import java.util.List;

public class Where {
	private Where(){
			
	}
	private String sqlstr;
	private List<Object> params = new ArrayList<Object>();
	public static Where get(){
		return new Where();
	}
	
	/**
	 * like
	 */
	public Where like(String str, Object param){
		if(param == null || param.equals("")){
			return this;
		}
		if(sqlstr == null)
			sqlstr = str + " like ?";
		else
			sqlstr = sqlstr + " and " + str + " like ?";;
		params.add("%" + param + "%");
		return this;
	}
	
	public String getSqlstr() {
		return sqlstr;
	}

	public List<Object> getParams() {
		return params;
	}

	public Where eq(String str, Object param){
		if(param == null || param.equals("")){
			return this;
		}
		if(sqlstr == null)
			sqlstr = str + "=?";
		else
			sqlstr = sqlstr + " and " + str + "=?";
		params.add(param);
		return this;
	}
	public Where le(String str, Object param){
		if(param == null || param.equals("")){
			return this;
		}
		if(sqlstr == null)
			sqlstr = str + "<=?";
		else
			sqlstr = sqlstr + " and " + str + "<=?";
		params.add(param);
		return this;
	}
	public Where lt(String str, Object param){
		if(param == null || param.equals("")){
			return this;
		}
		if(sqlstr == null)
			sqlstr = str + "<?";
		else
			sqlstr = sqlstr + " and " + str + "<?";
		params.add(param);
		return this;
	}
	public Where gt(String str, Object param){
		if(param == null || param.equals("")){
			return this;
		}
		if(sqlstr == null)
			sqlstr = str + ">?";
		else
			sqlstr = sqlstr + " and " + str + ">?";
		params.add(param);
		return this;
	}
	public Where ge(String str, Object param){
		if(param == null || param.equals("")){
			return this;
		}
		if(sqlstr == null)
			sqlstr = str + ">=?";
		else
			sqlstr = sqlstr + " and " + str + ">=?";
		params.add(param);
		return this;
	}
}
