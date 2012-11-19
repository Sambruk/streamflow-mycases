package com.jayway.surface.mycases.rest;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
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
public class StreamflowProxyController
{

   private static final Logger logger = Logger.getLogger( StreamflowProxyController.class );

   private static final String username = "6c476a2a-ed05-40bf-a89e-f1fb515a9014-0";
   private static final String password = "surfaceproxy";
   private static final String streamflowUrl = "http://localhost:8082/streamflow/surface/";

   @RequestMapping("/**")
   public final void proxyAjaxCall(HttpServletRequest request, HttpServletResponse response) throws IOException
   {
      // Prepare the url to call
      StringBuffer url = new StringBuffer( streamflowUrl );
      url.append( request.getPathInfo().substring( "/proxy/".length() ) );

      DefaultHttpClient httpClient = new DefaultHttpClient();
      httpClient.getCredentialsProvider().setCredentials( new AuthScope( "localhost", 8082 ),
            new UsernamePasswordCredentials( username, password ) );

      OutputStreamWriter writer = new OutputStreamWriter( response.getOutputStream() );
      HttpResponse proxyResponse = null;
      try
      {

         if (request.getMethod().equals( "GET" ))
         {
            if (request.getQueryString() != null)
            {
               url.append( "?" ).append( request.getQueryString() );
            }
            logger.debug( "Proxy URL: " + url.toString() );
            HttpGet httpGet = new HttpGet( url.toString() );
            for (@SuppressWarnings("unchecked")
            Enumeration<String> headerNames = request.getHeaderNames(); headerNames.hasMoreElements();)
            {
               String headerName = headerNames.nextElement();
               httpGet.addHeader( headerName, request.getHeader( headerName ) );
            }
            proxyResponse = httpClient.execute( httpGet );

         } else if (request.getMethod().equals( "POST" ))
         {
             HttpPost httpPost = new HttpPost( url.toString() );

             List<NameValuePair> nvps = new ArrayList<NameValuePair>();
             for (@SuppressWarnings("unchecked")
             Enumeration<String> parameterNames = request.getParameterNames(); parameterNames.hasMoreElements();)
             {
                String parameterName = parameterNames.nextElement();
                nvps.add(new BasicNameValuePair(parameterName, request.getParameter( parameterName )));

             }
             httpPost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
             proxyResponse = httpClient.execute( httpPost );

         } else
         {
            // We just support GET & POST at the moment
            response.setStatus( HttpServletResponse.SC_METHOD_NOT_ALLOWED );
         }

         if (proxyResponse.getStatusLine().getStatusCode() == HttpServletResponse.SC_OK)
         {
            // Set the content type, as it comes from the server
            Header[] headers = proxyResponse.getAllHeaders();
            for (Header header : headers)
            {
               if ("Content-Type".equalsIgnoreCase( header.getName() ))
               {
                  response.setContentType( header.getValue() );
               }
            }
            writer.write( EntityUtils.toString( proxyResponse.getEntity() ) );

         } else
         {
            response.setStatus( proxyResponse.getStatusLine().getStatusCode() );
         }

      } catch (IOException e)
      {
         writer.write( e.toString() );
         throw e;

      } finally
      {
         writer.flush();
         writer.close();
      }
   }
}
