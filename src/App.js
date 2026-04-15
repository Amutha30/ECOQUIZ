<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grade 1 Quiz App</title>

<style>
body {
  font-family: 'Comic Sans MS', sans-serif;
  background: linear-gradient(to right, #a1c4fd, #c2e9fb);
  text-align: center;
  padding: 10px;
}

h1 {
  color: #ff6f61;
}

.tabs button {
  padding: 10px;
  margin: 5px;
  border: none;
  background: #ffcc00;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.tabs button:hover {
  background: #ff9900;
}

.quiz-container {
  background: white;
  padding: 15px;
  border-radius: 15px;
  max-width: 600px;
  margin: auto;
  margin-top: 15px;
}

.question {
  font-size: 18px;
  margin: 10px 0;
}

.options button {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.options button:hover {
  background: #dff9fb;
}

.submit-btn {
  background: #28a745;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
}

.result {
  margin-top: 15px;
  font-size: 18px;
  color: #333;
}
</style>
</head>

<body>

<h1>🎓 Fun Quiz for Kids</h1>

<div class="tabs">
  <button onclick="loadQuiz('maths')">Maths</button>
  <button onclick="loadQuiz('evs')">EVS</button>
  <button onclick="loadQuiz('english')">English</button>
  <button onclick="loadQuiz('science')">Science</button>
  <button onclick="loadQuiz('telugu')">Telugu</button>
  <button onclick="loadQuiz('kannada')">Kannada</button>
  <button onclick="loadQuiz('tamil')">Tamil</button>
</div>

<div class="quiz-container">
  <div id="quiz"></div>
  <button class="submit-btn" onclick="submitQuiz()">Submit</button>
  <div class="result" id="result"></div>
</div>

<script>
let currentQuiz = [];
let answers = [];

// QUIZ DATA
const quizzes = {

maths: [
{q:"2 + 2 = ?", o:["3","4","5","6"], a:1},
{q:"5 - 3 = ?", o:["1","2","3","4"], a:1},
{q:"How many apples? 🍎🍎🍎", o:["2","3","4","5"], a:1},
{q:"Shape with 3 sides?", o:["Circle","Square","Triangle","Star"], a:2},
{q:"10 is greater than?", o:["12","15","5","20"], a:2}
],

evs: [
{q:"Which is a plant?", o:["Dog","Tree","Car","Chair"], a:1},
{q:"We drink?", o:["Sand","Water","Stone","Wood"], a:1},
{q:"Which is an animal?", o:["Cat","Table","Fan","Book"], a:0},
{q:"We breathe using?", o:["Legs","Hands","Nose","Eyes"], a:2},
{q:"Where do fish live?", o:["Land","Sky","Water","Tree"], a:2}
],

english: [
{q:"A for?", o:["Apple","Ball","Cat","Dog"], a:0},
{q:"Opposite of BIG?", o:["Tall","Small","Fast","Hot"], a:1},
{q:"Color of sky?", o:["Green","Blue","Red","Black"], a:1},
{q:"Plural of cat?", o:["Cats","Catss","Cates","Catz"], a:0},
{q:"Which is a vowel?", o:["B","C","A","D"], a:2}
],

science: [
{q:"Sun gives us?", o:["Water","Light","Food","Air"], a:1},
{q:"We see with?", o:["Ears","Eyes","Nose","Hands"], a:1},
{q:"Moon comes at?", o:["Morning","Night","Noon","Evening"], a:1},
{q:"Plants need?", o:["Water","Stone","Plastic","Metal"], a:0},
{q:"Animal that flies?", o:["Dog","Cat","Bird","Cow"], a:2}
],

telugu: [
{q:"What is Apple in Telugu? (సేపు)", o:["Banana అరటి","Apple సేపు","Mango మామిడి","Grapes ద్రాక్ష"], a:1},
{q:"Color Red in Telugu? (ఎరుపు)", o:["Blue నీలం","Red ఎరుపు","Green పచ్చ","Black నలుపు"], a:1},
{q:"Cat in Telugu? (పిల్లి)", o:["Dog కుక్క","Cat పిల్లి","Cow ఆవు","Lion సింహం"], a:1},
{q:"Hello in Telugu? (నమస్కారం)", o:["Bye బై","Hello నమస్కారం","Thanks ధన్యవాదాలు","Sorry క్షమించండి"], a:1},
{q:"Sun in Telugu? (సూర్యుడు)", o:["Moon చంద్రుడు","Sun సూర్యుడు","Star నక్షత్రం","Sky ఆకాశం"], a:1}
],

kannada: [
{q:"Apple in Kannada? (ಸೇಬು)", o:["Banana ಬಾಳೆ","Apple ಸೇಬು","Mango ಮಾವು","Grapes ದ್ರಾಕ್ಷಿ"], a:1},
{q:"Red in Kannada? (ಕೆಂಪು)", o:["Blue ನೀಲಿ","Red ಕೆಂಪು","Green ಹಸಿರು","Black ಕಪ್ಪು"], a:1},
{q:"Dog in Kannada? (ನಾಯಿ)", o:["Cat ಬೆಕ್ಕು","Dog ನಾಯಿ","Cow ಹಸು","Lion ಸಿಂಹ"], a:1},
{q:"Hello in Kannada? (ನಮಸ್ಕಾರ)", o:["Bye ಬೈ","Hello ನಮಸ್ಕಾರ","Thanks ಧನ್ಯವಾದ","Sorry ಕ್ಷಮಿಸಿ"], a:1},
{q:"Sun in Kannada? (ಸೂರ್ಯ)", o:["Moon ಚಂದ್ರ","Sun ಸೂರ್ಯ","Star ನಕ್ಷತ್ರ","Sky ಆಕಾಶ"], a:1}
],

tamil: [
{q:"Apple in Tamil? (ஆப்பிள்)", o:["Banana வாழை","Apple ஆப்பிள்","Mango மாம்பழம்","Grapes திராட்சை"], a:1},
{q:"Red in Tamil? (சிவப்பு)", o:["Blue நீலம்","Red சிவப்பு","Green பச்சை","Black கருப்பு"], a:1},
{q:"Cat in Tamil? (பூனை)", o:["Dog நாய்","Cat பூனை","Cow மாடு","Lion சிங்கம்"], a:1},
{q:"Hello in Tamil? (வணக்கம்)", o:["Bye பை","Hello வணக்கம்","Thanks நன்றி","Sorry மன்னிக்கவும்"], a:1},
{q:"Sun in Tamil? (சூரியன்)", o:["Moon நிலா","Sun சூரியன்","Star நட்சத்திரம்","Sky வானம்"], a:1}
]

};

function loadQuiz(subject){
  currentQuiz = quizzes[subject];
  answers = [];
  let quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  currentQuiz.forEach((q,i)=>{
    let html = `<div class="question">${i+1}. ${q.q}</div><div class="options">`;
    q.o.forEach((opt,j)=>{
      html += `<button onclick="select(${i},${j})">${opt}</button>`;
    });
    html += `</div>`;
    quizDiv.innerHTML += html;
  });

  document.getElementById("result").innerHTML="";
}

function select(qIndex, optIndex){
  answers[qIndex] = optIndex;
}

function submitQuiz(){
  let score = 0;

  currentQuiz.forEach((q,i)=>{
    if(answers[i] === q.a) score++;
  });

  let feedback = score >= 4 ? "🎉 Great job!" : "😊 Keep practicing!";

  document.getElementById("result").innerHTML =
    `Score: ${score}/5 <br>${feedback}`;
}
</script>

</body>
</html>
