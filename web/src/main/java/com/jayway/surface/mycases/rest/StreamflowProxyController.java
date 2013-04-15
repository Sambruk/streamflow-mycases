/**
 * Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.
 *
 * The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
 * Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
 * or distribution is prohibited.
 */
package com.jayway.surface.mycases.rest;

import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * Simple Proxy for Streamflow. All data comes from the Streamflow REST API
 * 
 * @author Henrik Reinhold, Jayway Products AB
 * 
 */
@Controller
@RequestMapping("/proxy")
public class StreamflowProxyController implements InitializingBean
{

   private static final Logger logger = Logger.getLogger( StreamflowProxyController.class );

   @Value("${streamflow.server.proxyuser}")
   String username;

   @Value("${streamflow.server.proxypwd}")
   String password;   

   @Value("${streamflow.server.url}")
   String streamflowUrl;
   
   private StreamflowProxy proxy;

   @RequestMapping("/**")
   public final void proxyAjaxCall(HttpServletRequest request, HttpServletResponse response)
         throws Exception
   {
      proxy.service( request, response );
   }

   public void afterPropertiesSet() throws Exception
   {
      proxy = new StreamflowProxy(username, password, streamflowUrl);
      proxy.init( new ServletConfig()
      {

         public String getServletName()
         {
            return null;
         }

         public ServletContext getServletContext()
         {
            return null;
         }

         public Enumeration getInitParameterNames()
         {
            return null;
         }

         public String getInitParameter(String name)
         {
            return null;
         }
      } );

   }

}
