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

import com.org.copart.lta.bean.LeaveBean;
import com.org.copart.lta.bean.UserBean;
import com.org.copart.lta.service.MailSender;
import com.org.copart.lta.util.MailServer;

public class LogindetailsMailSender implements MailSender {
	 @Override
		public void sendMail(String from, String[] mailTO, String[] mailCC , LeaveBean leave, UserBean user){
			MailServer server = MailServer.getMailServerInstance();
			Properties prop = new Properties();
			prop.setProperty("mail.smtp.host", server.getHost());
			prop.setProperty("mail.smtp.port", server.getPort());
			prop.setProperty("mail.smtp.auth", "false");
			prop.setProperty("mail.smtp.starttls.enable", "true");
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
				
				if(mailCC != null){
					List<Address> ccRcp = Arrays.stream(mailCC).map(this::getAddress).collect(Collectors.toList());
					Address[] ccArr = Arrays.stream(mailCC).map(this::getAddress).collect(Collectors.toList()).toArray(new InternetAddress[ccRcp.size()]);
					msg.addRecipients(RecipientType.CC, ccArr);
				}
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
				msg.setSubject("Login Credentials of "+ user.getFirstName() +" " + user.getMiddleName() +" " + user.getLastName());
				//msg.setText("Leave Approval requested from date " + leave.getFromDate() + " to date " + leave.getToDate() + " reason : " + leave.getReason());
				StringBuilder email = new StringBuilder();
				email.append("<html><body><table style='border:2px solid black'>");
				email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> Login Id </td>").append("<td>").append(user.getEmail()).append("</td></tr>");
				email.append("<tr bgcolor=\"#FFFFFF\">").append("<td> Password </td>").append("<td>").append(user.getPassword()).append("</td></tr>");
				email.append("</table><p>Please login into LTA Application and on first login please change your password. Thank you..!</p></body></html>");
				
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
