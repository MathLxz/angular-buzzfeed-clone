import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questios from '../../../assets/data/quizz_questions.json';
@Component({
	selector: 'app-quiz',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './quiz.component.html',
	styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
	title: string = 'ASDASDASD';

	questions: any;
	questionSelected: any;

	answers: string[] = [];
	answerSelected: string = '';

	questionIndex: number = 0;
	questionMaxIndex: number = 0;

	finished: boolean = false;

	constructor() {}
	ngOnInit(): void {
		if (quizz_questios) {
			this.finished = false;
			this.title = quizz_questios.title;
			this.questions = quizz_questios.questions;
			this.questionSelected = this.questions[this.questionIndex];

			this.questionIndex = 0;
			this.questionMaxIndex = this.questions.length;
		}
	}

	playerChoose(value: string) {
		this.answers.push(value);
		this.nextStep();
	}

async	nextStep() {
		this.questionIndex += 1;

		if (this.questionMaxIndex > this.questionIndex) {
			this.questionSelected = this.questions[this.questionIndex];
		} else {
			const finalAnswer: string = await this.checkResult(this.answers)
			this.finished = true;
			this.answerSelected = quizz_questios.results[finalAnswer as keyof typeof quizz_questios.results]
		}
	}

	async checkResult(answers: string[]) {
		const result = answers.reduce((previous, current, i, arr) => {
			if (
				arr.filter((item) => item === previous).length >
				arr.filter((item) => item === current).length
			) {
				return previous;
			} else {
				return current;
			}
		});
		return result;
	}
}
