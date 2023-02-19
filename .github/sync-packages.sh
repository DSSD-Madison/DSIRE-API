#!/bin/bash


BUCKET_PREFIX=dsire-api


STAGES=( main staging testing )
for stage in "${STAGES[@]}"; do
    if [ "${stage}" == "${GITHUB_REF_NAME}" ] || ! aws s3 ls s3://"${BUCKET_PREFIX}"-packages | grep "${stage}" || [ "${FORCE}" == "true" ]; then
        echo "Stage ${stage} modified or unfilled; filling with package from ${GITHUB_REF_NAME}"
        [ "${FORCE}" == "true" ] && echo "(forced)"
        mv dist/api-*.zip dist/api-"${stage}".zip
        aws s3 sync dist/ s3://"${BUCKET_PREFIX}"-packages --exclude "*" --include "*.zip"
    fi
done
