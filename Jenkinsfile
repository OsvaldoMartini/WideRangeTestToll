#!/usr/bin/env groovy

@Library("texas-pipeline@master")
import texas.common.pipeline.Pipeline

Pipeline texasPipeline = new Pipeline()

pipeline {
  agent {
    label 'jenkins-slave'
  }

  options {
    disableConcurrentBuilds()
    gitLabConnection('Jenkins-Gitlab')
  }

  environment {
    // which environment to deploy to
    ACCOUNT_SHORT_NAME="live-k8s-nonprod"

    TEAMS_WEBHOOK_URL="https://hscic365.webhook.office.com/webhookb2/658539dc-7ffc-4ce0-acec-467ba758c7a6@50f6071f-bbfe-401a-8803-673748e629e2/IncomingWebhook/6ecfc484fcfa4d99b945d06fd654313c/3c3ddee9-a18c-4034-9b28-230ece677efa"

    // COMMON_NAME is used throughout the pipeline.
    // the library will assume that:
    // - your ECR repo in AWS is called this exact text (with "/deployment" on the end)
    // - your Secrets Manager store in AWS is called this exact text
    // the library will also use the common name as:
    // - the git image name
    // - your sonarqube project name
    // - the kubernetes namespace prefix
    // - the kubernetes pod name
    // However, you can override any of these (see below)
    COMMON_NAME="test-subject-selector"

    // Project specific variables
    JIRA_TICKET_PREFIX='BCSS'
    GIT_PROJECT="bcss/${env.COMMON_NAME}-ts"

    // Docker Configuration
    DOCKER_IMAGE_NAME="${env.COMMON_NAME}"
    // BUILD_DOCKER_FILE='pipeline-build.dockerfile'
    BUILD_DOCKER_FILE='SET IN STAGE'
    RUNTIME_DOCKER_FILE='SET IN STAGE'

    // Deployment Configuration
    DEPLOYMENT_FILE="deployment/deploy.sh ${env.ACCOUNT_SHORT_NAME}"
    SECRET_NAME_PREFIX="bcss-${env.COMMON_NAME}"

    SECRET_DEPLOYMENT_KEY_ORDER='some_secret,another_secret'

    // Slack notifications (see https://confluence.digital.nhs.uk/display/TEX/Jenkins)
//    SLACK_TEAM_DOMAIN = '<your slack space>'
//    SLACK_CHANNEL = '<your channel>'
//    SLACK_TOKEN = '<your token>'

    // TODO infer from COMMON_NAME
    ECR_REPO="bcss-${env.COMMON_NAME}"
    NAMESPACE_PREFIX="bcss"
    POD_NAME="ddc-bcss-${env.COMMON_NAME}"

    // Sonarqube
    SONARQUBE_DOCKER_FILE='pipeline-sonar.dockerfile'
    SONARQUBE_PROJECT_NAME_BASE="${env.COMMON_NAME}"

    // Optional - Sonarqube
    SONARQUBE_ANALYSIS_TIMEOUT_SECONDS=100

    // Optional - Twistlock
    //COMPLIANCE_POLICY="critical"
    //VULNERABILTY_POLICY="warn"
    //VULNERABILTY_GRACE_PERIOD=0

    // Optional - CI/CD
    //TIME_TO_LIVE='2'
    //BUILDS_TO_KEEP='5'
    //TIME_TO_WAIT_FOR_DNS_SERVICE=120
  }

  stages {
    stage('Prepare Environment') {
      steps {
        script {
          updateGitlabCommitStatus name: 'build', state: 'running'
          // Need to prepare before sending notify so we can construct the URL correctly.
          texasPipeline.prepare(this)
          sendTeamsNotification(this, 'Started')
        }
      }
    }

    stage('Create Base Build Image') {
      environment {
        DOCKER_IMAGE_NAME='test-subject-selector-base'
        BUILD_DOCKER_FILE='pipeline-build-base.dockerfile'
      }
      steps {
        script {
          texasPipeline.buildBaseImage(this)
        }
      }
    }

    stage('Build') {
      parallel {
        stage('Build App and Create Image') {
          environment {
            DOCKER_IMAGE_NAME='test-subject-selector-app'
            BUILD_DOCKER_FILE='pipeline-build-app.dockerfile'
          }
          steps {
            script {
              sh """
                echo Build App and Create Image
              """
              texasPipeline.buildBaseImage(this)
            }
          }
        }
        stage('Build Storybook and Create Image') {
          environment {
            DOCKER_IMAGE_NAME='test-subject-selector-storybook'
            BUILD_DOCKER_FILE='pipeline-build-storybook.dockerfile'
          }
          steps {
            script {
              texasPipeline.buildBaseImage(this)
            }
          }
        }
      }
    }

    stage('Quality Checks') {
      parallel {
        stage('Unit Tests') {
          steps {
            script {
              // texasPipeline.buildImage(this, "pipeline-unit-tests.dockerfile", "unit-tests")
              echo "TODO - Unit tests"
            }
          }
        }
        stage('Static code analysis') {
          steps {
            script {
              echo "TODO - SonarQube commented out for now for effciency purposes"
              
              withCredentials([string(credentialsId: 'SONARQUBE_JENKINS_TOKEN', variable: 'SONARQUBE_JENKINS_TOKEN_FROM_SECRET')]) {
                SONARQUBE_SERVER_URL="https://sonarqube-bcss.mgmt.texasplatform.uk"
                sh """
                  docker build \
                    --network host \
                    --build-arg SONARQUBE_SERVER_URL=${SONARQUBE_SERVER_URL} \
                    --build-arg SONARQUBE_JENKINS_TOKEN=${SONARQUBE_JENKINS_TOKEN_FROM_SECRET} \
                    --build-arg PROJECT_KEY=${SONAR_PROJECT_KEY} \
                    --build-arg VERSION=${VERSION} \
                    -t ${env.DOCKER_IMAGE_NAME}:sonarqube \
                    -t ${env.DOCKER_IMAGE_NAME}-sonarqube:${VERSION} \
                    -f ${env.WORKSPACE}/${env.SONARQUBE_DOCKER_FILE} \
                    ${env.WORKSPACE}
                """

                // Can't use the generic Texas approach.
                // texasPipeline.runSonarQube(this)
              }
              
            }
          }
        }
      }
    }

    stage('Deployment') {
      parallel {
        stage('App') {
          stages {
            stage('Build App Runtime') {
              environment {
                ECR_REPO="bcss-${env.COMMON_NAME}-app"
                RUNTIME_DOCKER_FILE='pipeline-runtime-app.dockerfile'
              }
              steps {
                script {
                  sh """
                    echo Build App Runtime
                  """
                  texasPipeline.buildRuntimeImage(this)
                }
              }
            }
            stage('Push App Runtime Image') {
              environment {
                ECR_REPO="bcss-${env.COMMON_NAME}-app"
              }
              steps {
                script {
                  sh """
                    echo Push App Runtime Image
                  """
                  texasPipeline.pushImageToContainerRegistry(this)
                }
              }
            }
          }
        }
        stage('Storybook') {
          stages {
            stage('Build Storybook Runtime') {
              environment {
                ECR_REPO="bcss-${env.COMMON_NAME}-storybook"
                RUNTIME_DOCKER_FILE='pipeline-runtime-storybook.dockerfile'
              }
              steps {
                script {
                  texasPipeline.buildRuntimeImage(this)
                }
              }
            }
            stage('Push Storybook Runtime Image') {
              environment {
                ECR_REPO="bcss-${env.COMMON_NAME}-storybook"
              }
              steps {
                script {
                  texasPipeline.pushImageToContainerRegistry(this)
                }
              }
            }
          }
        }
      }

      /* Deploy isn't working so don't do this for now.
      stage('Wait for Deploy') {
        steps {
          script {
            texasPipeline.checkDeployment(this)
          }
        }
      }
      */
    }
    
    stage('Deploy') {
      steps {
        script {
          texasPipeline.deploy(this)
        }
      }
    }

    stage('Tidy Up') {
      steps {
        script {
          echo "Tidy up"
          texasPipeline.tidyUp(this)
        }
      }
    }    
  }

  post {
    failure {
      script {
        echo "###################################"
        echo "#             FAILURE             #"
        echo "###################################"

        updateGitlabCommitStatus name: 'build', state: 'failed'
        sendTeamsNotification(this, 'Failed')
        texasPipeline.emailBuildFailureToCulprits(this)
//        texasPipeline.sendTexasSlackNotification('FAILED', this)
      }
    }
    success {
      script {
//        texasPipeline.sendTexasSlackNotification('SUCCESSFUL', this)

        updateGitlabCommitStatus name: 'build', state: 'success'
        sendTeamsNotification(this, 'Success')

        echo "###################################"
        echo "#             SUCCESS             #"
        echo "###################################"
      }
    }
    aborted {
      script {
        updateGitlabCommitStatus name: 'build', state: 'canceled'
        sendTeamsNotification(this, 'Aborted')

        echo "###################################"
        echo "#             CANCELLED           #"
        echo "###################################"
      }
    }
    unstable {
      script {

        updateGitlabCommitStatus name: 'build', state: 'failed'
        sendTeamsNotification(this, 'Unstable')

        echo "###################################"
        echo "#        PARTIAL SUCCESS          #"
        echo "###################################"
        echo "Deployed, but there were warnings. See build output"
      }
    }
    cleanup {
      script {
        texasPipeline.clearWorkspace()
      }
    }
  }
}

def sendTeamsNotification(steps, state) {
  echo "sendTeamsNotification"
  //echo "GIT_COMMIT ${steps.GIT_COMMIT}"
  //echo "STATE ${state}"
  //SET_STATUS='curl -X POST --header \"PRIVATE-TOKEN: HJiBG2GoNLUxndCBdrG_\" \"https://gitlab.mgmt.texasplatform.uk/api/v4/projects/374/statuses/'+steps.GIT_COMMIT+'?state='+state+'\"'

  URL_PREFIX = steps.env.NAMESPACE_PREFIX + "-" + steps.PIPELINE_ID + "-" + steps.env.POD_NAME + "-"
  URL_SUFFIX = "." + steps.K8S_NAME + ".texas" + steps.TEXAS_PLATFORM + ".uk"
  APP_URL = URL_PREFIX+"app"+URL_SUFFIX
  STORYBOOK_URL = URL_PREFIX+"storybook"+URL_SUFFIX

  JENKINS_URL = "https://jenkins.mgmt.texas" + steps.TEXAS_PLATFORM + ".uk/view/BCSS/job/"+steps.env.NAMESPACE_PREFIX+"-"+steps.COMMON_NAME+'/job/'+steps.env.BRANCH_NAME
  JENKINS_URL = JENKINS_URL.replace("/"+JIRA_TICKET_PREFIX+"-","%252F"+JIRA_TICKET_PREFIX+"-")

  echo "JENKINS_URL: ${JENKINS_URL}"

  MSG_MOD=""
  if (state == 'Success') {
    MSG_MOD=", { \
                \"name\": \"App URL\", \
                \"value\": \"https://"+APP_URL+"\" \
            }, { \
                \"name\": \"Storybook URL\", \
                \"value\": \"https://"+STORYBOOK_URL+"\" \
            }"

  }

  SEND_NOTIFY="curl -X POST "+steps.TEAMS_WEBHOOK_URL+" \
      -H 'Content-Type: application/json' \
      -d '{ \
        \"@type\": \"MessageCard\", \
        \"@context\": \"http://schema.org/extensions\", \
        \"themeColor\": \"0076D7\", \
        \"summary\": \"Jenkins Build Message\", \
        \"sections\": [{ \
            \"activityTitle\": \"React App Pipeline Message\", \
            \"activitySubtitle\": \""+steps.COMMON_NAME+": [Click here to go to Jenkins]("+JENKINS_URL+")\", \
            \"activityImage\": \"https://reactjs.org/logo-og.png\", \
            \"facts\": [{ \
                \"name\": \"State\", \
                \"value\": \""+state+"\" \
            }"+MSG_MOD+"], \
            \"markdown\": true \
          }] \
        }'"

  sh """
    echo just a test
    ${SEND_NOTIFY}
  """  
}