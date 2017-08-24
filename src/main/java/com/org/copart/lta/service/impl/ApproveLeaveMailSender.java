package com.org.copart.lta.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.Message.RecipientType;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.org.copart.lta.bean.LTAResponseDTO;
import com.org.copart.lta.bean.LeaveBean;
import com.org.copart.lta.bean.UserBean;
import com.org.copart.lta.service.MailSender;
import com.org.copart.lta.util.MailServer;

public class ApproveLeaveMailSender implements MailSender {

	@Override
	public void sendMail(String from, String[] mailTO, String[] mailCC , LeaveBean leave, UserBean user){
		MailServer server = MailServer.getMailServerInstance();
		Properties prop = new Properties();
		prop.setProperty("mail.smtp.host", server.getHost());
		prop.setProperty("mail.smtp.port", server.getPort());
		prop.setProperty("mail.smtp.auth", "false");
		prop.setProperty("mail.smtp.starttls.enable", "false");
		Session mailSession = Session.getDefaultInstance(prop);
		/*Session mailSession = Session.getInstance(prop, new Authenticator(){
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
			  return new PasswordAuthentication(server.getUsername(), server.getPassword()); 
		}});*/
		MimeMessage msg = this.createMessage(leave, user,mailSession);
		
		try {
			msg.setFrom(from);
			//Stream<String> s = Arrays.stream(mailTO);
			//List<Address> toRcp;
			//toRcp = s.map(x -> {try{new InternetAddress(x.toString());}catch(Exception e){}}).collect(Collectors.toList());
			List<Address> toRcp = Arrays.stream(mailTO).map(this::getAddress).collect(Collectors.toList());
			Address[] toArr = Arrays.stream(mailTO).map(this::getAddress).collect(Collectors.toList()).toArray(new InternetAddress[toRcp.size()]);
			msg.addRecipients(RecipientType.TO, toArr);
			List<Address> ccRcp = Arrays.stream(mailCC).map(this::getAddress).collect(Collectors.toList());
			Address[] ccArr = Arrays.stream(mailCC).map(this::getAddress).collect(Collectors.toList()).toArray(new InternetAddress[ccRcp.size()]);
			msg.addRecipients(RecipientType.CC, ccArr);
			Transport.send(msg);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			//Address[] toArr = s.map(x -> new InternetAddress(x.toString())).toArray(InternetAddress[] :: new);
			//Address[] toArr = s.toArray(InternetAddress[] :: new);
    }

	@Override
	public MimeMessage createMessage(LeaveBean leave, UserBean user, Session session) {
		MimeMessage msg = new MimeMessage(session);
		try {
			msg.setSubject("Leave request "+ leave.getStatus()+ " by "+" "+ user.getFirstName() + " " + user.getLastName());
			//msg.setText("Leave Approval requested from date " + leave.getFromDate() + " to date " + leave.getToDate() + " reason : " + leave.getReason());
			StringBuilder email = new StringBuilder();
			email.append("<html><body><p>Hello,</p><p>Your leave request has been "+ leave.getStatus()+"</p> <table style='border:2px solid black'>");
			email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> Employee Id :</td>").append("<td>").append(leave.getemployeeId()).append("</td></tr>");
			email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> From Date :</td>").append("<td>").append(leave.getFromDate()).append("</td></tr>");
			email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> To date :</td>").append("<td>").append(leave.getToDate()).append("</td></tr>");
			email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> No of Days :</td>").append("<td>").append(leave.getLeavesApplied()).append("</td></tr>");
			email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> Reason :</td>").append("<td>").append(leave.getReason()).append("</td></tr>");
			email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> Leave Type :</td>").append("<td>").append(leave.getLeaveType()).append("</td></tr>");
			email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> Status :</td>").append("<td>").append(leave.getStatus()).append("</td></tr>");
			email.append("</table><p>Please login into leave tracking application<span> https://citc-lta.copart.com </span></p></body></html>");
			
			msg.setContent(email.toString(), "text/html");
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return msg;
	}
	public Address getAddress(String x){
		Address a = new InternetAddress();
		try {
			a = new InternetAddress(x);
		} catch (AddressException e) {
			e.printStackTrace();
		}
		return a;
	}

}
