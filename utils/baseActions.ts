import { Locator } from '@playwright/test';
import { TIMEOUT, EXECUTION_TIMEOUT } from './constants';

export async function clickElement(element: Locator) {
  await TIMEOUT(EXECUTION_TIMEOUT());
  await element.click();
}

export async function hoverElement(element: Locator, options = {}) {
  await TIMEOUT(EXECUTION_TIMEOUT());
  await element.hover(options);
}

export async function imitateTyping(element: Locator, value: string) {
  await TIMEOUT(EXECUTION_TIMEOUT());
  await element.pressSequentially(value, { timeout: 200 });
}

export async function setSelectValue(element: Locator, value: string) {
  await TIMEOUT(EXECUTION_TIMEOUT());
  await element.selectOption(value);
}

export async function scrollToElement(element: Locator, options = {}) {
  await TIMEOUT(EXECUTION_TIMEOUT());
  await element.scrollIntoViewIfNeeded(options);
}

export async function getValue(element: Locator) {
  await TIMEOUT(EXECUTION_TIMEOUT());
  return await element.inputValue();
}

export async function setText(element: Locator, value: string) {
  await TIMEOUT(EXECUTION_TIMEOUT());
  await element.fill(value);
}
