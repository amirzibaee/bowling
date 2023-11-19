describe('Bowling score calculator', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('successfully loads', () => {
    cy.visit('/');
    cy.wait(2000);
  });

  it('Enter player name', () => {
    cy.get('.goto-box > .goto-text input').type('Amir Zibaee')
    cy.get('.goto-box > .goto-text > .btn').click()
    cy.wait(2000);
  });

  it('Start game - Test 1 - random', () => {
    // frame 1
    cy.get('.pin-buttons ul li button').contains('2').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 2
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('3').click()
    // frame 3
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 4
    cy.get('.pin-buttons ul li button').contains('6').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 5
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 6
    cy.get('.pin-buttons ul li button').contains('8').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 7
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 8
    cy.get('.pin-buttons ul li button').contains('8').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 9
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 10
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.score-box__board__result .score').should('have.text', 'Score: 164')
    cy.wait(2000);
  });


  it('Start game - Test 2 - random', () => {
    cy.visit('/BowlingScore');
    // frame 1
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 2
    cy.get('.pin-buttons ul li button').contains('5').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 3
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 4
    cy.get('.pin-buttons ul li button').contains('3').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 5
    cy.get('.pin-buttons ul li button').contains('4').click()
    cy.get('.pin-buttons ul li button').contains('4').click()
    // frame 6
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('3').click()
    // frame 7
    cy.get('.pin-buttons ul li button').contains('3').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 8
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 9
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 10
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.pin-buttons ul li button').contains('6').click()
    cy.get('.pin-buttons ul li button').contains('4').click()
    cy.get('.score-box__board__result .score').should('have.text', 'Score: 140')
    cy.wait(2000);
  });

  it('Start game - Test 3 - random', () => {
    cy.visit('/BowlingScore');
    // frame 1
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 2
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 3
    cy.get('.pin-buttons ul li button').contains('5').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 4
    cy.get('.pin-buttons ul li button').contains('4').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 5
    cy.get('.pin-buttons ul li button').contains('4').click()
    cy.get('.pin-buttons ul li button').contains('6').click()
    // frame 6
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 7
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 8
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 9
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 10
    cy.get('.pin-buttons ul li button').contains('8').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.score-box__board__result .score').should('have.text', 'Score: 168')
    cy.wait(2000);
  });


  it('Start game - Test 4 - random', () => {

    cy.visit('/BowlingScore');
    // frame 1
    cy.get('.pin-buttons ul li button').contains('2').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 2
    cy.get('.pin-buttons ul li button').contains('4').click()
    cy.get('.pin-buttons ul li button').contains('3').click()
    // frame 3
    cy.get('.pin-buttons ul li button').contains('6').click()
    cy.get('.pin-buttons ul li button').contains('3').click()
    // frame 4
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 5
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 6
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 7
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 8
    cy.get('.pin-buttons ul li button').contains('6').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 9
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('3').click()
    // frame 10
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    cy.get('.score-box__board__result .score').should('have.text', 'Score: 153')
    cy.wait(2000);
  });


  it('Start game - Test 5 - random', () => {
    cy.visit('/BowlingScore');
    // frame 1
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 2
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 3
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('9').click()
    // frame 4
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 5
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 6
    cy.get('.pin-buttons ul li button').contains('4').click()
    cy.get('.pin-buttons ul li button').contains('4').click()
    // frame 7
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    // frame 8
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 9
    cy.get('.pin-buttons ul li button').contains('7').click()
    cy.get('.pin-buttons ul li button').contains('2').click()
    // frame 10
    cy.get('.pin-buttons ul li button').contains('9').click()
    cy.get('.pin-buttons ul li button').contains('1').click()
    cy.get('.score-box__board__result .score').should('have.text', 'Score: 83')
    cy.wait(2000);
  });



  it('Start game - Test 6 - all 0 score', () => {
    cy.visit('/BowlingScore');
    // frame 1
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 2
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 3
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 4
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 5
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 6
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 7
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 8
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 9
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    // frame 10
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('.pin-buttons ul li button').contains('0').click()
    cy.get('div.score-box__board__result .score').should('have.text', 'Score: 0')
    cy.wait(2000);
  });

  it('Start game - Test 7 - all 10 score', () => {
    cy.visit('/BowlingScore');
    // frame 1
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 2
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 3
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 4
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 5
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 6
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 7
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 8
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 9
    cy.get('.pin-buttons ul li button').contains('10').click()
    // frame 10
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.pin-buttons ul li button').contains('10').click()
    cy.get('.score-box__board__result .score').should('have.text', 'Score: 300')
    cy.wait(2000);
  });


});
