package com.org.copart.lta.service;

import java.sql.SQLException;
import java.util.List;

import com.org.copart.lta.bean.LeaveBean;
import com.org.copart.lta.bean.UserBean;
import com.org.copart.lta.dao.LTADaoImpl;
import com.org.copart.lta.exception.LTAppException;

public class LTAServiceImpl {

	public UserBean login(UserBean user) {
		return new LTADaoImpl().login(user);
	}
	
	public UserBean getUserDetailByID(String empCode) {
		return new LTADaoImpl().getUserDetailByID(empCode);
	}

	public int addUser(UserBean user) throws SQLException {
		return new LTADaoImpl().addUser(user);
	}
	public int addOnsiteManager(UserBean user) throws SQLException {
		return new LTADaoImpl().addOnsiteManager(user);
	}
	public int addManager(UserBean user) throws SQLException {
		return new LTADaoImpl().addManager(user);
	}
	

	public int applyLeave(LeaveBean lb) {
		return new LTADaoImpl().applyLeave(lb);
	}

	public LeaveBean getLeaveDeatails(int reqId) {
		return new LTADaoImpl().getLeaveDeatails(reqId);
	}

	public int editUser(UserBean user) {
		return new LTADaoImpl().editUser(user);
	}
	public int deleteUser(UserBean user) {
		return new LTADaoImpl().deleteUser(user);
	}
	public int editOnsiteManager(UserBean user) {
		return new LTADaoImpl().editOnsiteManager(user);
	}
	public int editManager(UserBean user) {
		return new LTADaoImpl().editManager(user);
	}
	public int deleteOnsiteManager(UserBean user) {
		return new LTADaoImpl().deleteOnsiteManager(user);
	}
	public int deleteManager(UserBean user) {
		return new LTADaoImpl().deleteManager(user);
	}

	public List<UserBean> getAllUsersUnderRM() {
		return new LTADaoImpl().getAllUsersUnderRM();
	}

	public List<LeaveBean> getLeaveList(String empId, String requestType) {
		return new LTADaoImpl().getLeaveList(empId, requestType);
	}
	public List<LeaveBean> getApproveRejectList(String empId, String requestType) {
		return new LTADaoImpl().getApproveRejectList(empId, requestType);
	}

	public void setApproveRejectStatus(int reqId, String status) throws LTAppException {
		 new LTADaoImpl().setApproveRejectStatus(reqId, status);
	}
	public List<UserBean> getholidaylist(){
		return new LTADaoImpl().getholidaylist();
	}
	public List<UserBean> getManagerslist(){
		return new LTADaoImpl().getManagerslist();
	}
	public List<UserBean> getOnsiteManagerslist(){
		return new LTADaoImpl().getOnsiteManagerslist();
	}
	public void resetPassword(String empCode,String password) {
	   new LTADaoImpl().resetPassword(empCode,password);
	}
	public int editHolidayList(UserBean user) {
		return new LTADaoImpl().editHolidayList(user);
	}
	
}
