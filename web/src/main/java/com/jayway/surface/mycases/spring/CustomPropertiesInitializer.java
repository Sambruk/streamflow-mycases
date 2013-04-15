/**
 * Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.
 *
 * The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
 * Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
 * or distribution is prohibited.
 */
package com.jayway.surface.mycases.spring;

import java.io.FileInputStream;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.PropertiesPropertySource;

/**
 * Load custom properties from a location that is configured using environmnet
 * variable. Example: "-Dmycases.properties.location=/user/glassfish/config/"
 * 
 * @author henrikreinhold
 * 
 */
public class CustomPropertiesInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext>
{

   private static final String FILENAME = "mycases.properties";

   private static final Logger logger = LoggerFactory.getLogger( CustomPropertiesInitializer.class.getName() );

   @Override
   public void initialize(ConfigurableApplicationContext context)
   {
      Properties customProps = new Properties();
      String location = context.getEnvironment().getProperty( "mycases.properties.location" );
      if (StringUtils.isNotBlank( location ))
      {
         logger.info( "Found custom properties location" );
         location = (location.endsWith( "/" ) ? location : location + "/");
         FileInputStream in;
         try
         {
            logger.debug( "Trying to load custom properties from: " + location + FILENAME );
            in = new FileInputStream( location + FILENAME );
            customProps.load( in );
            in.close();
            logger.debug( "Custom properties loaded from: " + location + FILENAME );
         } catch (Exception e)
         {
            e.printStackTrace();
         }
         PropertiesPropertySource propertySource = new PropertiesPropertySource( "custom", customProps );
         context.getEnvironment().getPropertySources().addFirst( propertySource );
         logger.debug( "Custom properties added to context" );
      } else
      {
         logger.info( "No custom properties location was set" );
      }
   }

}
