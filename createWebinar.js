'use strict';

const puppeteer = require('puppeteer');
const select = require ('puppeteer-select');

const creds = {
	username: 'tosterfinn@gmail.com',
	password: 'secret12'
}; 

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  //Open the "Login" page
  await page.goto('https://passport.etutorium.com/auth/login/etutorium/ru');
  console.log('The Login page is opened');
 
  //Enter credentials into the fields
  await page.focus('input[name="login_username"]');
    await page.keyboard.type(creds.username);
  await page.focus('input[name="login_password"]');
    await page.keyboard.type(creds.password);
  
  //Press the "Enter" button
  await page.click('button[type="submit"]');
  
  //Wait until all resources have loaded
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  console.log('User has successfully logged in');
  
  //Press the "Create Webinar" button
  await page.click('.header-container__button-icon svg');

  //Wait until all resources have loaded
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  console.log('The Create Webinar page is opened');
  
  //Enter a titile into the "Title" field
  await page.focus('textarea[ng-model="main.webinar.title"]');
    await page.keyboard.type('Expo');
  
  //Choose a start time
  await page.click('.list-container--time-data .list-container__selected-item__icon svg');
    await select(page).assertElementPresent('div[ng-click="main.set_start_time(time.delta)"]:contains(16:00)');
    const startTime = await select(page).getElement('div[ng-click="main.set_start_time(time.delta)"]:contains(16:00)');
    await startTime.click()
  
  //Choose end time
  await page.click('.list-container--time-data .list-container__selected-item__icon svg');
    await select(page).assertElementPresent('div[ng-click="main.set_finish_time(time.delta)"]:contains(18:00)');
    const endTime = await select(page).getElement('div[ng-click="main.set_finish_time(time.delta)"]:contains(18:00)');
    await endTime.click()
  
  //Turn on access by link
  await select(page).assertElementPresent('.checkbox-container__text:contains(включить доступ по общей ссылке)');
    const generalAccess = await select(page).getElement('.checkbox-container__text:contains(включить доступ по общей ссылке)');
    await generalAccess.click()

  //Press the "Save" button
  await page.click('.button-success');
  console.log('Webinar has been created');

}) ();