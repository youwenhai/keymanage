package util;

public class Globals {

	public static final int PAGESIZE = 15;
	
	public static boolean isNull(Object obj){
		return obj == null || obj.toString().trim().equals("");
	}
}
