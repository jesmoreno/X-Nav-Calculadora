var numbers = [];
var operations = [];
var result = "";
var nextOperand = false;
var KEY_CODES = {13:"=",32:"RESET",46:"C",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",106:"*",107:"+",109:"-",111:"/"};
var finalResult = "0";
var lastCharacter = "";
var lastCharacters = [];
//Espacio = borrar, enter = resultado, suprimir = borrar


animationOFF = function(){
	document.getElementById("cover").style.animationPlayState="paused";
};

animationON = function(){
	document.getElementById("cover").style.animationPlayState="running";
};
	
calculate = function (operand){
	//console.log(operand);

	if(operand !== "Mover tapa" && operand !== "Parar" && operand !== "RESET"){

		if(operand !== "=" && operand !== "C"){
			lastCharacters.push(operand);
			lastCharacter = lastCharacters[lastCharacters.length-1];
		}

		if(operand === "="){

			switch(operations[0]){
				case "+":
					finalResult = parseInt(numbers[0])+parseInt(numbers[1]);
					break;
				case "-":
					finalResult = parseInt(numbers[0])-parseInt(numbers[1]);
					break;
				case "*":
					finalResult = parseInt(numbers[0])*parseInt(numbers[1]);
					break;
				case "/":
					finalResult = (parseInt(numbers[0])/parseInt(numbers[1])).toFixed(3);
					break;
				default:
					break;
			}
			document.getElementById("result").innerHTML=finalResult;
			//vacio arrays de numeros y operaciones
			console.log("resultado: "+finalResult);
			numbers.splice(0,numbers.length);
			operations.splice(0,operations.length);
			//dejo en la primera posicion el resultado final
			numbers.push(finalResult.toString());
			lastCharacter = ""; 
		

		}else if(operand === "C"){

			console.log("Ultimo caracter a eliminar: "+lastCharacter);

			if(operations.length>0 || numbers.length>0){
				var lastNumber = numbers[numbers.length-1];
				var charArray = lastNumber.split("");

				if(operations[0] === lastCharacter){
					operations.splice(0,operations.length);
					document.getElementById("result").innerHTML = numbers[0];
				}else if(charArray[charArray.length-1] === lastCharacter){

					console.log("Es igual el numero");
					if(charArray.length === 1){

						if(numbers.length === 2){//elimino el numero 2 y el ultimo caracter será la operacion (+,-,* ó /)
 							numbers.splice(1,1);
							document.getElementById("result").innerHTML = operations[0];
						}else{//elimino el numero 1
							numbers.splice(0,1);
							document.getElementById("result").innerHTML = "0";
						}

					}else{//si el numero es de mas de una cifra extraigo solo ese

						numbers[numbers.length-1] = numbers[numbers.length-1].substr(0,charArray.length-1);
						document.getElementById("result").innerHTML = numbers[numbers.length-1];
					}
				}

				lastCharacters.splice(lastCharacters.length-1,1);//elimino el ultimo caracter de las lista
				if(lastCharacters){
					lastCharacter = lastCharacters[lastCharacters.length-1];//el ultimo caracter pasa a ser el anterior al eliminado
				}
			}
		}else{// si pulsan (+,-,*,/ ó un numero)
			console.log("a");
			if(numbers.length<1){//para insertar un primer numero negativo
				
				if(operand !== "*" || operand !== "/")
					document.getElementById("result").innerHTML=operand;
					numbers.push(operand);
			}else{
				//console.log("hay mas de 1");
				if( operand === "+" || operand === "-" || operand === "*" || operand === "/"){
					nextOperand = true;
					operations.push(operand);
					document.getElementById("result").innerHTML=operand;
				}else{
					if(nextOperand === true){
						numbers.push(operand);
						nextOperand = false;
					}else{
						var value = numbers[numbers.length-1].concat(operand);
						numbers[numbers.length-1]=value;
					}
					document.getElementById("result").innerHTML=numbers[numbers.length-1];
				}
			}
		}
	}else{
		if(operand === "RESET"){//reseteo la calculadora
			//vaciar array
			if(numbers.length>0){
				numbers.splice(0,numbers.length);
				operations.splice(0,operations.length);
			}
			finalResult = "0";
			lastCharacter = "";
			document.getElementById("result").innerHTML="0";
		}
	}

};

//leer de teclado
window.addEventListener('keydown',function(event) {
	//console.log(event.keyCode);
	if(KEY_CODES[event.keyCode]){
		calculate(KEY_CODES[event.keyCode]);
	}
});

//calcular con los botones
$("button").click(function(){
	var myOperand = $(this).text();
	calculate(myOperand);
});