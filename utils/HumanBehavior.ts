import { Locator, Page } from '@playwright/test';

export class HumanBehavior {
  public minDelay: number;
  public maxDelay: number;
  page: Page;

  constructor(page: Page, minDelay = 3000, maxDelay = 10000) {
    this.page = page;
    this.minDelay = minDelay;
    this.maxDelay = maxDelay;
  }

  async TIMEOUT(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  EXECUTION_TIMEOUT() {
    return Math.floor(Math.random() * (this.maxDelay - this.minDelay + 1)) + this.minDelay;
  }

  async smoothMouseHover(element: Locator) {
    const box = await element.boundingBox();
    if (!box) throw new Error('Element is not visible or null');

    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    await this.page.mouse.move(x, y, { steps: 20 });
  }

  async smoothScrollToElement(element: Locator) {
    const box = await element.boundingBox();
    if (!box) throw new Error('Element is not visible or null');

    const scrollSteps = 15;
    const targetY = box.y;

    for (let i = 0; i < scrollSteps; i++) {
      await this.page.mouse.wheel(0, targetY / scrollSteps);
      await this.TIMEOUT(50);
    }
  }

  async clickElement(element: Locator) {
    await this.TIMEOUT(this.EXECUTION_TIMEOUT());
    await element.click();
  }

  async hoverElement(element: Locator, options = {}) {
    await this.smoothMouseHover(element);
  }

  async imitateTyping(element: Locator, text: string) {
    await element.click();

    for (const char of text) {
      await element.pressSequentially(char, { timeout: this.EXECUTION_TIMEOUT() / text.length });
    }
  }

  async setSelectValue(element: Locator, value: string) {
    await this.smoothScrollToElement(element);
    await this.hoverElement(element);

    await this.TIMEOUT(this.EXECUTION_TIMEOUT());

    await element.focus();

    for (let i = 0; i < 120; i++) {
      const currentValue = await this.getValue(element);
      if (currentValue === value) return;

      await element.press('ArrowDown');
      await this.TIMEOUT(100 + Math.random() * 100);
    }

    await this.clickElement(element);
  }

  async scrollToElement(element: Locator, options = {}) {
    await this.TIMEOUT(this.EXECUTION_TIMEOUT());
    await element.scrollIntoViewIfNeeded(options);
  }

  async getValue(element: Locator) {
    return await element.inputValue();
  }

  async setText(element: Locator, value: string) {
    await this.TIMEOUT(this.EXECUTION_TIMEOUT());
    await element.fill(value);
  }
}
