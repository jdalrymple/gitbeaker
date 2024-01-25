#!/bin/sh

# use this as a startup script for a compute instance and it will self-destruct after specified interval
# (default = 2 hours)

# retrieve interval from metadata service (if available)
TIMEOUT_FROM_METADATA=$(curl -H Metadata-Flavor:Google http://metadata.google.internal/computeMetadata/v1/instance/attributes/SELF_DESTRUCT_INTERVAL_MINUTES -s)

if [ -z "$TIMEOUT_FROM_METADATA" ]
then
    TIMEOUT=15
else
    TIMEOUT=$TIMEOUT_FROM_METADATA
fi

# Install at
toolbox apt-get install at

# schedule the instance to delete itself
INSTANCE_NAME=$(curl -sq "http://metadata.google.internal/computeMetadata/v1/instance/name" -H "Metadata-Flavor: Google")
INSTANCE_ZONE=$(curl -sq "http://metadata.google.internal/computeMetadata/v1/instance/zone" -H "Metadata-Flavor: Google")

echo "Terminating instance [${INSTANCE_NAME}] in zone [${INSTANCE_ZONE}}"

TOKEN=$(curl -sq "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" -H "Metadata-Flavor: Google" | jq -r '.access_token')

echo 'curl -X DELETE -H "Authorization: Bearer ${TOKEN}" https://www.googleapis.com/compute/v1/$INSTANCE_ZONE/instances/$INSTANCE_NAME' | at Now + $TIMEOUT Minutes
