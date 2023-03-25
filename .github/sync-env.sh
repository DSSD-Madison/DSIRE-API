#!/bin/bash

# Syncs from the environment to all lambdas...
# $APPROVER_EMAIL_$GITHUB_REF_NAME as APPROVER_EMAIL (on the lambda/stage matching $GITHUB_REF_NAME)
# $GITHUB_REF_NAME                 as STAGE
# $IDENTITY_EMAIL                  as IDENTITY_EMAIL
# $PUBLIC_KEY                      as PUBLIC_KEY
# $PRIVATE_KEY                     as PRIVATE_KEY
# $SIGNING_SECRET                  as SIGNING_SECRET
# $SMTP_USERNAME                   as SMTP_USERNAME
# $SMTP_PASSWORD                   as SMTP_PASSWORD


declare -A STAGES_LAMBDAS=( [main]=MainHandler [staging]=StagingHandler [testing]=TestingHandler )
declare -A STAGES_APPROVER_EMAILS=( [main]=APPROVER_EMAIL_MAIN [staging]=APPROVER_EMAIL_STAGING [testing]=APPROVER_EMAIL_TESTING )

STAGES=( main staging testing )
for stage in "${STAGES[@]}"; do
    aws lambda update-function-configuration \
        --function-name "${STAGES_LAMBDAS[$stage]}" \
        --environment "Variables={APPROVER_EMAIL='${!STAGES_APPROVER_EMAILS[$stage]}',
                                  IDENTITY_EMAIL='${IDENTITY_EMAIL}',
                                  PUBLIC_KEY='${PUBLIC_KEY}',
                                  PRIVATE_KEY='${PRIVATE_KEY}',
                                  ROOT_API_URL='${ROOT_API_URL}',
                                  SIGNING_SECRET='${SIGNING_SECRET}',
                                  SMTP_USERNAME='${SMTP_USERNAME}',
                                  SMTP_PASSWORD='${SMTP_PASSWORD}',
                                  STAGE='${GITHUB_REF_NAME}'}"
done
