
package helper;

import java.io.Serializable;
import java.util.List;

public class PageData<T> implements Serializable{
	public PageData(List<T> data, Long total) {
		this.data = data;
		this.total = total;
	}
	//查询结果
	private List<T> data;
	//总记录数
	private Long total;
	public List<T> getData() {
		return data;
	}
	public void setData(List<T> data) {
		this.data = data;
	}
	public Long getTotal() {
		return total;
	}
	public void setTotal(Long total) {
		this.total = total;
	}
	
}
