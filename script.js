/* We use [] inside the "" cause we are calling for a data atribute.  */
const numbersButtons = document.querySelectorAll("[data-number]")
const operationsButtons = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")

const displayCurrentTextElement = document.querySelector("[data-display-current]")
const displayPreviousTextElement = document.querySelector("[data-display-previous]")

class Calculator {
  constructor(displayCurrentTextElement, displayPreviousTextElement) {
    this.displayCurrentTextElement = displayCurrentTextElement
    this.displayPreviousTextElement = displayPreviousTextElement
    this.clear()
  }

  /* Defining all the functions for the calculator */
  clear() {
    this.displayCurrent = ''
    this.displayPrevious = ''
    this.operation = undefined
    this.control = false
  }

  delete() {
    this.displayCurrent = this.displayCurrent.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.displayCurrent.includes(".")) return // Verify if we already have a dot, and dont let put another. 
    this.displayCurrent = this.displayCurrent.toString() + number.toString() //Convert to string and then append it
    this.control = false
  }

  chooseOperation(operation) {
    if (this.displayCurrent === '') return
    if (this.displayPrevious != '') {
      this.compute()
    }
    this.operation = operation
    this.control = false
    this.displayPrevious = `${this.displayCurrent} ${this.operation}`
    this.displayCurrent = ''
  }

  compute() {
    let operationResult
    let prev = parseFloat(this.displayPrevious)
    let curr = parseFloat(this.displayCurrent)
    // isNaN- Verify if the parameter is a number or not, bassicly...
    if (isNaN(prev) || isNaN(curr)) return


    switch (this.operation) {
      case  '+':
        operationResult = prev + curr
        break
      case '-':
        operationResult = prev - curr
        break
      case '*':
        operationResult = prev * curr
        break
      case '÷':
        operationResult = prev / curr
        break
      default:
        return
    }
    this.control = true
    this.saveCurrent = this.displayCurrent
    this.displayCurrent = operationResult.toString()
  }

  //Updates the display (Updating the constructor value)
  updateDisplay() {
    this.displayCurrentTextElement.innerText = this.displayCurrent
    if(this.control) {
      this.displayPreviousTextElement.innerText = `${this.displayPrevious} ${this.saveCurrent}`
    } else {
      this.displayPreviousTextElement.innerText = this.displayPrevious
    }
  }
}

const calculator = new Calculator(displayCurrentTextElement, displayPreviousTextElement)


allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

numbersButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText) /* Send the value to the function inside the class. This value is based forEach */
    calculator.updateDisplay() /* Just calls the function and occour after appendNumber */
  })
})

operationsButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// We dont need the forEach, cause this is a single element in the HTML
equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

