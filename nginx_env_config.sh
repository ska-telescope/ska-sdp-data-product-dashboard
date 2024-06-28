#!/bin/env bash

################################################################################
# Setup
################################################################################

if [ -z "$ENV_SEPARATOR" ]; then
    ENV_SEPARATOR=':'
fi
if [ -z "$ENV_TYPE_FILE" ]; then
    ENV_TYPE_FILE='/expected_env_names'
fi
if [ -z "$ENV_JS_OUTPUT_LOCATION" ]; then
    ENV_JS_OUTPUT_LOCATION='/usr/share/nginx/html/env.js'
fi

################################################################################
# End Setup
################################################################################

read_vault()
{
    if [ -f /vault/secrets/config ]; then
        echo "Using vault config"
        source /vault/secrets/config
    else
        echo "No vault secrets found, skipping loading"
    fi
}

get_type_default()
{
    if [[ "$1" == "str" ]]; then
        echo ''
    elif [[ "$1" == "int" ]]; then
        echo '0'
    elif [[ "$1" == "bool" ]]; then
        echo 'false' # quote false to avoid the builtin running
    else
        echo ''
    fi
}

output_js_line()
{
    # add explicit quoting if we are a string,
    if [[ "$1" == "str" ]]; then
        echo -n "  $2: '$3'"
    else
        echo -n "  $2: $3"
    fi
}

create_env_js()
{
    {
        echo 'window.env = {'
        count=0

        # read each line of the input file
        while read -r line; do

            # Get expected name, and type
            var="$(echo "$line" | cut -d "$ENV_SEPARATOR" -f1)"
            type="$(echo "$line" | cut -d "$ENV_SEPARATOR" -f2)"

            # Get default values
            default="$(get_type_default "$type")"

            # Check if the variable name stored in `var` exists and isn't blank
            # if it exists and isn't blank use it
            # otherwise use the value in the `default` variable
            val="${!var:-$default}"

            # if we are after the first line, add a comma
            if [[ count -gt 0 ]]; then
                echo ','
            fi

            output_js_line "$type" "$var" "$val"

            count=$((count+1))
        done < "$ENV_TYPE_FILE"

        echo -e "\n}"
    } > "$ENV_JS_OUTPUT_LOCATION"
}

read_vault

# Check if we have a ENV type list
if [ -f "$ENV_TYPE_FILE" ]; then
    create_env_js
    echo "ENV added to $ENV_JS_OUTPUT_LOCATION"
else
    echo "No Setup Required, mising '$ENV_TYPE_FILE'"
fi
