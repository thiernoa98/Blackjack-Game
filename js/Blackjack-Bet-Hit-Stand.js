const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];


kinds.forEach(kind=>{

    suits.forEach(suit=>{

        let name = `${kind} of ${suit}`;
        let file = `${kind}-of-${suit}.png`;

        //Declaring a variable, valu, with an inital value of 0;
        let valu = 0;

        // 6. Set the valu property based on the kind of card
        // - the length of the kind string reveals if it is a face card
        // as only "Jack", "Queen", "King" have more than 3 characters
        if (kind.length == 3) {
            //the card 'Ace' is 3 length
            valu = 11;
        }else if(kind.length >= 4){
            //now display the other kinds longer than 3 
            valu = 10;
        }else{
            //display the numbers now
            valu = kind
        }
        // Review: Each card is an object with 5 properties:
        /* 
            - name: the name of the card: "Jack of Hearts"
            - file: the card file name: "Jack-of-Hearts.png"
            - kind: 2-10, 'Jack', 'Queen', 'King', 'Ace'
            - suit: 'Diamonds', 'Hearts', 'Spades', 'Clubs'
            - valu: numeric value; face card = 10, Ace = 11
        */

        // 7. Declare a card object with the 5properties, the values of which are
        // the 5 corresponding variables 
        const card = {name:name, file:file, kind:kind, suit:suit, valu: valu};
        // 8. Push the card object into the deck array:
        deck.push(card);

    })//end of suit   
})//end of first forEach kind
    //}//close inner suit loop
//} //outer loop ends

// console.log(deck);

// 9A. Review: Shuffle (randomize) the deck:
deck.sort(()=>Math.random() - 0.5); 
console.log('suffled deck', deck);

//9B. fisher-yates shufflee
for (let i = 0; i < deck.length; i++) {
    let temp = deck[i];

    let rand = Math.floor(Math.random() * deck.length)
    deck[i] = deck[rand];
    deck[rand] = temp;    
}

//9C. for each with fisher-yates
deck.forEach((e,i,arr)=>{

    let rand = Math.floor(Math.random() * arr.length)
    arr[i] = arr[rand];
    arr[rand] = e;    
})

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];
console.log(shoe);
// 11. Review: Shuffle (randomize) the shoe:


// 9A. Review: Shuffle (randomize) the deck:
shoe.sort(()=>Math.random() - 0.5);
// console.log('suffled shoe', shoe);

//9B. fisher-yates shufflee
for (let i = 0; i < shoe.length; i++) {
    let temp = shoe[i];

    let rand = Math.floor(Math.random() * shoe.length)
    shoe[i] = shoe[rand];
    shoe[rand] = temp;    
}

//9C. for each with fisher-yates
shoe.forEach((e,i,arr)=>{

    let rand = Math.floor(Math.random() * arr.length)
    arr[i] = arr[rand];
    arr[rand] = e;    
})

// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);

// - Get the HIT and STAND buttons, which won't be assigned listeners yet
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');

// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const promptH2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer hands and 
// that display the player and dealer scores
const dealerCardDiv= document.getElementById('dealer-cards-div');
const playerCardDiv = document.getElementById('player-cards-div');

//scores
const dealerScoreDiv = document.getElementById('dealer-score-div');
const playerScoreDiv = document.getElementById('player-score-div');

// 14. Declare global vars need for keeping track of the deal
// - arrays for holding player and dealer cards 
// variables for keeping score:
// - dealCounter keeps track of total cards dealt
let dealCounter = 0;
let playerHand = [];
let dealerHand = [];
let dealerScore = 0;
let playerScore = 0;

//keep track of player and dealer Ace scores because the ace can changes
let pAceScore = 0;
let dAceScore = 0;


// DEAL
// Now, that we have the shoe, let's deal a hand of Blackjack. We dealt a hand of
// poker in the earlier lesson where we made the shoe of cards, BUT this will be
// different: to better emulate game play, we will use setInterval to deal on a 
// 1-second delay between cards
// the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards
// the dealer's first card is dealt face down -- the "hole card"

// 15. Define the deal function:
function deal() {
    //display the chips after you hit the deal button
    bet();

    promptH2.textContent = 'Good Luck...'
    // 16. Since this is a new hand, reset the scores and "clear the table"
    // - reset the player and dealer scores
    // - empty the divs that display the cards
    // - clear the text from the output h2
    // - empty the arrays that store the player and dealer handsdealCounter = 0;
    dealCounter = 0;
    dealerScore = 0;
    playerScore = 0;
    playerHand = [];
    dealerHand = [];

    dealerCardDiv.innerHTML = '';
    playerCardDiv.innerHTML = '';
    playerScoreDiv.innerHTML = 'Player Score: 0';
    dealerScoreDiv.innerHTML = 'Dealer Score: 0';

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(()=>{
        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter ++;

        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)
        if (dealCounter == 4) {
            //stop after 4 draws
            clearInterval(dealInterval);
        }

        // 20. Instantiate a new image object to hold the card image
        let pic = new Image();

        // 21. Pop a card object off the shoe array and save it as a new card
        let card = shoe.pop();

        // 22. If this is not the 2nd card / 1st dealer card, set the image 
        // source equal to the card image file path:
        if (dealCounter != 2) {
            pic.src = `images/cards350px/${card.file}`;
        // 23. ELSE if this IS the 1st dealer card; deal the "hole card" 
        // face-down by setting its source equal to the back of the card image
        }else{
            pic.src = `images/cards350px/0-Back-of-Card-Red.png`;
        }



       // 24. Set up an if-else statement to handle the logic for dealing two cards 
       // each to player and dealer, starting with the player.
       // Th if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player
        if (dealCounter % 2 == 1) {
 
            // 25. Output the card to the player's div
            playerCardDiv.appendChild(pic);
            // 26. Push the card into the player's hand
            playerHand.push(card);

            // card.kind = 'Ace';

            //if the card is Ace, or if we get two Aces, the score 1Ace =11 + 1 Ace =1
            if (card.kind == 'Ace') {
                //player already has an Ace, so do this
                if (pAceScore == 11) {
                    pAceScore = 12; //if we get another Ace, the second Ace is 1
                    //set the value to 1
                    card.valu = 1;
                }else{
                    pAceScore = 11;
                }

            }

            // 27. Increment the player's score
            playerScore += card.valu;
        // 28. Add the else part to handle dealers dealt to the dealer
        }else{
            // 29. Make the dealer cards a bit smaller, to make them appear farther away
            pic.style.width = '105px';
            pic.style.height = 'auto';

            // 30. Output the card to the dealer's div
            dealerCardDiv.appendChild(pic);

            // 31. Push the card into the dealer's hand
            dealerHand.push(card);

            //if the card is Ace, or if we get two Aces, the score 1Ace =11 + 1 Ace =1
            if (card.kind == 'Ace') {
                //player already has an Ace, so do this
                if (dAceScore == 11) {
                    dAceScore = 12; //if we get another Ace, the second Ace is 1
                    //set the value to 1
                    card.valu = 1;
                }else{
                    dAceScore = 11;
                }

            }
            // 32. Update the dealer's score
            dealerScore += card.valu;
            // playerScore = 21;
            // dealerScore = 21
        }
        // 33. Update "Dealer Show"s" once the deal ends--this is not
        // the dealer's score, just the value of the ONE card that IS showing
        // this value equals the dealer's score minus the value of the the hole card

        //showing the dealere's hidden card after the draw is over, after 4 draws/cards
        if (dealCounter == 4) {
           
            // dealerScoreDiv.innerHTML = 'dealer Shows '+ dealerHand[0].valu;
            dealerScoreDiv.innerHTML = 'dealer Shows '+ dealerHand[1].kind;
            playerScoreDiv.innerHTML = 'player Shows '+ playerScore;
            // 34. Log the dealer's hidden hand and secret score to the console
            console.log('dealer score: ', dealerScore, 'player score: ', playerScore);
            // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again
            setTimeout(()=>{
                //if both has a 21

                if (playerScore == 21 && dealerScore == 21) {

                    promptH2.textContent = 'Both have black Jack! Its a push'
                    holeCard = document.getElementById('dealer-cards-div').children[0]
                    holeCard.src = `images/cards350px/${dealerHand[0].file}`;

                // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
                // do the prompt on a 2-second delay with setTimeout

                }else if(playerScore == 21){
                    promptH2.textContent = 'BlackJack!!! You win!'
                    //update the player bet money
                    playerMoney+=betAmount * 1.5 //if blackjack, you win more
                    moneySpan.textContent = '$' + playerMoney;

                }else if(dealerScore == 21){
                    promptH2.textContent = 'BlackJack!!! Dealer won!', 1500;

                    //update the player bet money with less money
                    playerMoney-=betAmount
                    moneySpan.textContent = '$' + playerMoney;

                    //show the hidden card if dealer hit black jack
                    //children [0] get the first element of the div, first ppic here
                    let holeCard = document.getElementById('dealer-cards-div').children[0] 
                    holeCard.src = `images/cards350px/${dealerHand[0].file}`;
                }else{
                    //none has a blackjack

                    // 36. Mute the color of the DEAL button so that it looks unclickable
                    //disabled-btn is from the css which turn off the button
                    dealBtn.classList.add('disabled-btn') //disabled-btn is from the css 

                    //36B make the deal button unclickable by setting disabled to true
                    dealBtn.disabled = true;

                    // 37. remove the disabled HIT and STAND buttons 
                    //so they appear clickable, disabled-btn disbale the buttons
                    hitBtn.classList.remove('disabled-btn'); // remove the css
                    standBtn.classList.remove('disabled-btn'); //remove the css

                    //37B make the deal button unclickable by setting disabled to false
                    //because now we can click it
                    hitBtn.disabled = false;
                    standBtn.disabled = false;

                    //none has 21, no blackjack
                    //show the below text if none has 21
                     promptH2.textContent = 'Hit or Stand? '
                }
            },1500) //end of setTimeout


            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
    
        }//40. Set the setInterval timer for the card dealing to repeat every 1 second:

    },1000)//end of setInterval(); //1000 is 1 sec
}//function ends

//the hit button
hitBtn.addEventListener('click', hit)

function hit() {

    setTimeout(()=>{
        //getting the shuffled cards
        const card = shoe.pop(); //get the last card
        //set a new image
        const pic = new Image();
        pic.src = `images/cards350px/${card.file}`;
        //add the new photo
        playerCardDiv.appendChild(pic);

        if (card.kind == 'Ace') {
            //check if player score is less than 11
            //if so, increament polayer score by 11
            //also increment increase the playerAceScore by 11
            if (playerScore < 11) {
                playerScore +=11 // if player score is less 11, then Ace is counted 11
                pAceScore = 11;
            }else{
                //else the player score is already 11, just add one by increment
                playerScore ++; 
                pAceScore ++;
            }
        }else{
            //if its not an Ace just add its value to the player score
            playerScore += card.valu; 
            //check if hit card has busted > 21
            if (playerScore > 21) {
                
                //if player score is over 21 but has an ace, 'unbust it
                if (pAceScore >= 11) {
                    //reduce the score
                    pAceScore -=10;
                    playerScore -=10;
                }else{
                    //the player does not have an Ace 11, so busted
                    promptH2.textContent = 'Busted! You Lose!';

                    //update the player bet money
                    playerMoney-=betAmount
                    moneySpan.textContent = '$' + playerMoney;

                    //enable the deal button
                    dealBtn.disabled = false;
                    dealBtn.classList.add('enabled-btn');
                }
            }else if (playerScore == 21) {
                //if you hit 21, then you're done and its dealers turn
                promptH2.textContent = 'you have 21! Dealer turn!';

                //after you hit and get 21, automatically do the stand
                stand(); 
            }else{
                promptH2.textContent = 'Hit or Stand...?';
            }
            
        
        }
        //display the updated score
        playerScoreDiv.textContent = `player shows ${playerScore}`;
    }, 1500)
}//end of hit function


// 41. Run the file in the browser and click DEAL, being sure to check the 
// console for the shuffled deck, shuffled shoe and dealer hand / score
standBtn.addEventListener('click', stand)

function stand() {
    dealBtn.disabled = true;
    hitBtn.classList.remove('enabled-btn');
    standBtn.classList.remove('enabled-btn');
    hitBtn.classList.add('disabled-btn');
    standBtn.classList.add('disabled-btn');

    setTimeout(()=>{
        promptH2.textContent = "Stand! Dealer's turn...";

        //show the hidden card when it's dealer's turn/stand
        // holeCard = document.getElementById('dealer-cards-div').children[0]
        // holeCard.src = `images/cards350px/${dealerHand[0].file}`;
        dealerCardDiv.children[0].src = `images/cards350px/${dealerHand[0].file}`;

        //show dealer score
        dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`

    },1000);

   
    setTimeout(()=>{

        //if dealer has a soft 17 or score 17
        if (dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)) {
            //dAceScore >= 11 the Ace card
            // dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;

            //adding dealer's new image
            let pic = new Image();
            let card = shoe.pop();
            pic.src = `images/cards350px/${card.file}`;
            dealerCardDiv.appendChild(pic);
            dealerHand.push(card);

            //check if card is an 'ACe'
            if (card.kind == 'Ace') {
                //does the Ace card count as 11 or 1 ? 11 if dealerScore is less than 11
                if (dealerScore < 11) {
                    //Ace count as 11 here since score is less 
                    dealerScore+=11;
                    dAceScore+=11;
                } else{
                    //more than 11? Ace is 1
                    dealerScore ++; // just increment, it'll keep on adding ones only
                    dAceScore++;
                }

                if (dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)) {
                    promptH2.textContent = `Ace! Dealer get another Card...`;

                    //calling the function to expection itself
                    stand(); //draw anothr card automatically, recursive func
                }else{
                    promptH2.textContent = `Dealer Stand`;

                    //dealer get a hard 17, anounce winner
                    anounceWinner();
                }

                dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;

            }else{
                //not an  ace just add the card valu to the score
                dealerScore += card.valu;

                //check if dealer past 21, busted, unbust if there's an Ace
                if (dealerScore > 21) {
                    
                    //checking if the Ace card busted the dealer, then minus 10 to that
                    if (dAceScore >= 11) {
                        dAceScore-= 10;
                        dealerScore-=10

                        dealerScoreDiv.textContent = `Dealer Draw: ${dealerScore}`;

                        //after unbusting, give the dealer another card? check
                        if (dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)) {
                            //call the function
                            stand();
                        }

                    }else{
                        //no Ace card
                        dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;
                        promptH2.textContent = `Dealer Busted at ${dealerScore}! You Win!`;

                        //update the player bet money
                        playerMoney+=betAmount
                        moneySpan.textContent = '$' + playerMoney;

                        //enable the deal button
                        dealBtn.disabled = false;
                        dealBtn.classList.add('enabled-btn');
                    }
                    //does dealer get another card?
                }else if(dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)){
                    dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;
                    stand();
                }else{
                    //dealer don't get another card
                    dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;

                    if (dealerScore == 21) {
                        promptH2.textContent = `Dealer got: ${dealerScore}..`;
                    }else{
                        promptH2.textContent = `Dealer stands on ${dealerScore}`
                    }
                    //declearwinner, because can't get another card
                    anounceWinner();
                }
            }
        }else{
            //if dealer doesn't have a soft 17 or...
            dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;

            //dealer got a hard 17, hence declare winner
            anounceWinner();
        }

    }, 2000)

} //end of stand function

//anounceWinner
function anounceWinner() {
    //determine the winner after dealer past get a hard 17 or past that

    setTimeout(()=>{
        if (playerScore > dealerScore) {
            promptH2.textContent = 'Congratulations! You Win!'
            playerMoney+=betAmount
            moneySpan.textContent = '$' + playerMoney;
        }else if(playerScore < dealerScore && dealerScore < 22){
            //if dealer Score less than 22 and more than player, dealer win
            promptH2.textContent = `Dealer Win with ${dealerScore}, You Lose!`
            playerMoney-=betAmount;
            moneySpan.textContent = '$' + playerMoney;
        }else{
            //it's a tie or a push while dealer score is < 22
            dealerScore < 22 ? promptH2.textContent =  'It\'s a PUSH..!' :'';
        }

        //turn on the Deal button and off the hit and stand btns
        dealBtn.disabled = false;
        dealBtn.classList.add('enabled-btn');

        hitBtn.classList.remove('enabled-btn');
        standBtn.classList.remove('enabled-btn');
        hitBtn.classList.add('disabled-btn');
        standBtn.classList.add('disabled-btn');

        hitBtn.disabled = true;
        standBtn.disabled = true;

        setTimeout(()=>{
            moneySpan.textContent = '$' + playerMoney;
            chipsDiv.innerHTML = '';
        }, 1500)
    }, 2000);
}


//bet() funtion
let playerMoney = 500;
let betAmount = 0;
// get the betMenu, players money...
let moneySpan = document.getElementById('money');
let betMenu = document.getElementById('bet-menu');
let chipsDiv = document.getElementById("chips-bet-div");
betMenu.addEventListener('change', bet);
//assing the postion of the chips
let chipLeftPos = 0;

function bet() {
    chipsDiv.innerHTML = ''; //clear the chip every time
    chipLeftPos = 0; //
    betAmount = Number(betMenu.value); //the values from the options value in html

    //get the data-cips from the html options data-chips="50"...
    let index = betMenu.selectedIndex; // give out 11
    let option = betMenu.options[index];
    let chipNums = option.dataset.chips; //'50&25'

    //make array out of the chips
    let chipNumsArr = chipNums.split('&');
    console.log('will it work? ', betAmount, chipNums, chipNumsArr);

    //loop through the chips
    // chipNumsArr.forEach(num=>{

    let chipInterval = setInterval(()=>{
        //remove the item in the array till it's done
        let chipNum = chipNumsArr.shift();

        let pic = new Image();
        pic.src = `images/chips/chip-${chipNum}.png`;
        pic.className = 'chipper';
        chipsDiv.appendChild(pic);
        chipLeftPos +=60; //the posion between the coins/chips
        pic.style.left = chipLeftPos + 'px';

        //
        if (!chipNumsArr.length) {
            clearInterval(chipInterval);
        }   
    },400)
    // })
}

//just display the bet() function to get the first/index bet amount
bet();

