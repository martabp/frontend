import { newE2EPage } from '@stencil/core/testing';

describe('player-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<player-card></player-card>');

    const element = await page.find('player-card');
    expect(element).toHaveClass('hydrated');
  });
});
