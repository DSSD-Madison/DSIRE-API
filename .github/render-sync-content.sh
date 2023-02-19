#!/bin/bash

# Templating: replace...
# {% API_URL %} with $API_URL/$GITHUB_REF_NAME


BUCKET_PREFIX=dsire-api
STAGES=( main staging testing )

declare -A TOKENS_REPLACEMENTS
TOKENS_REPLACEMENTS[{% API_URL %}]="${API_URL}/${GITHUB_REF_NAME}"


for view in dist/frontend/*.html; do
    for token in "${!TOKENS_REPLACEMENTS[@]}"; do
        sed -i -e "s~${token}~${TOKENS_REPLACEMENTS[$token]}~g" "${view}"
    done
done

for stage in "${STAGES[@]}"; do
    # TODO check if need to be filled by content, not packages
    if [ "${stage}" == "${GITHUB_REF_NAME}" ] || ! aws s3 ls s3://"${BUCKET_PREFIX}"-packages | grep "${stage}" || [ "${FORCE}" == "true" ]; then
        echo "Stage ${stage} modified or unfilled; filling with content from ${GITHUB_REF_NAME}"
        [ "${FORCE}" == "true" ] && echo "(forced)"
        aws s3 sync dist/frontend s3://"${BUCKET_PREFIX}"-hosting-"${stage}"
    fi
done
