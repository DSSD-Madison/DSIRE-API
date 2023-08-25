#!/bin/bash

# Templating: replace...
# {% API_URL %} with $API_URL
# {% GCP_SITE_KEY %} with $GCP_SITE_KEY
# {% REF_NAME %} with $REF_NAME if $REF_NAME != 'main' else ""
# {% COMMIT_HASH_SHORT %} with the first 7 characters of $GITHUB_SHA if $REF_NAME != 'main' else ""


[ -r .env ] && export $(grep -v '^#' .env | xargs)

declare -A TOKENS_REPLACEMENTS
TOKENS_REPLACEMENTS['{% API_URL %}']="${API_URL}"
TOKENS_REPLACEMENTS['{% GCP_SITE_KEY %}']="${GCP_SITE_KEY}"
TOKENS_REPLACEMENTS['{% REF_NAME %}']=""
TOKENS_REPLACEMENTS['{% COMMIT_HASH_SHORT %}']=""
if [[ "${REF_NAME}" != 'main' ]]; then
    TOKENS_REPLACEMENTS['{% REF_NAME %}']="${REF_NAME}"
    TOKENS_REPLACEMENTS['{% COMMIT_HASH_SHORT %}']="${GITHUB_SHA:0:7}"
fi


cp -r static/templates/* ../dist/frontend
cd ../dist/frontend
shopt -s globstar
for view in **/*.html; do
    for token in "${!TOKENS_REPLACEMENTS[@]}"; do
        sed -i "s~${token}~${TOKENS_REPLACEMENTS[$token]}~g" "${view}"
    done
done
