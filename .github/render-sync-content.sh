#!/bin/bash

# Templating: replace...
# {% STAGE %} with $GITHUB_REF_NAME iff $GITHUB_REF_NAME != 'main'


BUCKET_PREFIX=dsire-api
STAGES=( main staging testing )

declare -A TOKENS_REPLACEMENTS
TOKENS_REPLACEMENTS[{% STAGE %}]="${GITHUB_REF_NAME#main}"


for view in dist/frontend/*.html; do
    for token in "${!TOKENS_REPLACEMENTS[@]}"; do
        sed -i -e "s~${token}~${TOKENS_REPLACEMENTS[$token]}~g" "${view}"
    done
done

for stage in "${STAGES[@]}"; do
    if [ "${stage}" == "${GITHUB_REF_NAME}" ] || ! aws s3 ls s3://"${BUCKET_PREFIX}"-hosting-"${stage}" | grep index.html || [ "${FORCE}" == "true" ]; then
        echo "Stage ${stage} modified or unfilled; filling with content from ${GITHUB_REF_NAME}"
        [ "${FORCE}" == "true" ] && echo "(forced)"
        aws s3 sync dist/frontend s3://"${BUCKET_PREFIX}"-hosting-"${stage}"
    fi
done
