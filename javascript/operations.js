var numbers = [];
var operations = [];
var result = "";
var nextOperand = false;
var KEY_CODES = {13:"=",32:"RESET",46:"C",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",106:"*",107:"+",109:"-",111:"/"};
var finalResult = "0";
var lastCharacter = "";
//Espacio = borrar, enter = resultado, suprimir = borrar


animationOFF = function(){
	document.getElementById("cover").style.animationPlayState="paused";
};

animationON = function(){
	document.getElementById("cover").style.animationPlayState="running";
};

function valid(){
	if((numbers[0]&&numbers[numbers.length-1]) !== "+" && (numbers[0]&&numbers[numbers.length-1]) !== "-" && (numbers[0]&&numbers[numbers.length-1]) !== "*" && (numbers[0]&&numbers[numbers.length-1]) !== "/"){
		return true;
	}
};

	
calculate = function (operand){
	//console.log(operand);

	if(operand !== "Mover tapa" && operand !== "Parar" && operand !== "RESET"){

		if(operand !== "=" && operand !== "C"){
			lastCharacter = operand;
		}

		if(operand === "="){
			if(!valid()){
				document.getElementById("result").innerHTML="Error";
			}else{
				
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
			}

		}else if(operand === "C"){

			console.log("Ultimo caracter a eliminar: "+lastCharacter);

			if(operations.length>0 || numbers.length>0){
				var lastNumber = numbers[numbers.length-1];
				var charArray = lastNumber.split("");

				if(operations[0] === lastCharacter){
					//console.log("Es igual el operador");
					operations.splice(0,operations.length);
					document.getElementById("result").innerHTML = "_";
				}else if(charArray[charArray.length-1] === lastCharacter){
					console.log("Es igual el numero");
					if(charArray.length === 1){//si solo hay uno lo elimino del array
						//console.log("Solo hay un numero");
						numbers.splice(0,numbers.length);
						document.getElementById("result").innerHTML = "_";
					}else{//si el numero es de mas de una cifra extraigo solo ese
						//console.log("cojo los numeros: "+numbers[numbers.length-1].substr(0,charArray.length-1));
						numbers[numbers.length-1] = numbers[numbers.length-1].substr(0,charArray.length-1);
						document.getElementById("result").innerHTML = numbers[numbers.length-1];
					}
				}
				
				lastCharacter = "";
			}
		}else{

			if(numbers.length<1){
				//console.log("inserto cuando hay 0");
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