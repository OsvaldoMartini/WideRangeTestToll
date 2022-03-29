#!/bin/sh
#set -e
set -x

CDIR=$(cd `dirname "$0"` && pwd)
cd "$CDIR"

print_red() {
  printf '%b' "\033[91m$1\033[0m\n"
}

print_green() {
  printf '%b' "\033[92m$1\033[0m\n"
}

print_green "---Starting---"

OVERLAY=${1?You must pass in the name of the overlay you wish to use}
ENV=${2?You must pass in the name of the environment to deploy into}
SUPPLIED_IMAGE_TAG=${3?You must specify the tag of the image you want to deploy}

echo "Running overlay ${OVERLAY}, env ${ENV}, imageTag ${SUPPLIED_IMAGE_TAG}"

SOME_SECRET=${4?You must specify a value for some secret}
ANOTHER_SECRET=${5?You must specify a value for another secret}

echo "Secrets: ${SOME_SECRET}, ${ANOTHER_SECRET}"

NAMESPACE="bcss-${ENV}"
OVERLAY_FOLDER="overlays/${OVERLAY}/"
BUILD_VERSION=${SUPPLIED_IMAGE_TAG}

echo "Namespace: ${NAMESPACE}, Overlay folder: ${OVERLAY_FOLDER}, Build Version: ${BUILD_VERSION}"

sed "s/IMAGE_TAG_TO_BE_REPLACED/${SUPPLIED_IMAGE_TAG}/g" base/template/kustomization.yaml \
| sed "s/BUILD_VERSION_TO_BE_REPLACED/${BUILD_VERSION}/g" \
> base/kustomization.yaml

sed "s/NAMESPACE_TO_BE_REPLACED/${NAMESPACE}/g" base/template/namespace.yaml > base/namespace.yaml

sed "s/NAMESPACE_TO_BE_REPLACED/${NAMESPACE}/g" ${OVERLAY_FOLDER}template/kustomization.yaml \
> ${OVERLAY_FOLDER}kustomization.yaml

echo "Deploying into namespace ${NAMESPACE}..."

#########################
#   RUN KUBERNETES
#########################

echo "Running kubernetes in folder '${OVERLAY_FOLDER}', which contains:"
ls -l ${OVERLAY_FOLDER}

eval "kubectl kustomize ${OVERLAY_FOLDER}"
eval "kubectl kustomize ${OVERLAY_FOLDER} 1>&2"

eval "kubectl kustomize ${OVERLAY_FOLDER} | kubectl apply -f -"

# remove the base files that we created
eval "rm base/kustomization.yaml"
eval "rm base/namespace.yaml"
eval "rm ${OVERLAY_FOLDER}kustomization.yaml"

# output some handy debug
#echo "Checking results ..."
echo "Get Namespaces"
KUBECTL="kubectl ${KUBECTL_PARAMS}  --namespace=${NAMESPACE}"
eval "${KUBECTL} get namespaces --show-labels 1>&2"
echo "Get pods"
eval "${KUBECTL} get pods --show-labels 1>&2"
echo "Get services"
eval "${KUBECTL} get services  --show-labels 1>&2"
echo "Get network policies"
eval "${KUBECTL} get networkpolicies  --show-labels 1>&2"
echo "Get configmaps"
eval "${KUBECTL} get configmaps  --show-labels 1>&2"

eval "${KUBECTL} get svc 1>&2"

eval "${KUBECTL} get services 1>&2"

# For debugging display what's going on.
TRY=0
BCSS_WEB_ELB_DNS_NAME=""
while [ x${BCSS_WEB_ELB_DNS_NAME} = x ];
do
  TRY=$(expr $TRY + 1)
  if [ $TRY = 20 ]
  then
    eval "${KUBECTL} logs -l app=ddc-bcss-test-subject-selector-api 1>&2"
    eval "${KUBECTL} logs -l app=ddc-bcss-test-subject-selector-app 1>&2"
    eval "${KUBECTL} logs -l app=ddc-bcss-test-subject-selector-storybook 1>&2"
    exit 0
  fi
  echo Processing $TRY
  eval "${KUBECTL} get pods --show-labels 1>&2"
#  eval "${KUBECTL} describe svc ddc-bcss-test-subject-selector-storybook 1>&2"

  sleep 1
done

print_green "---Complete---"
