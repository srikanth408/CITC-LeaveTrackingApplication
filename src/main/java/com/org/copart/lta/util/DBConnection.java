package com.org.copart.lta.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.sql.DataSource;

public class DBConnection {

	private static DBConnection singleInstance;
	private static DataSource dataSource;
	private static Connection dbConnect = null;

	private DBConnection() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			dbConnect = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/lta_db?zeroDateTimeBehavior=convertToNull", "root", "root");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException ex) {
			// Logger.getLogger(DBConnection.class.getName()).log(Level.SEVERE,
			// null, ex);
		}
	}

	public static DBConnection getInstance() {
		if (singleInstance == null) {
			synchronized (DBConnection.class)

			{
				if (singleInstance == null) {
					singleInstance = new DBConnection();
				}
			}
		}

		return singleInstance;
	}

	public Connection getConnInst() {
		return dbConnect;
	}
}
