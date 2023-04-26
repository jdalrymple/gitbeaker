#!/bin/sh

# use this as a startup script for a compute instance and it will self-destruct after specified interval
# (default = 20 min)
TIMEOUT=20

# schedule the instance to delete itself
echo "gcloud compute instances delete $(hostname) --zone northamerica-northeast1-b" | at Now + $TIMEOUT Minutes
