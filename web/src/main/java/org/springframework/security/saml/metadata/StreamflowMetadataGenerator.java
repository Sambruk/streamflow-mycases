/**
 * Copyright 2009-2012 Jayway Products AB. All Rights Reserved by Jayway Products AB.
 *
 * The content of this file is property of Jayway Products AB, org no 556777-9896, with the address
 * Hans Michelsensgatan 9, SE-211 20 Malmö, Sweden. Any unauthorized review, use, disclosure
 * or distribution is prohibited.
 */
package org.springframework.security.saml.metadata;

public class StreamflowMetadataGenerator extends MetadataGenerator
{
   public void generateExtendedMetadata(ExtendedMetadata metadata) {
      super.generateExtendedMetadata( metadata );
      metadata.setIdpDiscoveryEnabled(false);
  }
}
