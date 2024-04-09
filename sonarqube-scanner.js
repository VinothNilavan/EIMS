const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:8084',
        token: "27d3c429990bcf77c232c4a2aba33631e37213b1",
        options: {
            'sonar.projectName': "MindsparkApp",
            'sonar.host.url':'http://localhost:8084',
            'sonar.projectKey': '27d3c429990bcf77c232c4a2aba33631e37213b1',
            'sonar.sources': './src',
            'sonar.login': "admin",
            'sonar.password': "admin",
            'sonar.sourceEncoding': "UTF-8",
            'sonar.exclusions': "github/**, .vscode/**, android/**, assets/**, build/**, ios/**, node_modules/**, scripts/**",
        }
    },
    () => process.exit()
)

//npm install -D sonarqube-scanner --legacy-peer-deps
//npm install -D jest-sonar-reporter --legacy-peer-deps