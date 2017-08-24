package com.org.copart.lta.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.org.copart.lta.bean.LeaveBean;
import com.org.copart.lta.bean.UserBean;
import com.org.copart.lta.exception.LTAppDatabaseException;
import com.org.copart.lta.util.DBConnection;

public class LTADaoImpl {

	public UserBean login(UserBean user) {
		UserBean ub = new UserBean();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("select e1.*, e2.firstName as managerfirstName,e2.lastName as managerlastName from employee e1 JOIN employee e2 on e1.managerId=e2.empCode where e1.email = ? AND e1.password = ?");
			stmt.setString(1, user.getEmail());
			stmt.setString(2, user.getPassword());
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				ub.setFirstName(rs.getString("firstName"));
				ub.setLastName(rs.getString("lastName"));
				ub.setMiddleName(rs.getString("middleName"));
				ub.setEmail(rs.getString("email"));
				// ub.setPassword(rs.getString("password"));
				ub.setResourceManager(rs.getString("managerId"));
				ub.setOnsiteManager(rs.getString("onsiteManagerId"));
				ub.setResourceManagerName(rs.getString("managerfirstName")+" "+rs.getString("managerlastName"));
				ub.setNumOfLeaves(rs.getInt("CL") + rs.getInt("SL")+ rs.getInt("PL"));
				ub.setNumOfCL(rs.getInt("CL"));
				ub.setNumOfSL(rs.getInt("SL"));
				ub.setNumOfPL(rs.getInt("PL"));
				ub.setDirector(rs.getString("directorId"));
				ub.setPhone(rs.getString("phone"));
				ub.setDept(rs.getString("dept"));
				ub.setEmpCode(rs.getString("empCode"));
				ub.setUserRole(rs.getInt("userRole"));
			
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ub;
	}

	public UserBean getUserDetailByID(String id) {
		UserBean ub = new UserBean();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("SELECT e1.*,c.Onsitemanagers_Email FROM employee e1 Join onsitemanagerslist c on e1.onsiteManagerId=c.OnsiteManager_name where empCode = ?");
			stmt.setString(1, id);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				ub.setFirstName(rs.getString("firstName"));
				ub.setLastName(rs.getString("lastName"));
				ub.setMiddleName(rs.getString("middleName"));
				ub.setEmail(rs.getString("email"));
				ub.setPassword(rs.getString("password"));
				ub.setResourceManager(rs.getString("managerId"));
				ub.setOnsiteManager(rs.getString("onsiteManagerId"));
				ub.setNumOfLeaves(rs.getInt("CL") + rs.getInt("SL")
						+ rs.getInt("PL"));
				ub.setDirector(rs.getString("directorId"));
				ub.setPhone(rs.getString("phone"));
				ub.setDept(rs.getString("dept"));
				ub.setEmpCode(rs.getString("empCode"));
				ub.setUserRole(rs.getInt("userRole"));
				ub.setOnsiteManagerName(rs.getString("Onsitemanagers_Email"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ub;
	}

	public int addUser(UserBean user) throws SQLException {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("INSERT INTO employee(firstName, lastName, middleName, password, email, managerId, onsiteManagerId, "
							+ "CL,SL,PL, directorId, phone, dept, empCode, userRole) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			stmt.setString(1, user.getFirstName());
			stmt.setString(2, user.getLastName());
			stmt.setString(3, user.getMiddleName());
			stmt.setString(4, user.getPassword());
			stmt.setString(5, user.getEmail());
			stmt.setString(6, user.getResourceManager());
			stmt.setString(7, user.getOnsiteManager());
			stmt.setInt(8, 5);
			stmt.setInt(9, 5);
			stmt.setInt(10, 15);
			stmt.setString(11, user.getDirector());
			stmt.setString(12, user.getPhone());
			stmt.setString(13, user.getDept());
			stmt.setString(14, user.getEmpCode());
			stmt.setInt(15, user.getUserRole());
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}
	public int addOnsiteManager(UserBean user) throws SQLException {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("INSERT INTO onsitemanagerslist(OnsiteManager_name, Onsitemanagers_Email, OnsiteManagers_Department) VALUES(?,?,?)");
			stmt.setString(1, user.getOnsiteManagerName());
			stmt.setString(2, user.getOnsiteManagerEmail());
			stmt.setString(3, user.getOnsiteManagerDept());
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}
	public int addManager(UserBean user) throws SQLException {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("INSERT INTO managerslist(Manager_name, Managers_Id, Department) VALUES(?,?,?)");
			stmt.setString(1, user.getResourceManagerName());
			stmt.setString(2, user.getResourceManagerEmpCode());
			stmt.setString(3, user.getResourceManagerDept());
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}

	public int applyLeave(LeaveBean lb) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("INSERT INTO leaves(employeeId, fromDate, toDate, status, reason, approverId, leaveType, leavesApplied) VALUES(?,?,?,?,?,?,?,?)");
			stmt.setString(1, lb.getEmpId());
			stmt.setString(2, lb.getFromDate());
			stmt.setString(3, lb.getToDate());
			stmt.setString(4, "Pending");
			stmt.setString(5, lb.getReason());
			stmt.setString(6, lb.getApprover());
			stmt.setString(7, lb.getLeaveType());
			stmt.setInt(8, lb.getLeavesApplied());
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}

	public int editUser(UserBean user) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("UPDATE employee SET firstName = ?, lastName = ?, middleName = ?, email = ?, managerId = ?,"
							+ " onsiteManagerId = ?, directorId = ?, phone = ?, dept = ?, userRole = ?,empCode = ? "
							+ " WHERE employee_sno = ?  ");
			stmt.setString(1, user.getFirstName());
			stmt.setString(2, user.getLastName());
			stmt.setString(3, user.getMiddleName());
			stmt.setString(4, user.getEmail());
			stmt.setString(5, user.getResourceManager());
			stmt.setString(6, user.getOnsiteManager());
			stmt.setString(7, user.getDirector());
			stmt.setString(8, user.getPhone());
			stmt.setString(9, user.getDept());
			stmt.setInt(10, user.getUserRole());
			stmt.setString(11, user.getEmpCode());
			stmt.setString(12, user.getReqId());
			System.out.println(stmt);
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}
	public int editOnsiteManager(UserBean user) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("UPDATE onsitemanagerslist SET  OnsiteManager_name = ?, OnsiteManagers_Department = ?, Onsitemanagers_Email = ?"
							+ " WHERE OnsiteManagers_Sno = ?  ");
			stmt.setString(1, user.getFirstName());
			stmt.setString(2, user.getDept());
			stmt.setString(3, user.getEmpCode());
			stmt.setString(4, user.getReqId());
			System.out.println(stmt);
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}
	
	public int editManager(UserBean user) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("UPDATE managerslist SET  Manager_name = ?, Department = ?, Managers_Id = ?"
							+ " WHERE Managers_Sno = ?  ");
			stmt.setString(1, user.getFirstName());
			stmt.setString(2, user.getDept());
			stmt.setString(3, user.getEmpCode());
			stmt.setString(4, user.getReqId());
			System.out.println(stmt);
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}

	public int deleteUser(UserBean user) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("DELETE FROM employee WHERE empCode = ? ");
			stmt.setString(1, user.getEmpCode());
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}
	
	public int deleteOnsiteManager(UserBean user) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("DELETE FROM onsitemanagerslist WHERE OnsiteManager_name = ? ");
			stmt.setString(1, user.getFirstName());
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}
	public int deleteManager(UserBean user) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("DELETE FROM managerslist WHERE Manager_name = ? ");
			stmt.setString(1, user.getFirstName());
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}

	public List<UserBean> getAllUsersUnderRM() {
		List<UserBean> ubList = new ArrayList<>();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("SELECT * FROM employee");
			ResultSet rs = stmt.executeQuery();
			UserBean ub = null;
			while (rs.next()) {
				ub = new UserBean();
				ub.setReqId(rs.getString("employee_sno"));
				ub.setFirstName(rs.getString("firstName"));
				ub.setLastName(rs.getString("lastName"));
				ub.setMiddleName(rs.getString("middleName"));
				ub.setEmail(rs.getString("email"));
				ub.setResourceManager(rs.getString("managerId"));
				ub.setOnsiteManager(rs.getString("onsiteManagerId"));
				ub.setNumOfLeaves(rs.getInt("CL") + rs.getInt("SL")
						+ rs.getInt("PL"));
				ub.setDirector(rs.getString("directorId"));
				ub.setPhone(rs.getString("phone"));
				ub.setDept(rs.getString("dept"));
				ub.setEmpCode(rs.getString("empCode"));
				ub.setUserRole(rs.getInt("userRole"));
				ubList.add(ub);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ubList;
	}

	public List<LeaveBean> getLeaveList(String empId, String requestType) {
		List<LeaveBean> lbList = new ArrayList<>();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			String colname = requestType.equals("NA") ? "employeeId = ?"
					: "approverId = ? AND status = 'Pending'";
			String query = "select concat_ws(' ',a.firstName,a.lastName ) as employeeName,a.CL,a.SL,a.PL,b.requestId,b.employeeId,b.fromDate,b.toDate,b.status,b.reason,b.approverId,b.leaveType,b.leavesApplied, concat_ws(' ',c.firstName,c.lastName ) as managerName from leaves b join employee a on a.empCode=b.employeeId JOIN employee c on b.approverId = c.empCode WHERE "
					+ colname + "order by requestId desc";
			PreparedStatement stmt = conn.prepareStatement(query);
			stmt.setString(1, empId);
			ResultSet rs = stmt.executeQuery();
			LeaveBean lb = null;
			while (rs.next()) {
				lb = new LeaveBean();
				lb.setApprover(rs.getString("approverId"));
				lb.setEmpId(empId);
				lb.setFromDate(rs.getString("fromDate"));
				lb.setToDate(rs.getString("toDate"));
				lb.setLeavesApplied(rs.getInt("leavesApplied"));
				lb.setLeaveType(rs.getString("leaveType"));
				lb.setReason(rs.getString("reason"));
				lb.setStatus(rs.getString("status"));
				lb.setReqId(rs.getInt("requestId"));
				lb.setNumOfCL(rs.getInt("CL"));
				lb.setNumOfSL(rs.getInt("SL"));
				lb.setNumOfPL(rs.getInt("PL"));
				lb.setemployeeId(rs.getString("employeeId"));
				lb.setemployeeName(rs.getString("employeeName"));
				lb.setresourceManager(rs.getString("managerName"));
				lbList.add(lb);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lbList;
	}

	public LeaveBean getLeaveDeatails(int reqId) {
		List<LeaveBean> lbList = new ArrayList<>();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			String query = "SELECT * FROM leaves WHERE requestId = ? ";
			PreparedStatement stmt = conn.prepareStatement(query);
			stmt.setInt(1, reqId);
			ResultSet rs = stmt.executeQuery();
			LeaveBean lb = null;
			while (rs.next()) {
				lb = new LeaveBean();
				lb.setApprover(rs.getString("approverId"));
				lb.setFromDate(rs.getString("fromDate"));
				lb.setToDate(rs.getString("toDate"));
				lb.setLeavesApplied(rs.getInt("leavesApplied"));
				lb.setLeaveType(rs.getString("leaveType"));
				lb.setReason(rs.getString("reason"));
				lb.setStatus(rs.getString("status"));
				lb.setReqId(rs.getInt("requestId"));
				lb.setemployeeId(rs.getString("employeeId"));
				lbList.add(lb);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lbList.get(0);
	}

	public List<LeaveBean> getApproveRejectList(String empId, String requestType) {
		List<LeaveBean> lbList = new ArrayList<>();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			String colname = requestType.equals("NA") ? "employeeId = ?"
					: "approverId = ? AND status in ('Rejected','Approved','Cancelled') order by requestId desc";
			String query = "select concat_ws(' ',a.firstName,a.lastName ) as employeeName,b.*, concat_ws(' ',c.firstName,c.lastName ) as managerName from leaves b join employee a on a.empCode=b.employeeId JOIN employee c on b.approverId = c.empCode WHERE " + colname;
			PreparedStatement stmt = conn.prepareStatement(query);
			stmt.setString(1, empId);
			ResultSet rs = stmt.executeQuery();
			LeaveBean lb = null;
			while (rs.next()) {
				lb = new LeaveBean();
				lb.setApprover(rs.getString("approverId"));
				lb.setEmpId(empId);
				lb.setFromDate(rs.getString("fromDate"));
				lb.setToDate(rs.getString("toDate"));
				lb.setLeavesApplied(rs.getInt("leavesApplied"));
				lb.setLeaveType(rs.getString("leaveType"));
				lb.setReason(rs.getString("reason"));
				lb.setStatus(rs.getString("status"));
				lb.setReqId(rs.getInt("requestId"));
				lb.setemployeeId(rs.getString("employeeId"));
				lb.setemployeeName(rs.getString("employeeName"));
				lb.setresourceManager(rs.getString("managerName"));
				lbList.add(lb);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lbList;
	}

	public void setApproveRejectStatus(int reqId, String status)
			throws LTAppDatabaseException {
		LeaveBean lb = this.getLeaveDeatails(reqId);
		int stat = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			// String query =
			// "UPDATE leaves SET status = ? WHERE requestId = ?";
			// update employee , leaves set employee.CL = employee.CL-1,
			// leaves.status='Approve' where employee.empCode=leaves.employeeId
			// and leaves.requestId=46;
			StringBuilder q = new StringBuilder("Update leaves ");
			if ((status.equalsIgnoreCase("Approved"))||(status.equalsIgnoreCase("Cancelled")))
				q.append(", employee ");
			q.append(" set leaves.status=? ");
			if (status.equalsIgnoreCase("Approved")) {
				if (lb.getLeaveType().equals("CL")) {
					q.append(", employee.CL = employee.CL-? ");
				} else if (lb.getLeaveType().equals("SL")) {
					q.append(", employee.SL = employee.SL-? ");
				} else if (lb.getLeaveType().equals("PL")) {
					q.append(", employee.PL = employee.PL-? ");
				}
			}else if (status.equalsIgnoreCase("Cancelled")) {
					if (lb.getLeaveType().equals("CL")) {
						q.append(", employee.CL = employee.CL+? ");
					} else if (lb.getLeaveType().equals("SL")) {
						q.append(", employee.SL = employee.SL+? ");
					} else if (lb.getLeaveType().equals("PL")) {
						q.append(", employee.PL = employee.PL+? ");
					}
				
			}
			q.append(" where ");
			if (status.equalsIgnoreCase("Approved")) {
				q.append(" employee.empCode=leaves.employeeId and ");
			}else if (status.equalsIgnoreCase("Cancelled")) {
					q.append(" employee.empCode=leaves.employeeId and ");
				}
			q.append("leaves.requestId=?");
			PreparedStatement stmt = conn.prepareStatement(q.toString());
			stmt.setString(1, status);
			if (status.equalsIgnoreCase("Approved")) {
				stmt.setInt(2, lb.getLeavesApplied());
				stmt.setInt(3, reqId);
			}else if (status.equalsIgnoreCase("Cancelled")) {
				stmt.setInt(2, lb.getLeavesApplied());
				stmt.setInt(3, reqId);
			} else {
				stmt.setInt(2, reqId);
			}
			stat = stmt.executeUpdate();
		} catch (SQLException e) {
			throw new LTAppDatabaseException(400,
					"Issue while updating status of leave.");
		} catch (Exception e) {
			throw new LTAppDatabaseException(400,
					"Issue while updating status of leave.");
		}

	}

	public List<UserBean> getholidaylist() {
		List<UserBean> holidaylist = new ArrayList();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			String query = "select * from holidaylist";
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				UserBean ub = new UserBean();
				ub.setReqId(rs.getString("Sno"));
				ub.setHolidayDate(rs.getString("Holiday_Date"));
				holidaylist.add(ub);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return holidaylist;
	}

	public List<UserBean> getManagerslist() {
		List<UserBean> managersList = new ArrayList();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			String query = "select * from managerslist";
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				UserBean ub = new UserBean();
				ub.setReqId(rs.getString("Managers_Sno"));
				ub.setFirstName(rs.getString("Manager_name"));
				ub.setDept(rs.getString("Department"));
				ub.setEmpCode(rs.getString("Managers_Id"));
				managersList.add(ub);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return managersList;
	}

	public List<UserBean> getOnsiteManagerslist() {
		List<UserBean> onsitemanagersList = new ArrayList();
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			String query = "select * from onsitemanagerslist";
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				UserBean ub = new UserBean();
				ub.setReqId(rs.getString("OnsiteManagers_Sno"));
				ub.setFirstName(rs.getString("OnsiteManager_name"));
				ub.setDept(rs.getString("OnsiteManagers_Department"));
				ub.setEmpCode(rs.getString("Onsitemanagers_Email"));
				onsitemanagersList.add(ub);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return onsitemanagersList;
	}

	public void resetPassword(String empCode, String password) {
		int stat = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			String query = "UPDATE employee SET password = ? WHERE empCode = ?";
			PreparedStatement stmt = conn.prepareStatement(query);
			stmt.setString(1, password);
			stmt.setString(2, empCode);
			stat = stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}
	public int editHolidayList(UserBean user) {
		int status = 0;
		try {
			Connection conn = DBConnection.getInstance().getConnInst();
			PreparedStatement stmt = conn
					.prepareStatement("UPDATE holidaylist SET  Holiday_Date = ? "
							+ " WHERE Sno = ?  ");
			stmt.setString(1, user.getHolidayDate());
			stmt.setString(2, user.getReqId());
			System.out.println(stmt);
			status = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return status;
	}
}
