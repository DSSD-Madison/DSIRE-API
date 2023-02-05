#!/bin/bash


BUCKET_PREFIX=dsire-api


STAGES=( main staging testing )
for stage in "${STAGES[@]}"; do
    if ! aws s3 ls s3://"${BUCKET_PREFIX}"-packages | grep "${stage}" || [ "${FORCE}" == "true" ]; then
        echo "Stage ${stage} unfilled; filling with distributions from ${GITHUB_REF_NAME}"
        [ "${FORCE}" == "true" ] && echo "(forced unfilled)"
        mv dist/*-api.zip dist/"${stage}"-api.zip
        aws s3 sync dist/ s3://"${BUCKET_PREFIX}"-packages --exclude "*" --include "*.zip"
        aws s3 sync dist/frontend s3://"${BUCKET_PREFIX}"-hosting-"${stage}"
    fi
done
