/**
 * Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.
 *
 * The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
 * Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
 * or distribution is prohibited.
 */
package com.jayway.surface.mycases.security;

import org.springframework.security.authentication.encoding.PasswordEncoder;

public class DemoPasswordEncoder implements PasswordEncoder
{

   @Override
   public String encodePassword(String rawPass, Object salt)
   {
      return rawPass;
   }

   @Override
   public boolean isPasswordValid(String encPass, String rawPass, Object salt)
   {
      return true;
   }

}
