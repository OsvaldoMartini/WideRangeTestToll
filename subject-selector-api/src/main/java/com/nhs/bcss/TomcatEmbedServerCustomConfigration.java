package com.nhs.bcss;

import org.apache.catalina.connector.Connector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.embedded.TomcatWebServerFactoryCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;

@Component
public class TomcatEmbedServerCustomConfigration implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {
//public class TomcatEmbedServerCustomConfigration implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

	@Value("${maxHeaderCount}")
	private int maxHeaderCount;
	
	@Autowired
	public TomcatWebServerFactoryCustomizer tomcatWebServerFactoryCustomizer;

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void customize(TomcatServletWebServerFactory factory) {
		logger.info("Setting the Tomcat specific configurations. started");
		//factory.setPort(9095);
		factory.setDisplayName("BCSS Server");
		factory.setServerHeader("Server header of tomcat");
		factory.addConnectorCustomizers(new TomcatConnectorCustomizer() {
            @Override
            public void customize(Connector connector) {
                //connector.setPort(9095);
                connector.setMaxPostSize(2000);
                boolean re = connector.setProperty("maxHeaderCount", Integer.toString(maxHeaderCount));
                System.out.println("Set maxHeaderCount:" + re);
                re = connector.setProperty("useComet", Boolean.toString(false));
                System.out.println("Set useComet:" + re);
                re = connector.setProperty("socket.appReadBufSize", "87380");
                System.out.println("Set socket.appReadBufSize:" + re);
                re = connector.setProperty("socket.rxBufSize", "87380");
                System.out.println("Set socket.rxBufSize:" + re);
                re = connector.setProperty("socket.performanceConnectionTime", "2");
                System.out.println("Set socket.performanceConnectionTime:" + re);
                re = connector.setProperty("socket.performanceLatency", "0");
                System.out.println("Set socket.performanceLatency:" + re);
                re = connector.setProperty("socket.performanceBandwidth", "1");
                System.out.println("Set socket.performanceBandwidth:" + re);
                re = connector.setProperty("server", "My server");
                System.out.println("Set server:" + re);
                
                
//                connector.setSecure(true);
//                connector.setScheme("https");
//                connector.setAttribute("keyAlias", "tomcat");
//                connector.setAttribute("keystorePass", "password");
//                try {
//                    connector.setAttribute("keystoreFile",
//                        ResourceUtils.getFile("src/ssl/tomcat.keystore").getAbsolutePath());
//                } catch (FileNotFoundException e) {
//                    throw new IllegalStateException("Cannot load keystore", e);
//                }
//                connector.setAttribute("clientAuth", "false");
//                connector.setAttribute("sslProtocol", "TLS");
//                connector.setAttribute("SSLEnabled", true);
            }
        });
		
//  factory.setContextPath("/api/v4");
		factory.setContextPath("");
		logger.info("Setting the Tomcat specific configurations. ended");
	}
	
//	private void customizeMaxHttpHeaderSize(TomcatServletWebServerFactory factory, DataSize maxHttpHeaderSize) {
//		factory.addConnectorCustomizers((httpServer) -> httpServer.getttpRequestDecoder(
//				(httpRequestDecoderSpec) -> httpRequestDecoderSpec.maxHeaderSize((int) maxHttpHeaderSize.toBytes())));
//	}

}