'use strict';

const puppeteer = require('puppeteer');
const select = require ('puppeteer-select');
const input = require('./input');


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  //Open the "Login" page
  await page.goto('https://passport.etutorium.com/auth/login/etutorium/ru');
  console.log('The Login page is opened');
 
  //Enter credentials into the fields
  await page.focus('input[name="login_username"]');
    await page.keyboard.type(input.username);
  await page.focus('input[name="login_password"]');
    await page.keyboard.type(input.password);
  
  //Press the "Enter" button
  await page.click('button[type="submit"]');
  
  //Wait until all resources have loaded
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  console.log('User has successfully logged in');
  
  //Press the "Setup" button
  await page.click('.table-container__button--icon svg');

  //Wait until all resources have loaded
  await page.waitForNavigation({waitUntil: 'networkidle0'});

  //Go to the "Participants" tab
  await select(page).assertElementPresent('.tab-container__tab:contains(Участники)');
  const participants = await select(page).getElement('.tab-container__tab:contains(Участники)');
  await participants.click()

  //Wait until all resources have loaded
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  console.log('The Participants tab is opened');

  //Click on the "Add Participants" button
  await select(page).assertElementPresent('.accordion_title:contains(Добавить участников)');
  const addParticipants = await select(page).getElement('.accordion_title:contains(Добавить участников)');
  await addParticipants.click()
  
  //Enter data into the "Add Participants" field
  await page.focus('textarea[ng-model="participants.emails_text"]');
    await page.keyboard.type('quentin@ddd.com, Quentin Tarantino');

  //Click on the "Submit" button
  await page.click('button[ng-click="participants.add()"]');
  console.log('The Participants have been added');
  
}) ();
