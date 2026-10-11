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
                    kubectl set image deployment/employee-ui \
                        employee-ui=${IMAGE_NAME}:${BUILD_NUMBER}

                    kubectl rollout status deployment/employee-ui
                '''
            }
        }
    }
}