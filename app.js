const {createApp} = Vue;

createApp({
	data() {
		return{
			message : "Bonjour Vue Js !",
			//l'index nous permettra de savoir quel questionnaire nous sommes en train de traiter
			currentQuestionIndex : 0,
			player_score : 0,
			successMessage : "",
			selectedAnswer : null,
			
			questionary : [
				{
					id: 1,
					question: "Quelle est la capitale de la France ??",
					answers: {"Paris":true, "Londres":false, "Rome":false, "Berlin":false}
				},

				{
					id: 2,
					question:" Qui a écrit 'les Misérables' ?",
					answers: {"Victor Hugo":true, "Emile Zola":false, "Gustave Flaubert":false, "Charles Baudelaire":false}
	
				},

				{
					id: 3,
					question: "Quel est le plus grand océan du monde ?",
					answers: {"Pacifique":true, "Atlantique":false, "Indien":false, "Arctique":false}
				},

				{
					id: 4,
					question:"Dans quelle ville se trouve la statue de la liberté ?",
					answers: {"New York":true, "Los Angeles":false, "Washington":false, "Chicago":false}
				}
			],		
		}
	},

	computed: {
		currentQuestion(){
			return this.questionary[this.currentQuestionIndex];
		},
	},
	methods: {

		//fonction qui mélange le tableau (Fisher-Yates shuffle)

		shuffleArray(array){
			for (let i = array.length -1; i > 0; i--)
			{
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]]; // permutation des éléments

			}
			return array;
		},

		shuffleQuestionsAndAnswers(){
			this.questionary = this.shuffleArray(this.questionary);

			this.questionary.forEach(question => { 
				const shuffleAnswers = this.shuffleArray(Object.entries(question.answers));
				question.answers = Object.fromEntries(shuffleAnswers);

			});
		},

		

		//fonction qui permet de soumettre une réponse
		submitAnswer()
		{
			alert("Votre réponse a été soumise");
			if(this.selectedAnswer !== null)
			{
				const correct = this.currentQuestion.answers[this.selectedAnswer];
				if(correct)
				{
					this.player_score++;
					this.successMessage = "Bonne réponse !";				
				}
				else
				{
					this.successMessage = "Mauvaise réponse !";
				}
				// reset selectedAnswer
				this.selectedAnswer = null;

				if (this.currentQuestionIndex < this.questionary.length - 1)
				{
					this.currentQuestionIndex++;
				}
				else
				{
					this.successMessage = " Quiz terminé ! Votre score est de " + this.player_score + " / " + this.questionary.length;
				}
			}
		
			else
			{
				this.successMessage = "Veuillez choisir une réponse !";
			}
		}
	},

	mounted() {
		this.shuffleQuestionsAndAnswers();

	}
}).mount('#app');