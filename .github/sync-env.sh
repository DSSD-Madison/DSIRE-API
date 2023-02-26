#!/bin/bash

# Syncs from the environment to all lambdas...
# $APPROVER_EMAIL_$GITHUB_REF_NAME as APPROVER_EMAIL
# $IDENTITY_EMAIL                  as IDENTITY_EMAIL
# $SMTP_USERNAME                   as SMTP_USERNAME
# $SMTP_PASSWORD                   as SMTP_PASSWORD


declare -A STAGES_LAMBDAS=( [main]=MainHandler [staging]=StagingHandler [testing]=TestingHandler )
declare -A STAGES_APPROVER_EMAILS=( [main]=APPROVER_EMAIL_MAIN [staging]=APPROVER_EMAIL_STAGING [testing]=APPROVER_EMAIL_TESTING )

STAGES=( main staging testing )
for stage in "${STAGES[@]}"; do
    aws lambda update-function-configuration \
        --function-name "${STAGES_LAMBDAS[$stage]}" \
        --environment "Variables={APPROVER_EMAIL=${!STAGES_APPROVER_EMAILS[$stage]},
                                  IDENTITY_EMAIL=${IDENTITY_EMAIL},
                                  SMTP_USERNAME=${SMTP_USERNAME},
                                  SMTP_PASSWORD=${SMTP_PASSWORD}}"
done
