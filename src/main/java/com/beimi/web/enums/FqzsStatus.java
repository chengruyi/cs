package com.beimi.web.enums;

/**
 * @author by cry@meitu.com
 * Date: 2018/9/8
 * Description: 
 */
public enum FqzsStatus {

	INIT(1), RUNING(2),

	END(3), OTHER(4);

	private int status;

	FqzsStatus(int status) {
		this.status = status;
	}

	public int getStatus() {
		return status;
	}

}
