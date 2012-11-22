package com.jayway.surface.mycases.rest;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.UnavailableException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.InputStreamEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.HttpExchange;
import org.eclipse.jetty.client.security.Authentication;
import org.eclipse.jetty.client.security.Realm;
import org.eclipse.jetty.client.security.SimpleRealmResolver;
import org.eclipse.jetty.http.HttpURI;
import org.eclipse.jetty.servlets.ProxyServlet;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.providers.ExpiringUsernameAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.ServletWrappingController;

import com.jayway.surface.mycases.security.StreamflowEndUser;

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

   private static final String username = "6c476a2a-ed05-40bf-a89e-f1fb515a9014-0";
   private static final String password = "surfaceproxy";
   private static final String streamflowUrl = "http://localhost:8082/streamflow/surface/customers/";

   private StreamflowProxy proxy;

   @RequestMapping("/**")
   public final void proxyAjaxCall(HttpServletRequest request, HttpServletResponse response)
         throws Exception
   {
      proxy.service( request, response );
   }

   public void afterPropertiesSet() throws Exception
   {
      proxy = new StreamflowProxy();
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

   public static class StreamflowProxy extends ProxyServlet
   {

      public StreamflowProxy()
      {
      }

      @Override
      protected HttpClient createHttpClientInstance()
      {
         HttpClient httpClient = new HttpClient();
         httpClient.setRealmResolver( new SimpleRealmResolver( new Realm()
         {
            public String getId()
            {
               return "mycases";
            }

            public String getPrincipal()
            {
               return username;
            }

            public String getCredentials()
            {
               return password;
            }
         } ) );
         return httpClient;
      }

      @Override
      protected HttpURI proxyHttpURI(HttpServletRequest request, String uri) throws MalformedURLException
      {
         StreamflowEndUser user = (StreamflowEndUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

         // Prepare the url to call
         StringBuffer url = new StringBuffer( streamflowUrl );
         url.append( user.getPnr() );
         url.append( request.getPathInfo().substring( "/proxy".length() ) );
         
         return new HttpURI( url.toString() );

      }
   }

}
