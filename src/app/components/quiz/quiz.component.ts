import { Component, OnInit } from '@angular/core';
import quiz_question from "../../../assets/data/quiz_questions.json"

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string = ""
  questions:any
  questionSelected:any
  questionIndex:number = 0
  questionMaxIndex:number = 0
  answers:string[] = []
  answerSelected:string[] = []
  finished:boolean = false
  img:string = ""

  constructor() {}
  
  ngOnInit(): void {
    if (quiz_question) {
      this.finished = false
      this.title = quiz_question.title
      this.questions = quiz_question.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value:string): void {
    this.answers.push(value)
    this.nextStep()
  }
 async nextStep() {
  this.questionIndex++;
  if(this.questionMaxIndex > this.questionIndex) {
    this.questionSelected = this.questions[this.questionIndex]
  } else {
    const finalAnswer:string = await this.checkResult(this.answers)
    this.finished = true
    this.answerSelected = quiz_question.results[finalAnswer as keyof typeof quiz_question.results];
    this.img = `assets/imgs/${this.answerSelected[0]}`
  }
 }
 async checkResult(answers:string[]) {
  const result = answers.reduce((previous, current, i, arr) => {
    if (
      arr.filter(item => item === previous).length > 
      arr.filter(item => item === current).length
    ) {
      return previous
    } else {
      return current
    }
  })
  return result
 }
}
