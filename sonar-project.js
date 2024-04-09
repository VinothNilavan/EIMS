const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://10.0.4.142:9000/',
       options : {
	    'sonar.projectDescription': 'This is a Mindspark React-native application',
	    'sonar.projectName': 'Mindspark-MobileApp',
	    'sonar.projectKey':'Mindspark-MobileApp',
	    'sonar.login': 'sqa_25e6bc4e6d28baf7cec6c52b03edb412d0ae1707',
         'sonar.projectVersion':'1.0',
         'sonar.sourceEncoding':'UTF-8',
         'sonar.sources': './src',
	      //'sonar.tests': 'specs',
          //'sonar.inclusions' : 'src/**',
          //'sonar.javascript.lcov.reportPaths=coverage/lcov.info'
       },
}, () => {});