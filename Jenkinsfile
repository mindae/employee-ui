pipeline {
    agent any

    environment {
        IMAGE_NAME = 'mindae/employee-ui'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    string(credentialsId: 'docker-hub-token',
                           variable: 'DOCKER_TOKEN')
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login \
                            -u mindae --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh '''
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
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