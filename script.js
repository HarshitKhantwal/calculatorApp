class Calculator {
    constructor(prevOpText, currOpText) {
        this.prevOpText = prevOpText;
        this.currOpText = currOpText;
        this.clear();
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
     }
    appendNum(num) {
        if(num==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+num.toString();
    }
    chooseOp(operation) { 
        if(this.currentOperand==='')return
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }
   
    compute() { 
        let res
        const prev=parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr))return
        switch(this.operation){
            case '+':
                res=prev+curr
                break
            case '-':
                res=prev-curr
                break
            case '*':
                res=prev*curr
                break
            case '/':
                if(curr===0)
                {
                    res='Error!!'
                    break
                }
                res=prev/curr
                break
            default:
                return
        }
        this.currentOperand=res
        this.operation=undefined
        this.previousOperand=''
       

    }
    updateDisplay() {
        this.currOpText.innerText = this.currentOperand
        if(this.operation!=null){
            this.prevOpText.innerText=`${this.previousOperand} ${this.operation}`
        }
        else{
            this.prevOpText.innerText=''
        }
        
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton=document.querySelector("[data-delete]")
const prevOpText = document.querySelector("[data-previous-operand]");
const currOpText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(prevOpText, currOpText);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})