import { newSpecPage } from '@stencil/core/testing';
import { PlayerCard } from '../player-card';

describe('player-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PlayerCard],
      html: `<player-card></player-card>`,
    });
    expect(page.root).toEqualHtml(`
      <player-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </player-card>
    `);
  });
});
