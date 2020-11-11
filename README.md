# etutorium

You have to install Node.js and Puppeteer to run the tests. 

Steps:
1. Install Node.js on your machine
2. Create a project directory 
3. Open a command line
4. Go to your project directory (cd /path/to/project)
5. Use "npm init" command
6. Install Puppeteer using "npm i puppeteer" command
7. Install puppeterr-select using "npm i puppeteer-select" command
8. Clone autotests from the repository to the project directory
9. Run autotests using "node name.js" (obviously, use actual autotests name instead name.js)
10. Enjoy

About files:
1. createWebinar.js — autotest which creates webinar using GUI. 
2. addUser.js — autotest which adds participant to the created webinar using GUI.
3. input.js — contains credentials for login. These credentials are used only in the "Add User" test.  
In the meanwhile, the "Create Webinar" test uses variables for login. 
