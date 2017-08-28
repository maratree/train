import { Train2Page } from './app.po';

describe('train2 App', () => {
  let page: Train2Page;

  beforeEach(() => {
    page = new Train2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
