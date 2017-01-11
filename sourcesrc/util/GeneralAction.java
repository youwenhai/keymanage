package util;

import helper.MessageInfo;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
@SuppressWarnings("unchecked")
public abstract class GeneralAction<T> implements ModelDriven<T> {

	protected abstract Class getModelClass();
	public T getModel() {
		try {
			T mode = (T)ActionContext.getContext().getSession().get(getModelClass().getName());
			if(mode == null){
				mode = (T)getModelClass().newInstance();
				ActionContext.getContext().getSession().put(getModelClass().getName(), mode);
			}		
			return mode;
		} catch (Exception e) {
			throw new RuntimeException("建立" + getModelClass() + "实例失败!", e);
		}
	}
	protected MessageInfo info;

	public MessageInfo getInfo() {
		return info;
	}

	public void setInfo(MessageInfo info) {
		this.info = info;
	}
	
}
