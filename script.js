            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = 1000;
            canvas.height = 500;
            
        //Wielkość stołu
            const cw = canvas.width;
            const ch = canvas.height;
        
        //Piłka (wielkość, polożenie)
            const ballsize = 10;
            let ballX =cw/2 - ballsize/2;
            let ballY =ch/2 - ballsize/2;
        
        //Paletki
            const paddleHeight = 100;
            const paddleWidth = 20;

            const playerX = 70;
            const aiX= 910;
                    
            let playerY = 200;
            let aiY = 200;
            

            const lineWidth = 6;
            const lineHeigth = 16;

            let ballSpeedX = 5; 
            let ballSpeedY = 5;

        // gracz 1       
        function player () {

            ctx.fillStyle = 'red';
            ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);    
        }
        
        //gracz komputer
        function ai () {

            ctx.fillStyle = 'blue';
            ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
        }

        // Odbicie
        function hitBall() {
                if (ballX <= playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                    }
                    
                if (ballX >= aiX - paddleWidth && ballY >= aiY && ballY <= aiY + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                    }
            }  

        //Piłka 

        function drawBall () {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballsize, 0, 2 * Math.PI);
            ctx.fill();
        }

        function moveBall() {
            drawBall();
            ballX += - ballSpeedX;
            ballY += ballSpeedY;
            if (ballY <= 0 || ballY + ballsize >= ch)
                {
                    ballSpeedY = -ballSpeedY;
                    speedUp();
                }   
            if (ballX <=0 || ballX + ballsize >= cw)
                {
                    ballSpeedX = -ballSpeedX;
                }
        }

        function ball(){
            moveBall();
            hitBall();
        }    


        // boisko
        function table () {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, cw, ch);
            
            // linia środkowa
           for (let linePosition = 20; linePosition < ch; linePosition += 30) {
                ctx.fillStyle = 'gray';
                ctx.fillRect (cw/2 - lineWidth/2, linePosition, lineWidth, lineHeigth);
           }
            
        } 
        topCanvas = canvas.offsetTop;
        console.log(topCanvas)
        
        function playerPosition(e){
            playerY=e.clientY - topCanvas - paddleHeight/2; 

            if (playerY >= ch - paddleHeight) { 
                playerY = ch - paddleHeight
            }   
            
            if (playerY <= 0) {
                playerY = 0;
            } 
        
        }

        function speedUp () {
            console.log("przyspieszam")
            //Prędkość X
            if (ballSpeedX > 0 && ballSpeedX < 16) {
                ballSpeedX += 0.2;
            }
            else if (ballSpeedX < 0 && ballSpeedX > -16) {
                ballSpeedX -= 0.2;
            }
            //Prędkość Y
            if (ballSpeedY > 0 && ballSpeedY < 16) {
                ballSpeedY += 0.3;
            }
            else if (ballSpeedY < 0 && ballSpeedY > -16) {
                ballSpeedY -= 0.3;
            }
        }


        //Sztuczna Inteligencja

        function aiPosition () {

         var middlePaddle = aiY + paddleHeight/2;
         var middleBall = ballY + ballsize/2;
                 
           if (ballX > 500) {
               if (middlePaddle - middleBall > 200) {
                   aiY -= 20;
                }
                else if (middlePaddle - middleBall > 40) {
                    aiY -= 10;
                }
                else if (middlePaddle - middleBall < -200 ) {
                    aiY += 20;
                }
                else if (middlePaddle - middleBall > -40) {
                    aiY += 10;
                }
           } 

           else if (ballX <= 500 && ballX > 150 ) {
               if (middlePaddle - middleBall > 100) {
                   aiY -= 4
               }
               else if (middlePaddle -middleBall < -100) {
                   aiY += -4
               }

           }

           if (aiY>= ch - paddleHeight){
               aiY = ch - paddleHeight
           }
           if (aiY <= 0) {
               aiY=0;
           }
        }

        //Punktacja

        const playerScoreSpan = document.getElementById('playerScore');
        const aiScoreSpan = document.getElementById('aiScore');
        let playerScore = 0;
        let aiScore = 0;

        let winningScore = 10;

        let gamePaused = false;

        function addScore(){
            if (ballX<=playerX){
                aiScore++;
                aiScoreSpan.textContent = aiScore;
                resetBall();
                
            }
            if (ballX >= aiX){
                playerScore++;
                playerScoreSpan.textContent = playerScore;
                resetBall();
        
            }
        }

        function resetBall(){
            ballSpeedX=0;
            ballSpeedY=0;
            ballX = cw/2 - ballsize/2;
            ballY = ch/2 - ballsize/2;
            clickToMoveBall();

        }

        function clickToMoveBall() {
            canvas.addEventListener('click', play);
        }

        function play () {
            ballSpeedX = 5;
            ballSpeedY = 5;
        }

       





        
            
       
        
      

canvas.addEventListener("mousemove", playerPosition);

function game () {
            table()
            ball()
            player()
            ai()
            aiPosition()
            addScore()
           
        }


setInterval(game, 1000/60);
         
