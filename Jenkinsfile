pipeline{
    agent any
    tools{
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME=tool 'sonar-scanner'
    }
    stages {
        stage("Sonarqube Analysis "){
            steps{
                withSonarQubeEnv('sonar-server') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.organization=qube-demo -Dsonar.projectKey=qube-demo_vastra -Dsonar.sources=. -Dsonar.host.url=https://sonarcloud.io'''
                }
            }
        }
        stage("Quality gate"){
           steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 
                }
            } 
        }
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
        stage('OWASP SCAN') {
    steps {
        dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNpmAudit --disableNodeAudit', odcInstallation: 'DP-Check'
        dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    }
}
        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }
        stage("Docker Build & Push") {
    		steps {
        		script {
            			// Build Docker image
            			sh "docker build -t vastra ."
				withCredentials([usernamePassword(credentialsId:"docker-hub", passwordVariable:"dockerHubPass", usernameVariable:"dockerHubUser")]){
				
				// Tag the Docker image
                    		sh "docker tag vastra ${env.dockerHubUser}/vastra:latest"

				//login to docker hub
                    		sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"

				// Push the Docker image to the registry
                    		sh "docker push ${env.dockerHubUser}/vastra:latest"
                	}
    		}
	}

        stage("TRIVY"){
            steps{
                sh "trivy image pawan8979/vastra:latest > trivy.txt" 
            }
        }
        stage('Deploy to container'){
            steps{
                sh 'docker run -d --name vastra -p 3000:3000 pawan8979/vastra:latest'
            }
        }
        stage('Deploy to k8s'){
            steps{
                script{
                    kubernetesDeploy (configs: 'deployment.yaml',kubeconfigId: 'k8sconfigpwd')
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}