
window.onload = function() {
	$('#start-button').on('click', function(event) {
		selectQuestion();
	});

	$('#reset-button').on('click', function(event) {
		reset();
	});

	$('.btn-select').on('click', function(event) {
		var answerType = $(this).attr('data-answer');
		console.log("Funfou: " + answerType);

		if(answerType == "right") {
			correct++;
			$('#correct-answer').modal('show');
		} else {
			wrong++
			$('#wrong-answer').modal('show');
		}
		clearInterval(questionFlow);
		$('.timer').text('00:00');

	});

	$('.trans-modals').on('click', function(event) {
		selectQuestion();
	});
}


var questions = [{	question: "firstq", answer: "b"},
 				 {	question: "secondq", answer: "a"},
 				 {	question: "thirdq", answer: "c"},
 				 {	question: "fourthq", answer: "a"},
 				 {	question: "fifthq", answer: "b" },
 				 { 	question: "sixthq", answer: "a" },
 				 {	question: "seventhq", answer: "d"},
 				 { 	question: "eightq", answer: "d" },
 				 {	question: "ninthq", answer: "c" },
 				 {	question: "tenthq", answer: "d" } ];

var questionsAswered = [];
var questionFlow;
var correct = 0;
var wrong = 0;
var unanswered = 0;
var timerSeconds = 60;


function selectQuestion() {

	timerSeconds = 60;
	console.log("timerSeconds Select: "+ timerSeconds);

	questionFlow = setInterval(countReverse, 1000);

//selecting questions randomly
	if(questions.length !== 0) {
		var questionNumber = Math.floor(Math.random() * questions.length);
		console.log("questionNumber: "+questionNumber);

		var firstQuestion = questions[questionNumber].question;
		console.log("firstQuestion: "+firstQuestion);

		// $('#start-button').html('Next Question ==>');
		$('.timer').text(timeConverter(timerSeconds));

		$('#'+firstQuestion).modal('toggle');
		
//reorganizing the array for pick new questions every time
		questionsAswered.push(firstQuestion);
		questions.splice(questionNumber,1);
		console.log("questionsAswered: "+ questionsAswered);
		console.log("questions: "+ questions.length);
	}

	//showing final result after all questions
	else {
		$('#final-result').modal('toggle');
		$('#correct-final').text('Correct: ' + correct);
		$('#unanswered-final').text('Unanswered: ' +unanswered);
		$('#wrong-final').text('Wrong: ' + wrong);
		clearInterval(questionFlow);
	}



};

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  };

function countReverse() {
	var converted = timeConverter(timerSeconds);
	timerSeconds --;

	//Times up detection
	if(timerSeconds !== 0) {
		$('.timer').text(converted);
	} else {
		clearInterval(questionFlow);
		unanswered++;
		$('.question-modals').modal('hide');
		$('#unanswered-modal').modal('show');

	}

}

function reset() {
	questions = [{	question: "firstq", answer: "b"},
	 				 {	question: "secondq", answer: "a"},
	 				 {	question: "thirdq", answer: "c"},
	 				 {	question: "fourthq", answer: "a"},
	 				 {	question: "fifthq", answer: "b" },
	 				 { 	question: "sixthq", answer: "a" },
	 				 {	question: "seventhq", answer: "d"},
	 				 { 	question: "eightq", answer: "d" },
	 				 {	question: "ninthq", answer: "c" },
	 				 {	question: "tenthq", answer: "d" } ];

	questionsAswered = [];
	correct = 0;
	wrong = 0;
	unanswered = 0;
	selectQuestion();

}
