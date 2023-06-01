FROM --platform=amd64 public.ecr.aws/lambda/nodejs:16

# Code.fromDockerBuild expects artifacts in /asset folder:
# https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Code.html#static-fromwbrdockerwbrbuildpath-options
WORKDIR /asset

ARG NPM_TOKEN
RUN echo "always-auth=true" >> ~/.npmrc \
  && echo "@nutrien:registry=https://packagecloud.io/agrible/lovepaign/npm/" >> ~/.npmrc \
  && echo "//packagecloud.io/agrible/lovepaign/npm/:_authToken=${NPM_TOKEN}" >> ~/.npmrc

COPY nodejs/package.json nodejs/

RUN cd nodejs && npm install --omit=dev
