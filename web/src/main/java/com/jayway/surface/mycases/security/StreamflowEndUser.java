package com.jayway.surface.mycases.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class StreamflowEndUser implements UserDetails
{
   private static final long serialVersionUID = 7394561538412534853L;

   private String username;
   private String name;
   public String getName()
   {
      return name;
   }

   private String pnr;
   
   public StreamflowEndUser(String username, String name, String pnr)
   {
      this.username = username;
      this.name = name;
      this.pnr = pnr;
   }

   public String getPnr()
   {
      return pnr;
   }

   public Collection<? extends GrantedAuthority> getAuthorities()
   {
      return null;
   }

   public String getPassword()
   {
      return null;
   }

   public String getUsername()
   {
      return username;
   }

   public boolean isAccountNonExpired()
   {
      return true;
   }

   public boolean isAccountNonLocked()
   {
      return true;
   }

   public boolean isCredentialsNonExpired()
   {
      return true;
   }

   public boolean isEnabled()
   {
      return true;
   }


}
