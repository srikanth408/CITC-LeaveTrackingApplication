package com.org.copart.lta.service;

import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import com.org.copart.lta.bean.LTAResponseDTO;
import com.org.copart.lta.bean.LeaveBean;
import com.org.copart.lta.bean.UserBean;

public interface MailSender {
   
	public MimeMessage createMessage(LeaveBean leaveObj, UserBean user, Session session);
	//public void sendMail(String from, String[] mailTO, String[] mailCC , LTAResponseDTO<LeaveBean> lb, UserBean user);
	public void sendMail(String from, String[] mailTO, String[] mailCC, LeaveBean leave, UserBean user);
	
	
	

}
