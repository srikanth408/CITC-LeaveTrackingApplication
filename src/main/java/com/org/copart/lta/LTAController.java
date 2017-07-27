package com.org.copart.lta;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.org.copart.lta.bean.LTAResponseDTO;
import com.org.copart.lta.bean.LeaveBean;
import com.org.copart.lta.bean.UserBean;
import com.org.copart.lta.service.LTAServiceImpl;
import com.org.copart.lta.service.MailSender;
import com.org.copart.lta.service.impl.ApplyLeaveMailSender;
import com.org.copart.lta.service.impl.ApproveLeaveMailSender;
import com.org.copart.lta.service.impl.LogindetailsMailSender;
import com.org.copart.lta.util.RandomPasswordGenerator;

/**
 * @author akgoswami
 *
 */
@Path("/api/v1/lta")
public class LTAController {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<UserBean> checkSession(
			@Context HttpServletRequest request) {
		LTAResponseDTO<UserBean> ubRes = new LTAResponseDTO<>();
		HttpSession session = request.getSession();
		UserBean user = null;
		if (session != null) {
			user = (UserBean) session.getAttribute("user");
			ubRes.setBody(user);
		}
		return ubRes;
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<UserBean> login(@Context HttpServletRequest request,
			UserBean user) {
		HttpSession session = request.getSession(true);
		UserBean userObj = new LTAServiceImpl().login(user);
		LTAResponseDTO<UserBean> ubRes = new LTAResponseDTO<>();
		session.setAttribute("user", userObj);
		//userObj.setPassword(null);
		ubRes.setBody(userObj);
		return ubRes;
	}

	@POST
	@Path("/addUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<UserBean> addUser(UserBean newUser,
			@Context HttpServletRequest request) throws SQLException {
		String genPassword = RandomPasswordGenerator.getPasswordString();
		newUser.setPassword(genPassword);
		 HttpSession session = request.getSession();
		UserBean LoggedUser = (UserBean)session.getAttribute("user");
		LTAServiceImpl service = new LTAServiceImpl();
		int status = new LTAServiceImpl().addUser(newUser);
		LTAResponseDTO<UserBean> ubRes = new LTAResponseDTO<>();
		if (status > 0) {
			
			ubRes.setHeader("Ok");
			
		} else {
			ubRes.setHeader("Failure");
		}
		MailSender m = new LogindetailsMailSender();
		//m.sendMail(LoggedUser.getEmail(),new String[]{newUser.getEmail()},null,null,newUser);
		m.sendMail("srikanthreddy.kaipu@copart.com",new String[]{newUser.getEmail()},null,null,newUser);

		return ubRes;
	}

	@POST
	@Path("/applyLeave")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<LeaveBean> applyLeave(LeaveBean lb,
			@Context HttpServletRequest request) {
        HttpSession session = request.getSession();
		LTAResponseDTO<LeaveBean> ubRes = new LTAResponseDTO<>();
		UserBean ub = null;
		LTAServiceImpl service = new LTAServiceImpl();
		if (session != null) {
			 ub = (UserBean)session.getAttribute("user");
			lb.setEmpId(ub.getEmpCode());
			lb.setApprover(ub.getResourceManager());
			int status = service.applyLeave(lb);
			if (status > 0) {
				ubRes.setHeader("Ok");
			} else {
				ubRes.setHeader("Failure");
			}
		} else {
			ubRes.setHeader("Unauthorised user.");
		}
		UserBean manager = service.getUserDetailByID(ub.getResourceManager());
		UserBean onSiteManager = service.getUserDetailByID(ub.getOnsiteManager());
		MailSender m = new ApplyLeaveMailSender();
		//m.sendMail(ub.getEmail(),new String[]{onSiteManager.getEmail()},new String[]{manager.getEmail()},lb,ub);
		m.sendMail("srikanthreddy.kaipu@copart.com",new String[]{onSiteManager.getEmail()},new String[]{manager.getEmail()},lb,ub);

		return ubRes;
	}

	@POST
	@Path("/editUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<UserBean> editUser(UserBean user) {
		int status = new LTAServiceImpl().editUser(user);
		LTAResponseDTO<UserBean> ubRes = new LTAResponseDTO<>();
		if (status > 0) {
			ubRes.setHeader("Ok");
		} else {
			ubRes.setHeader("Failure");
		}

		return ubRes;
	}

	@POST
	@Path("/deleteUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<UserBean> deleteUser(UserBean user) {
		int status = new LTAServiceImpl().deleteUser(user);
		LTAResponseDTO<UserBean> ubRes = new LTAResponseDTO<>();
		if (status > 0) {
			ubRes.setHeader("Ok");
		} else {
			ubRes.setHeader("Failure");
		}

		return ubRes;
	}
	
	@POST
	@Path("/aprroveReject")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<LeaveBean> setApproveRejectStatus(
			@QueryParam("reqId") int reqId,
			@QueryParam("status") String status,
			@Context HttpServletRequest request) {
		HttpSession session = request.getSession();
		LTAServiceImpl service = new LTAServiceImpl();
		UserBean ub = (UserBean) session.getAttribute("user");
		LTAResponseDTO<LeaveBean> lb = new LTAResponseDTO<>();
		try {
			service.setApproveRejectStatus(reqId, status);
			lb.setHeader("Ok");
			LeaveBean leave = service.getLeaveDeatails(reqId);
			UserBean user = service.getUserDetailByID(leave.getemployeeId());
			//UserBean manager = service.getUserDetailByID(ub.getResourceManager());
			UserBean onSiteManager = service.getUserDetailByID(user.getOnsiteManager());
			
			MailSender m = new ApproveLeaveMailSender();
			//m.sendMail(ub.getEmail(), new String[] { user.getEmail() },	new String[] { onSiteManager.getEmail() }, leave, ub);
			
			m.sendMail("srikanthreddy.kaipu@copart.com", new String[] { user.getEmail() },	new String[] { onSiteManager.getEmail() }, leave, ub);
		} catch (Exception e) {
			lb.setHeader("Failed");
		}
		return lb;
	}	
	

	@GET
	@Path("/listUser")
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<List<UserBean>> getUserList(@Context HttpServletRequest request) {
		HttpSession session = request.getSession();
		UserBean manager = (UserBean) session.getAttribute("user");
		LTAResponseDTO<List<UserBean>> userList = new LTAResponseDTO<>();
		
		userList.setBody(new LTAServiceImpl().getAllUsersUnderRM(manager.getEmpCode()));
		return userList;
	}

	@GET
	@Path("/listLeavesApplied")
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<List<LeaveBean>> getListLeavesApplied(
			@QueryParam("empId") String empId,
			@QueryParam("requestType") String requestType) {
		LTAResponseDTO<List<LeaveBean>> userList = new LTAResponseDTO<>();
		userList.setBody(new LTAServiceImpl().getLeaveList(empId, requestType));
		return userList;
	}
	@GET
	@Path("/ApproveRejectList")
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<List<LeaveBean>> getApproveRejectList(
			@QueryParam("empId") String empId,
			@QueryParam("requestType") String requestType) {
		LTAResponseDTO<List<LeaveBean>> userList = new LTAResponseDTO<>();
		userList.setBody(new LTAServiceImpl().getApproveRejectList(empId, requestType));
		return userList;
	}

	

	@GET
	@Path("/holidays")
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<List<String>> getHolidays() {
		LTAResponseDTO<List<String>> hl = new LTAResponseDTO<>();
		hl.setBody(new LTAServiceImpl().getholidaylist());
		return hl;
	}
	@GET
	@Path("/managers")
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<List<UserBean>> getManagers() {
		LTAResponseDTO<List<UserBean>> hl = new LTAResponseDTO<>();
		hl.setBody(new LTAServiceImpl().getManagerslist());
		return hl;
	}
	@GET
	@Path("/onsitemanagers")
	@Produces(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<List<UserBean>> getOnsiteManagers() {
		LTAResponseDTO<List<UserBean>> hl = new LTAResponseDTO<>();
		hl.setBody(new LTAServiceImpl().getOnsiteManagerslist());
		return hl;
	}
	@POST
	@Path("/resetPassword")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public LTAResponseDTO<String> resetPassword(
			@QueryParam("oldpassword") String oldpassword,
			@QueryParam("password") String password,
			@Context HttpServletRequest request) {
		HttpSession session = request.getSession();
		LTAServiceImpl service = new LTAServiceImpl();
		UserBean ub = (UserBean) session.getAttribute("user");
		ub = service.getUserDetailByID(ub.getEmpCode());
		LTAResponseDTO<String> lb = new LTAResponseDTO<String>();
		if(ub.getPassword().equals(oldpassword)){
			try {
				service.resetPassword(ub.getEmpCode(), password);
				lb.setHeader("Ok");
			} catch (Exception e) {
				lb.setHeader("Failed");
			}
		}else {
			lb.setHeader("Failed");
		}
	    return lb;
	}

}
