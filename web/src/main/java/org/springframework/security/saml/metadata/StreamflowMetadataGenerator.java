package org.springframework.security.saml.metadata;

public class StreamflowMetadataGenerator extends MetadataGenerator
{
   public void generateExtendedMetadata(ExtendedMetadata metadata) {
      super.generateExtendedMetadata( metadata );
      metadata.setIdpDiscoveryEnabled(false);
  }
}
