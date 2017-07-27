package com.org.copart.lta.bean;

public class LeaveBean {

	private String empId;
	private String onsiteManager;
	private int leaveBl;
	private int leavesApplied;
	private String fromDate;
	private String toDate;
	private String reason;
	private String status;
	private String leaveType;
	private String approver;
	private String employeeId;
	private int reqId;
	private int numOfCL;
	private int numOfSL;
	private int numOfPL;
	
	
	public int getNumOfCL() {
		return numOfCL;
	}

	/**
	 * @param numOfCL
	 *            the numOfCL to set
	 */
	public void setNumOfCL(int numOfCL) {
		this.numOfCL = numOfCL;
	}
	
	public int getNumOfSL() {
		return numOfSL;
	}

	/**
	 * @param numOfSL
	 *            the numOfSL to set
	 */
	public void setNumOfSL(int numOfSL) {
		this.numOfSL = numOfSL;
	}
	public int getNumOfPL() {
		return numOfPL;
	}

	/**
	 * @param numOfCO
	 *            the numOfCO to set
	 */
	public void setNumOfPL(int numOfPL) {
		this.numOfPL = numOfPL;
	}
	
	public String getemployeeId() {
		return employeeId;
	}

	public void setemployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public int getReqId() {
		return reqId;
	}

	public void setReqId(int reqId) {
		this.reqId = reqId;
	}

	/**
	 * @return the onsiteManager
	 */
	public String getOnsiteManager() {
		return onsiteManager;
	}

	/**
	 * @param onsiteManager
	 *            the onsiteManager to set
	 */
	public void setOnsiteManager(String onsiteManager) {
		this.onsiteManager = onsiteManager;
	}

	/**
	 * @return the leaveBl
	 */
	public int getLeaveBl() {
		return leaveBl;
	}

	/**
	 * @param leaveBl
	 *            the leaveBl to set
	 */
	public void setLeaveBl(int leaveBl) {
		this.leaveBl = leaveBl;
	}

	/**
	 * @return the leavesApplied
	 */
	public int getLeavesApplied() {
		return leavesApplied;
	}

	/**
	 * @param leavesApplied
	 *            the leavesApplied to set
	 */
	public void setLeavesApplied(int leavesApplied) {
		this.leavesApplied = leavesApplied;
	}

	/**
	 * @return the fromDate
	 */
	public String getFromDate() {
		return fromDate;
	}

	/**
	 * @param fromDate
	 *            the fromDate to set
	 */
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	/**
	 * @return the toDate
	 */
	public String getToDate() {
		return toDate;
	}

	/**
	 * @param toDate
	 *            the toDate to set
	 */
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	/**
	 * @return the reason
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * @param reason
	 *            the reason to set
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the leaveType
	 */
	public String getLeaveType() {
		return leaveType;
	}

	/**
	 * @param leaveType
	 *            the leaveType to set
	 */
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}

	/**
	 * @return the empId
	 */
	public String getEmpId() {
		return empId;
	}

	/**
	 * @param empId
	 *            the empId to set
	 */
	public void setEmpId(String empId) {
		this.empId = empId;
	}

	/**
	 * @return the approver
	 */
	public String getApprover() {
		return approver;
	}

	/**
	 * @param approver
	 *            the approver to set
	 */
	public void setApprover(String approver) {
		this.approver = approver;
	}

}
