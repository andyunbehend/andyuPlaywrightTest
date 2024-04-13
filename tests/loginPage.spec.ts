import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await expect(page).toHaveTitle(/The Internet/);
});

test('Login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByLabel('Password').press('Enter');
    await expect(page.getByText('You logged into a secure area')).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();
  });

  test('Invalid Username', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('burrito');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('superSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });  

  test('Invalid Password', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('div').filter({ hasText: 'Username' }).nth(4).click();
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('Burrito1982');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your password is invalid!')).toBeVisible();
    
  });
