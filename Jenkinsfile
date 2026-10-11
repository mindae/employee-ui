pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:${env.PATH}"
        IMAGE_NAME = "mindae/employee-ui"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker --version'
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" |
                            docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push ${IMAGE_NAME}:${BUILD_NUMBER}'
            }
        }

        stage('Kubernetes Check') {
            steps {
                sh 'kubectl version --client'
                sh 'kubectl get nodes'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh '''
                    if kubectl get deployment employee-ui >/dev/null 2>&1; then
                        echo "Updating existing employee-ui deployment"

                        kubectl set image deployment/employee-ui \
                            employee-ui=${IMAGE_NAME}:${BUILD_NUMBER}
                    else
                        echo "Creating initial employee-ui deployment"

                        kubectl create deployment employee-ui \
                            --image=${IMAGE_NAME}:${BUILD_NUMBER}

                        kubectl set env deployment/employee-ui \
                            API_GATEWAY_HOST=api-gateway \
                            API_GATEWAY_PORT=9090
                    fi

                    kubectl rollout status deployment/employee-ui
                '''
            }
        }
    }
}