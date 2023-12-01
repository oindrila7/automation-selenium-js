// Include the chrome driver
require("chromedriver");

const { Builder, Browser, By, until} = require("selenium-webdriver");

function generateRandomString(length) {
   const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
   let randomString = '';

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
   }

   return randomString;
}

function generateRandomEmail() {
   const username = generateRandomString(8);
   const domain = 'gmail.com';

   return `${username}@${domain}`;
}

(async function execute() {
   // 1. Launch browser(Chrome/Firefox)
   let driver = await new Builder().forBrowser(Browser.CHROME).build();

   try {
      // Maximize the browser window
      await driver.manage().window().maximize();

      // 2. Navigate to url 'http://automationexercise.com'
      await driver.get('http://automationexercise.com');

      // 3. Verify that home page is visible successfully
      await driver.wait(until.titleIs('Automation Exercise'), 5000);

      // 4. Add products to cart
      await driver.findElement(By.css(`a[href='/product_details/1']`)).click();

      // Verify that details page is visible successfully
      await driver.wait(until.titleIs('Automation Exercise - Product Details'), 5000);
      await driver.sleep(1000);

      // Click 'Add to Cart' button
      await driver.findElement(By.css('.btn.btn-default.cart')).click();

      // 5. Click 'Cart' button
      await driver.findElement(By.css(`a[href='/view_cart']`)).click();

      // 6. Verify that cart page is displayed
      await driver.wait(until.titleIs('Automation Exercise - Checkout'), 5000);
      await driver.navigate().refresh();
      await driver.wait(until.titleIs('Automation Exercise - Checkout'), 5000);

      // 7. Click 'Proceed To Checkout'
      await driver.findElement(By.className('check_out')).click();
      await driver.sleep(1000);

      // Wait for the modal to appear
      await driver.wait(until.elementLocated(By.id('checkoutModal')), 5000);

      // 8. Click 'Register / Login' button
      await driver.findElement(By.css('#checkoutModal a[href="/login"]')).click();
      await driver.sleep(1000);

      // Verify that signup page is visible successfully
      await driver.wait(until.titleIs('Automation Exercise - Signup / Login'), 5000);

      // 9. Fill all details in Sign up and create account
      await driver.findElement(By.css(`input[name='name']`)).sendKeys('test');
      await driver.sleep(1000);
      await driver.findElement(By.css(`input[data-qa='signup-email']`)).sendKeys(generateRandomEmail());
      await driver.sleep(1000);
      await driver.findElement(By.css(`button[data-qa='signup-button']`)).click();

      await driver.wait(until.titleIs('Automation Exercise - Signup'), 5000);

      await driver.findElement(By.id(`password`)).sendKeys('12345678');
      await driver.sleep(1000);
      await driver.findElement(By.id(`first_name`)).sendKeys('Jhon');
      await driver.sleep(1000);
      await driver.findElement(By.id(`last_name`)).sendKeys('Doe');
      await driver.sleep(1000);
      await driver.findElement(By.id(`address1`)).sendKeys('Something');
      await driver.sleep(1000);
      await driver.findElement(By.id(`state`)).sendKeys('Something');
      await driver.sleep(1000);
      await driver.findElement(By.id(`city`)).sendKeys('Something');
      await driver.sleep(1000);
      await driver.findElement(By.id(`zipcode`)).sendKeys('Doe');
      await driver.sleep(1000);
      await driver.findElement(By.id(`mobile_number`)).sendKeys('0123456789');
      await driver.sleep(1000);
      await driver.findElement(By.css(`button[data-qa='create-account']`)).click();


      // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
      await driver.wait(until.titleIs('Automation Exercise - Account Created'), 5000);
      await driver.findElement(By.css(`a[data-qa='continue-button']`)).click();

      // 11. Verify 'Logged in as username' at the top
      await driver.wait(until.titleIs('Automation Exercise'), 5000);
      const isIconExist = await driver.findElement(By.css('li i.fa.fa-user')).isDisplayed();
      if (isIconExist) {
         // 12. Click 'Cart' button
         await driver.findElement(By.css(`a[href='/view_cart']`)).click();
         await driver.wait(until.titleIs('Automation Exercise - Checkout'), 5000);

         // 13. Click 'Proceed To Checkout' button
         await driver.findElement(By.className('check_out')).click();

         // 14. Verify Address Details and Review Your Order
         await driver.wait(until.titleIs('Automation Exercise - Checkout'), 5000);

         // 15. Enter description in comment text area and click 'Place Order'
         await driver.sleep(1000);
         const textarea = await driver.wait(until.elementLocated(By.css('textarea[name="message"]')), 5000);
         await textarea.clear();
         await textarea.sendKeys('This is a test order');
         await driver.sleep(1000);
         await driver.findElement(By.css(`a[class='btn btn-default check_out']`)).click();
         await driver.wait(until.titleIs('Automation Exercise - Payment'), 5000);

         // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
         await driver.findElement(By.css(`input[name='name_on_card']`)).sendKeys('Jhon Doe');
         await driver.sleep(1000);
         await driver.findElement(By.css(`input[name='card_number']`)).sendKeys('1234567812345678');
         await driver.sleep(1000);
         await driver.findElement(By.css(`input[name='cvc']`)).sendKeys('123');
         await driver.sleep(1000);
         await driver.findElement(By.css(`input[name='expiry_month']`)).sendKeys('11');
         await driver.sleep(1000);
         await driver.findElement(By.css(`input[name='expiry_year']`)).sendKeys('2030');
         await driver.sleep(1000);

         // 17. Click 'Pay and Confirm Order' button
         await driver.findElement(By.css(`button[data-qa='pay-button']`)).click();

         // 18. Verify the success message 'Your order has been placed successfully!'
         await driver.wait(until.titleIs('Automation Exercise - Order Placed'), 5000);
         const isOrderPlaced = await driver.findElement(By.css('h2[data-qa="order-placed"]')).isDisplayed();

         if (isOrderPlaced) {
            console.log('Order placed successfully')
         } else {
            console.log('Something went wrong during order placement!')
         }
      } else {
         console.log('Not logged in!');
      }
   } catch (error) {
      console.error('An error occurred:', error);
   } finally {
      // Close the browser
      await driver.quit();
   }
})();