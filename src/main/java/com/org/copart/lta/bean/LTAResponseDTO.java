package com.org.copart.lta.bean;

public class LTAResponseDTO<T> {
	private T data;

	private String header;

	public T getBody()
	{
		return data;
	}

	public void setBody(T body)
	{
		this.data = body;
	}

	public String getHeader()
	{
		return header;
	}

	public void setHeader(String header)
	{
		this.header = header;
	}




}
