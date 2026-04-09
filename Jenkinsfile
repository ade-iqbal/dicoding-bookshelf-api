pipeline {
    agent any

    environment {
        APP_NAME = 'my-app'
        CONTAINER_NAME = 'my-app-container'
        APP_PORT = '3000'
    }

    triggers {
        pollSCM '* * * * *'
    }

    stages {
        stage('Test') {
            steps {
                echo 'Testing...'
                // Add your test steps here
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                script {
                    sh '''
                        # Stop container jika sedang berjalan
                        docker stop ${CONTAINER_NAME} || true
                        
                        # Remove container lama
                        docker rm ${CONTAINER_NAME} || true
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker build . -t ${APP_NAME}:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:${APP_PORT} \
                        --restart unless-stopped \
                        ${APP_NAME}:latest
                '''
            }
        }
    }

    post {
        always {
            // Cleanup dangling images
            sh 'docker image prune -f || true'
        }
        failure {
            // Rollback jika deployment gagal
            echo 'Deployment failed! Check logs above.'
        }
    }
}