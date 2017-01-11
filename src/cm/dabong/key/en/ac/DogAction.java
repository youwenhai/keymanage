package cm.dabong.key.en.ac;


import helper.MessageInfo;
import helper.PageData;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;
import org.hibernate.Transaction;

import util.GeneralAction;
import util.HibernateSessionFactory;
import cm.dabong.key.dao.DaoFactory;
import cm.dabong.key.en.Softdog;

import com.IA300.IA300Lib;

@SuppressWarnings("serial")
public class DogAction extends GeneralAction<DogModel>{

	@SuppressWarnings("unchecked")
	protected Class getModelClass() {
		return DogModel.class;
	}
	
	//查询
	public String find(){
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		PageData<Softdog> pd = DaoFactory.getSoftdogDao().find(
				this.getModel().getKeyid() , 
				this.getModel().getStart(), 
				this.getModel().getLimit());
		this.getModel().setList(pd
				);
		tx.commit();
		session.close();
		return "index";
	}
	
	
	/**
	 * 注册
	 * @return
	 */
	public String reg(){
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		this.setInfo(new MessageInfo());
		try {
			Softdog dog = DaoFactory.getSoftdogDao().find(this.getModel().getDog().getDogid());
			if(dog != null){
				//dog.setDogkey(this.getModel().getDog().getDogkey());
				//dog.setDogseed(this.getModel().getDog().getDogseed());
				//dog.setUrl(this.getModel().getDog().getUrl());
				//DaoFactory.getSoftdogDao().saveOrUpdate(dog);
			
				this.info.setMsg("该狗已经注册过");
				this.info.setSuccess(true);
			}else{
				int b = DaoFactory.getSoftdogDao().reg(this.getModel().getDog());
				if(b == 1){
					this.info.setMsg("注册成功");
					this.info.setSuccess(true);
				}else{
					this.info.setMsg("注册失败");
					this.info.setSuccess(false);
				}
			}
			tx.commit();
			
		} catch (Exception e) {
			tx.rollback();
			this.info.setMsg("注册失败");
			this.info.setSuccess(false);
			e.printStackTrace();
			
		}
		session.close();
		return "reg";
	}
	
	/**
	 * 清空用户
	 * @return
	 */
	public String del(){
		this.setInfo(new MessageInfo());
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		try {
			DaoFactory.getSoftdogDao().del(this.getModel().getKeyid());
			tx.commit();
			
			this.info.setMsg("更新成功");
			this.info.setSuccess(true);
		} catch (Exception e) {
			this.info.setMsg("更新失败");
			tx.rollback();
			this.info.setSuccess(false);
			e.printStackTrace();
		}
		session.close();
		return "del";
	}
	
	/**
	 * 物理删除
	 * @return
	 */
	public String phydel(){
		this.setInfo(new MessageInfo());
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		try {
			DaoFactory.getSoftdogDao().phydel(this.getModel().getKeyid());
			tx.commit();
			
			this.info.setMsg("删除成功");
			this.info.setSuccess(true);
		} catch (Exception e) {
			this.info.setMsg("删除失败");
			tx.rollback();
			this.info.setSuccess(false);
			e.printStackTrace();
		}
		session.close();
		return "phydel";
	}

	
	/**
	 * 指定用户
	 * @return
	 */
	public String appoint(){
		this.setInfo(new MessageInfo());
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		try {
			Softdog dog = DaoFactory.getSoftdogDao().find(this.getModel().getUser());
			
			if(dog == null){
				dog = DaoFactory.getSoftdogDao().load(this.getModel().getKeyid());
				dog.setUser(DaoFactory.getUserDao().load(this.getModel().getUser()));
				DaoFactory.getSoftdogDao().saveOrUpdate(dog);
				tx.commit();
				
				this.info.setMsg("指定用户成功");
				this.info.setSuccess(true);
			}else{
				this.info.setMsg("该用户已经存在狗了");
				this.info.setSuccess(false);
			}
			
		} catch (Exception e) {
			
			this.info.setMsg("指定用户失败");
			this.info.setSuccess(false);
			tx.rollback();
			e.printStackTrace();
		}
		session.close();
		return "appoint";
	}
	
	
	/**
	 * 解锁用户
	 * @return
	 */
	public String puk(){
		
		this.setInfo(new MessageInfo());
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		try {
			Softdog dog = DaoFactory.getSoftdogDao().load(this.getModel().getKeyid());
			dog.setIsLocked(0);
			DaoFactory.getSoftdogDao().saveOrUpdate(dog);
			tx.commit();
			
			this.info.setMsg("解锁成功");
			this.info.setSuccess(true);
		} catch (Exception e) {
			this.info.setMsg("解锁失败");
			tx.rollback();
			this.info.setSuccess(false);
			e.printStackTrace();
		}
		session.close();
		return "puk";
	}
	
	
	/**
	 * 重置密码
	 * @return
	 */
	public String reset(){
		
		this.setInfo(new MessageInfo());
		try {
			Softdog dog = DaoFactory.getSoftdogDao().find(this.getModel().getKeyid());
			if(dog == null){
				this.info.setMsg("该狗未注册");
				this.info.setSuccess(false);
			}else{
				
				IA300Lib ia = new IA300Lib();
				
				String responseinfo = ia.ResetUserPin(dog.getDogkey(), this.getModel().getReqinfo(), "12345678");
				String str = dog.getDogid()+","+responseinfo;
				//System.out.println("dogkey\t"+dog.getDogkey());
				//System.out.println("uid\t"+this.getModel().getKeyid()+"\t"+dog.getDogid());
				//System.out.println("reqinfo\t"+this.getModel().getReqinfo());
				//System.out.println("responseInfo\t"+responseinfo);
				this.info.setMsg(str);
				this.info.setSuccess(true);
			}
		} catch (Exception e) {
			this.info.setMsg("重置失败");
			this.info.setSuccess(false);
			e.printStackTrace();
		}
		return "reset";
	}
	
	
	public String excel()throws Exception{
		
		HttpServletResponse resp = ServletActionContext.getResponse();
		ServletActionContext.getRequest().setCharacterEncoding("UTF-8");
		resp.setContentType("text/html;charset=UTF-8");  
		resp.setHeader("Content-Type","application/force-download");
		resp.setHeader("Content-Type","application/vnd.ms-excel;charset=UTF-8");
		resp.setHeader("Content-Disposition","attachment;filename="+this.getModel().getName());
		resp.getWriter().write(this.getModel().getExportContent());
		return null;
	}
}
