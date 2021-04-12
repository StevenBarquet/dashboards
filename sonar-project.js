const sonarqubeScanner = require('sonarqube-scanner')

sonarqubeScanner(
  {
    serverUrl: 'http://192.168.1.201:9000',
    options: {
      'sonar.projectName': 'template-interware',
      'sonar.projectVersion': '1.0.0',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions':
        'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx,server/**/*.spec.js,server/**/*.test.js',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.javascript.file.suffixes': '.js,.jsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => {
    /* */
  }
)
