/**
 * Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.
 *
 * The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
 * Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
 * or distribution is prohibited.
 */
package com.jayway.surface.mycases.security;

import java.util.Arrays;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class StreamflowDemoUserDetailsService implements UserDetailsService
{

   @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
   {
      UserDetails user = new User( username, "password", true, true, true, true, Arrays.asList( new GrantedAuthority[]
      { new GrantedAuthorityImpl( "ROLE_USER" ) } ));
      return user;
   }

}
