import { LtaAppPage } from './app.po';

describe('lta-app App', () => {
  let page: LtaAppPage;

  beforeEach(() => {
    page = new LtaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
