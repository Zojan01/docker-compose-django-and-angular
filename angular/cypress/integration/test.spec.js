

describe('My App', () => {
  it('loads', () => {
    cy.visit('/');
    cy.get('a').contains('Products Word');
  });
});


describe('Menu', () => {
  it('The menu is have two sub menus to add and to see products',() => {
    cy.visit('/');
    cy.get('a').contains('Products Word');
    cy.get('a').contains('Novel');
    cy.get('a').contains('House');
    cy.get('a').contains('Novels');
    cy.get('a').contains('Houses');
  });

  describe('Hover Menu Sub-Menus',()=>{


    it('can click on "Add Products sub-menu Novel"  and send you to add-edit-novel-component',()=>{
        cy.get('ul li a').contains('Add Products').next('ul').then(element=>{
            cy.wrap(element).invoke('show');
            cy.wrap(element).contains('Novel').click();
                cy.url().should('include', '/product/novel');

        });
    });


    it('can click on "Add Products sub-menu House"  and send you to add-edit-house-component',()=>{
      cy.get('ul li a').contains('Add Products').next('ul').then(element=>{
          cy.wrap(element).invoke('show');
          cy.wrap(element).contains('House').click();
              cy.url().should('include', '/product/house');

      });
    });

    it('can click on "Products sub-menu Houses" and send you to product-container-component house',()=>{
      cy.get('ul li a').contains('List Products').next('ul').then(element=>{
          cy.wrap(element).invoke('show');
          cy.wrap(element).contains('Houses').click();
              cy.url().should('include', '/products/house');

      });
    });

    it('can click on "Products sub-menu Novels" and send you to product-container-component novel',()=>{
      cy.get('ul li a').contains('List Products').next('ul').then(element=>{
          cy.wrap(element).invoke('show');
          cy.wrap(element).contains('Novels').click();
              cy.url().should('include', '/products/novel');

      });
    });


  });

});


describe('Product-Container', () => {
  it('It have product-box',() => {
    cy.intercept('/products/*').as('getProducts');
    cy.visit('/products/house');
    cy.wait('@getProducts');

  });
});



describe('Add-Edit-House-Componet',()=> {

  it('Without having saved a product house there should no be a puppop', ()=>{
    cy.get('mat-dialog-container').should('not.exist');
  });

  it('Should save product house', ()=> {
    cy
      .visit('#/product/house')

      .get('form input[id="nameInput"]').clear().type('House test only for you')
      .get('form input[id="priceInput"]').clear().type(90000)
      .get('form input[id="amountRoonInput"]').clear().type(2)
      .get('form textarea[id="locationInput"]').clear().type('Next to white the house')
      .get('form textarea[id="summaryInput"]').clear().type('Is a good house')
      .get('form textarea[id="pathPosterInput"]').clear().type('https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2020/10/p-1-90559633-the-trumpsand8217-separate-bedrooms-could-increase-white-house-covid-19-risk.jpg')
      .get('form textarea[id="conditionInput"]').clear().type('is used , just  a little')

      .get('button').contains('Save').click()
      .get('mat-dialog-container').should('exist');
  });

  it('Having saved a product house there should a puppop', ()=>{
    cy.get('mat-dialog-container').should('exist');
  });


  it('Inside puppop "Go To Products" button should send you to products house', ()=>{
    cy
      .get('mat-dialog-container').should('exist')
      .get('mat-dialog-container button').contains('Go To Products').click()
      .url().should('include', '/products/house');
  });

});


describe('Add-Edit-Novel-Component', ()=>{

  it('Without having saved a product novel there should no be a puppop', ()=>{
    cy.get('mat-dialog-container').should('not.exist');
  });

  it('Should save product novel', ()=> {
    cy
      .visit('#/product/novel')

      .get('form input[id="nameInput"]').clear().type('Dark Side')
      .get('form input[id="priceInput"]').clear().type(1500)
      .get('form input[id="ageLimitInput"]').clear().type(25)
      .get('form input[id="authorInput"]').clear().type('Pedro Dilton')
      .get('form textarea[id="summaryInput"]').clear().type('Talk about the dark side of the universe')
      .get('form textarea[id="pathPosterInput"]').clear().type('https://s3.amazonaws.com/media.eremedia.com/wp-content/uploads/sites/4/2020/10/11164554/bigstock-Dark-man-portrait-with-scary-e-377735380-700x467.jpg')

      .get('button').contains('Save').click()
      .get('mat-dialog-container').should('exist');
  });

  it('Having saved a novel house there should a puppop', ()=>{
    cy.get('mat-dialog-container').should('exist');
  });


  it('Inside puppop "Go To Novels" button should send you to products novels', ()=>{
    cy
      .get('mat-dialog-container').should('exist')
      .get('mat-dialog-container button').contains('Go To Products').click()
      .url().should('include', '/products/novel');
  });


});

