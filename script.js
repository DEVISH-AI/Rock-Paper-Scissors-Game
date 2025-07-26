let scoreStr = localStorage.getItem('Score');
let score;
        resetScore(scoreStr);
        function resetScore(scoreStr){
           score = scoreStr ? JSON.parse(scoreStr) : {
           win: 0,
           lost: 0,
           tie: 0,  
           
        };
        score.displayScore =  function(){
            return `🎉 Won: ${score.win} | 🤡 Lost: ${score.lost} | 🤝 Tie: ${score.tie} `;
        

           };

           showResult();

        // clearTimeout(thinkingTimeout);
        // clearTimeout(resultTimeout);
        document.getElementById("thinking-message").style.display = "none";
        document.getElementById("loader").style.display = "none";
        document.getElementById("result").innerText = "";


        };
        
         function generateComputerChoice() {
        // this will generat random number between 0 and 3
        let randomNumber = Math.random() * 3;
        // Logical Operators ||, &&, !
        if (randomNumber > 0 && randomNumber <= 1) {
           return 'Rock';
        } else if (randomNumber > 1 && randomNumber <= 2) {
           return 'Paper';

        } else {
            return 'Scissors'
        }
        }


        function getResult(userMove, computerMove) {
             if (userMove === "Rock") {
                if (computerMove === 'Scissors') {
                    score.win++;
                return '🏆 User won';
                } else if (computerMove === 'Rock') {
                   score.tie++;
                return `🤝🏻 It's a tie`;
                } else if (computerMove === 'Paper') {
                    score.lost++;
                return '💀 Computer has won';
                }

                } else if (userMove === "Paper") {
                    if (computerMove === 'Paper') {
                    score.tie++;
                return `🤝🏻 It's a tie`;
                } else if (computerMove === 'Scissors') {
                    score.lost++;
                return '💀 Computer has won';
                } else if (computerMove === 'Rock') {
                    score.win++;
                return '🏆 User won';

                }
            } else {
                if (computerMove === 'Rock') {
                    score.lost++;
                return '💀 Computer has won';
                } else if (computerMove === 'Paper') {
                    score.win++;
                return '🏆 User won';
                } else if (computerMove === 'Scissors') {
                    score.tie++;
                return `🤝🏻 It's a tie`;
                }
            }
        }

function getChoiceEmoji(choice) {
            const emojis = {
                'Rock': '✊🏻',
                'Paper': ' 🖐🏻',
                'Scissors': '✌🏻'
            };
            return emojis[choice] || choice;
        }


 function showResult (userMove, computerMove) {
            localStorage.setItem('Score', JSON.stringify(score));
            document.querySelector('#user-move').innerText = 
            userMove !== undefined ? `You have chosen: ${getChoiceEmoji(userMove)} ${userMove}` : '';

            // show thinking message and loader
            document.getElementById("thinking-message").style.display = "inline-flex";
            document.getElementById("loader").style.display = "inline-flex";

            // hide computer choice for now
            document.getElementById("computer-move").textContent = "";

            // wait 2 seconds
          setTimeout(() => {
            // hide thinking message and loader
            document.getElementById("thinking-message").style.display = "none";
            document.getElementById("loader").style.display = "none";

            // now reveal computer's choice
            document.querySelector('#computer-move').innerText = computerMove !== undefined ?`Computer choice is: ${getChoiceEmoji(computerMove)} ${computerMove}` :'';

            
         setTimeout(() => {
    const result = getResult(userMove, computerMove); // "win", "lose", "tie"
    
    let resultClass = "";

    if (result === "🏆 User won") {
      resultClass = "green";
    } else if (result === "💀 Computer has won") {
      resultClass = "red";
    } else {
      resultClass = "yellow";
    }

    document.querySelector('#result').innerText = result !== undefined ? result :'';
    document.querySelector('#result').classList.remove("green", "red", "yellow");
    document.querySelector('#result').classList.add("result-message", resultClass);

  }, 1000); // ⏱️ Show result 1 second later

            // continue with result logic...
}, 2000);

    document.querySelector('#score').innerText = score.displayScore();

        };

function showResetModal() {
            document.getElementById('resetModal').style.display = 'block';
        }

        function hideResetModal() {
            document.getElementById('resetModal').style.display = 'none';
        }

        function confirmReset() {
            localStorage.clear();
            resetScore();
setTimeout(() => {
                document.querySelector('#user-move').innerText = '';
                document.querySelector('#computer-move').innerText = '';
                document.querySelector('#result').innerText = '';
            }, 300);
            
            hideResetModal();
        }

// Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('resetModal');
            if (event.target === modal) {
                hideResetModal();
            }
        }        