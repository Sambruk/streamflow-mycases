/**
 * Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.
 *
 * The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
 * Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
 * or distribution is prohibited.
 */
package com.jayway.surface.mycases.rest;

import java.net.MalformedURLException;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.security.Realm;
import org.eclipse.jetty.client.security.SimpleRealmResolver;
import org.eclipse.jetty.http.HttpURI;
import org.eclipse.jetty.servlets.ProxyServlet;
import org.springframework.security.core.context.SecurityContextHolder;

import com.jayway.surface.mycases.security.StreamflowEndUser;

public class StreamflowProxy extends ProxyServlet
{

   private String username;
   private String password;
   private String streamflowUrl;

   public StreamflowProxy(String username, String password, String streamflowUrl)
   {
      this.username = username;
      this.password = password;
      this.streamflowUrl = streamflowUrl;
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