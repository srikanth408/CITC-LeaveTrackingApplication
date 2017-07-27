package com.org.copart.lta.util;

import java.security.SecureRandom;

public class RandomPasswordGenerator {

	public static String getPasswordString() {
		String combinations = "ABCDEFGHIJK$#@!%1234567890LMNOPQRSTUVWXYZ";
		StringBuilder pass = new StringBuilder();
		SecureRandom rnd = new SecureRandom();
		for (int i = 0; i < 8; i++) { // length of the random string.
			int index = (int) (rnd.nextFloat() * combinations.length());
			pass.append(combinations.charAt(index));
		}
		String str = pass.toString();
		//System.out.println("test : " + str);
		return str;

	}

}
