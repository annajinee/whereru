import { TrakingAdminPage } from './app.po';

describe('traking-admin App', function() {
  let page: TrakingAdminPage;

  beforeEach(() => {
    page = new TrakingAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
