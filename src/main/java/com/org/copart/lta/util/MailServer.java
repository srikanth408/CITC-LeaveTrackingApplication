package com.org.copart.lta.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class MailServer {
	
	private String host;
	private String port;
	private String username;
	private String password;
	private static MailServer instance = null;
	
	public String getHost() {
		return host;
	}

	public String getPort() {
		return port;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}


	
	private MailServer(String host, String port, String username, String password){
		this.host = host;
		this.port = port;
		this.username = username;
		this.password = password;
	}
	
	public static MailServer getMailServerInstance(){
		 if(instance == null) {
			 Properties prop = readFromPropertyFile();
	         instance = new MailServer(prop.getProperty("smtp.server.host"),
	        		 prop.getProperty("smtp.server.port"), prop.getProperty("smtp.server.user"), prop.getProperty("smtp.server.password"));
	      }
	      return instance;
		
	}
	
	private static Properties readFromPropertyFile(){
		InputStream fis = null;
		Properties prop = null;
		try{ 
			prop=new Properties();
			fis= MailServer.class.getResourceAsStream("/application.properties");
		    if (fis != null) {
		    	prop.load(fis);
		   } else {
		    throw new FileNotFoundException("Mail server configuration not found.");
		   }
		 
		  } catch (FileNotFoundException e) {
		    e.printStackTrace();
		  }catch (IOException e) {
		    e.printStackTrace();
		  }
		  finally {
		   try {
			fis.close();
		   } catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		   }
		  }
		 
		  return prop;
		 }
}
