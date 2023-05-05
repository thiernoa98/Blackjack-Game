const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];


kinds.forEach(kind=>{

    suits.forEach(suit=>{

        let name = `${kind} of ${suit}`;
        let file = `${kind}-of-${suit}.png`;

        let valu = 0;

        // Setting the value property based on the kind of card
        // - the length of the kind string reveals if it is a face card
        // as only "Jack", "Queen", "King" have more than 3 characters
        if (kind.length == 3) {
            valu = 11;
        }else if(kind.length >= 4){
            //display the other kinds longer than 3 
            valu = 10;
        }else{
            //display the numbers 
            valu = kind
        }


        const card = {name:name, file:file, kind:kind, suit:suit, valu: valu};
        deck.push(card);

    })//end of suit   
})//end of first forEach kind




// Shuffle (randomize) the deck:
deck.sort(()=>Math.random() - 0.5); 

// fisher-yates shufflee
for (let i = 0; i < deck.length; i++) {
    let temp = deck[i];

    let rand = Math.floor(Math.random() * deck.length)
    deck[i] = deck[rand];
    deck[rand] = temp;    
}

deck.forEach((e,i,arr)=>{

    let rand = Math.floor(Math.random() * arr.length)
    arr[i] = arr[rand];
    arr[rand] = e;    
})

const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];

// Shuffling the shoe of cards
shoe.sort(()=>Math.random() - 0.5);

//fisher-yates shufflee
for (let i = 0; i < shoe.length; i++) {
    let temp = shoe[i];

    let rand = Math.floor(Math.random() * shoe.length)
    shoe[i] = shoe[rand];
    shoe[rand] = temp;    
}

shoe.forEach((e,i,arr)=>{

    let rand = Math.floor(Math.random() * arr.length)
    arr[i] = arr[rand];
    arr[rand] = e;    
})

//The DOM elements:
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);

const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');

const promptH2 = document.querySelector('h2');

const dealerCardDiv= document.getElementById('dealer-cards-div');
const playerCardDiv = document.getElementById('player-cards-div');

const dealerScoreDiv = document.getElementById('dealer-score-div');
const playerScoreDiv = document.getElementById('player-score-div');

// Declaring global vars to keeping track of the deal
let dealCounter = 0;
let playerHand = [];
let dealerHand = [];
let dealerScore = 0;
let playerScore = 0;

//keep track of player and dealer Ace scores because the ace can changes
let pAceScore = 0;
let dAceScore = 0;


function deal() {
    bet();

    promptH2.textContent = 'Good Luck...'
    dealCounter = 0;
    dealerScore = 0;
    playerScore = 0;
    playerHand = [];
    dealerHand = [];

    dealerCardDiv.innerHTML = '';
    playerCardDiv.innerHTML = '';
    playerScoreDiv.innerHTML = 'Player Score: 0';
    dealerScoreDiv.innerHTML = 'Dealer Score: 0';

    let dealInterval = setInterval(()=>{
        // Increment the counter that keeps track of how many card have been dealt
        dealCounter ++;

        if (dealCounter == 4) {
            //stop after 4 draws
            clearInterval(dealInterval);
        }

        let pic = new Image();

        //Pop a card object off the shoe array and save it as a new card
        let card = shoe.pop();

        if (dealCounter != 2) {
            pic.src = `images/cards350px/${card.file}`;
            
        }else{
            //display red card
            pic.src = `images/cards350px/0-Back-of-Card-Red.png`;
        }



        if (dealCounter % 2 == 1) {
            
            playerCardDiv.appendChild(pic);
            playerHand.push(card);

            if (card.kind == 'Ace') {
                if (pAceScore == 11) {
                    pAceScore = 12; 
                    card.valu = 1;
                }else{
                    pAceScore = 11;
                }

            }
            playerScore += card.valu;
        }else{
            pic.style.width = '105px';
            pic.style.height = 'auto';
            
            dealerCardDiv.appendChild(pic);
            dealerHand.push(card);
            
            if (card.kind == 'Ace') {
                if (dAceScore == 11) {
                    dAceScore = 12; 
                    card.valu = 1;
                }else{
                    dAceScore = 11;
                }

            }
            // Update the dealer's score
            dealerScore += card.valu;
        }

        if (dealCounter == 4) {
           
            dealerScoreDiv.innerHTML = 'dealer Shows '+ dealerHand[1].kind;
            playerScoreDiv.innerHTML = 'player Shows '+ playerScore;

            setTimeout(()=>{
                if (playerScore == 21 && dealerScore == 21) {

                    promptH2.textContent = 'Both have black Jack! Its a push'
                    holeCard = document.getElementById('dealer-cards-div').children[0]
                    holeCard.src = `images/cards350px/${dealerHand[0].file}`;

                }else if(playerScore == 21){
                    promptH2.textContent = 'BlackJack!!! You win!'
                    //update the player bet money
                    playerMoney+=betAmount * 1.5 
                    moneySpan.textContent = '$' + playerMoney;

                }else if(dealerScore == 21){
                    promptH2.textContent = 'BlackJack!!! Dealer won!', 1500;
                    
                    playerMoney-=betAmount
                    moneySpan.textContent = '$' + playerMoney;

                    let holeCard = document.getElementById('dealer-cards-div').children[0] 
                    holeCard.src = `images/cards350px/${dealerHand[0].file}`;
                }else{
                    //none has a blackjack
                    dealBtn.classList.add('disabled-btn') 
                    
                    dealBtn.disabled = true;
                    
                    hitBtn.classList.remove('disabled-btn');
                    standBtn.classList.remove('disabled-btn'); 

                    hitBtn.disabled = false;
                    standBtn.disabled = false;

                   promptH2.textContent = 'Hit or Stand? '
                }
            },1500) 

    
        }

    },1000)
}


hitBtn.addEventListener('click', hit)

function hit() {

    setTimeout(()=>{
        //get the shuffled cards
        const card = shoe.pop(); 
        
        const pic = new Image();
        pic.src = `images/cards350px/${card.file}`;

        playerCardDiv.appendChild(pic);

        if (card.kind == 'Ace') {

            if (playerScore < 11) {
                playerScore +=11 
                pAceScore = 11;
            }else{
                playerScore ++; 
                pAceScore ++;
            }
        }else{
            playerScore += card.valu; 
            if (playerScore > 21) {
                
                if (pAceScore >= 11) {
                    pAceScore -=10;
                    playerScore -=10;
                }else{
                    promptH2.textContent = 'Busted! You Lose!';

                    playerMoney-=betAmount
                    moneySpan.textContent = '$' + playerMoney;

                    dealBtn.disabled = false;
                    dealBtn.classList.add('enabled-btn');
                }
            }else if (playerScore == 21) {
                promptH2.textContent = 'you have 21! Dealer turn!';

                stand(); 
            }else{
                promptH2.textContent = 'Hit or Stand...?';
            }
            
        
        }
        playerScoreDiv.textContent = `player shows ${playerScore}`;
    }, 1500)
}


standBtn.addEventListener('click', stand)

function stand() {
    dealBtn.disabled = true;
    hitBtn.classList.remove('enabled-btn');
    standBtn.classList.remove('enabled-btn');
    hitBtn.classList.add('disabled-btn');
    standBtn.classList.add('disabled-btn');

    setTimeout(()=>{
        promptH2.textContent = "Stand! Dealer's turn...";
        dealerCardDiv.children[0].src = `images/cards350px/${dealerHand[0].file}`;
        dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`

    },1000);

   
    setTimeout(()=>{

        if (dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)) {

            let pic = new Image();
            let card = shoe.pop();
            pic.src = `images/cards350px/${card.file}`;
            dealerCardDiv.appendChild(pic);
            dealerHand.push(card);
            
            if (card.kind == 'Ace') {
                if (dealerScore < 11) {
                    dealerScore+=11;
                    dAceScore+=11;
                } else{
                    dealerScore ++; 
                    dAceScore++;
                }
                if (dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)) {
                    promptH2.textContent = `Ace! Dealer get another Card...`;
                    
                    stand();
                }else{
                    promptH2.textContent = `Dealer Stand`;
                    anounceWinner();
                }

                dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;

            }else{
                dealerScore += card.valu;
                if (dealerScore > 21) {
                   
                    if (dAceScore >= 11) {
                        dAceScore-= 10;
                        dealerScore-=10

                        dealerScoreDiv.textContent = `Dealer Draw: ${dealerScore}`;

                        if (dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)) {
                            stand();
                        }

                    }else{
                        dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;
                        promptH2.textContent = `Dealer Busted at ${dealerScore}! You Win!`;

                        playerMoney+=betAmount
                        moneySpan.textContent = '$' + playerMoney;

                        dealBtn.disabled = false;
                        dealBtn.classList.add('enabled-btn');
                    }
                }else if(dealerScore < 17 || (dealerScore == 17 && dAceScore >= 11)){
                    dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;
                    stand();
                }else{
                    dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;

                    if (dealerScore == 21) {
                        promptH2.textContent = `Dealer got: ${dealerScore}..`;
                    }else{
                        promptH2.textContent = `Dealer stands on ${dealerScore}`
                    }
                    anounceWinner();
                }
            }
        }else{
            dealerScoreDiv.textContent = `Dealer Score: ${dealerScore}`;
            anounceWinner();
        }

    }, 2000)

} 

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
            dealerScore < 22 ? promptH2.textContent =  'It\'s a PUSH..!' :'';
        }

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

