#/bin/sh
cat <<EOF > .npmrc
always-auth=true
@nutrien:registry=https://packagecloud.io/agrible/lovepaign/npm/
//packagecloud.io/agrible/lovepaign/npm/:_authToken=${NPM_TOKEN}
EOF
yarn --frozen-lockfile
