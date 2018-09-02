package com.beimi.util.server.handler;

import com.alibaba.fastjson.JSON;
import com.beimi.core.BMDataContext;
import com.beimi.core.engine.game.ActionTaskUtils;
import com.beimi.util.UKTools;
import com.beimi.util.cache.CacheHelper;
import com.beimi.util.client.NettyClients;
import com.beimi.web.model.PlayUserClient;
import com.beimi.web.model.Token;
import com.beimi.web.service.repository.es.PlayUserClientESRepository;
import com.beimi.web.service.repository.jpa.PlayUserClientRepository;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnEvent;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author by cry@meitu.com
 * Date: 2018/8/29
 * Description: 
 */
public class FqzsEventHandler {

	protected SocketIOServer server;

	public FqzsEventHandler(SocketIOServer server) {
		this.server = server;
	}

	@OnEvent(value = "pushScore")
	public void onJoinRoom(SocketIOClient client, AckRequest request, String data) {
		System.out.println(data);
		BeiMiClient beiMiClient = JSON.parseObject(data, BeiMiClient.class);
		String token = beiMiClient.getToken();
		if (!StringUtils.isBlank(token)) {
			Token userToken;
			if ((userToken = (Token) CacheHelper.getApiUserCacheBean().getCacheObject(token, beiMiClient.getOrgi()))
					!= null) {
				//鉴权完毕
				PlayUserClient userClient = (PlayUserClient) CacheHelper.getApiUserCacheBean()
						.getCacheObject(userToken.getUserid(), userToken.getOrgi());
				beiMiClient.setClient(client);
				beiMiClient.setUserid(userClient.getId());
				beiMiClient.setSession(client.getSessionId().toString());
				/**
				 * 心跳时间
				 */
				beiMiClient.setTime(System.currentTimeMillis());
				NettyClients.getInstance().putClient(userClient.getId(), beiMiClient);

				/**
				 * 更新当前玩家状态，在线|离线
				 */
				userClient.setOnline(true);


			}
		}
	}


}
