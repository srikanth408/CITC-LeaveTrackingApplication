package com.org.copart.lta.exception;

public abstract class LTAppException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public int errorCode;
	
	public String Message;
	
	public LTAppException(int errorCode, String message) {
		super();
		this.errorCode = errorCode;
		Message = message;
	}
	public int getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String message) {
		Message = message;
	}
    public abstract String getDetailMessage();
	
	

}
