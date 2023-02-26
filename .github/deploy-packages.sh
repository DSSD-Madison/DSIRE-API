#!/bin/bash


BUCKET_PREFIX=dsire-api
declare -A STAGES_LAMBDAS=( [main]=MainHandler [staging]=StagingHandler [testing]=TestingHandler )


STAGES=( main staging testing )
for stage in "${STAGES[@]}"; do
    if [ "${stage}" == "${GITHUB_REF_NAME}" ] || [ "${FORCE}" == "true" ]; then
        echo "Deploying package ${stage}"
        [ "${FORCE}" == "true" ] && echo "(forced)"
        aws lambda update-function-code --function-name "${STAGES_LAMBDAS[$stage]}" --s3-bucket "${BUCKET_PREFIX}"-packages --s3-key api-"${stage}".zip
    fi
done
