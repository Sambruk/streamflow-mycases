package com.jayway.surface.mycases.security;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.saml.SAMLCredential;
import org.springframework.security.saml.userdetails.SAMLUserDetailsService;

public class StreamflowSAMLUserDetailsService implements SAMLUserDetailsService
{

   public Object loadUserBySAML(SAMLCredential credential) throws UsernameNotFoundException
   {
      
      String username = credential.getNameID().getValue();
      String name = credential.getAttributeByName( "Subject_CommonName" ).getAttributeValues().get( 0 ).getDOM().getTextContent();
      String pnr = credential.getAttributeByName( "Subject_SerialNumber" ).getAttributeValues().get( 0 ).getDOM().getTextContent();
      return new StreamflowEndUser(username, name, pnr);
      
   }

}
