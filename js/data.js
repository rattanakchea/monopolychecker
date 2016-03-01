var alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '?', '$'
];

var prizes = [
	'$100,000 Cash or Luxury Car (15)',
	'$50,000 Home Makeover (25)',
	'$35,000 of Vehicle (25)',
	'$20,000 College Tuition (40)',
	'$10,000 Jet Ski (50)',
	'$10,000 Family Vacation (50)'
]


var alphabets = [];

//String.fromCharCode(65, 66, 67);  // "ABC"
function getChar(number){
	return String.fromCharCode(number);
}

var start = 500;
var startingChar = 65;

function buildData() {
	//group with 4 count
	var i = 0;
    for (; i < 6; i++){
    	var obj = {
    		group: getChar(startingChar++),
    		count: 5
    	}
    	alphabets.push(obj)
    }

    //group with 4 count
    for (; i < 26; i++){
    	var obj = {
    		group: getChar(startingChar++),
    		count: 4
    	}
    	alphabets.push(obj)
    }
}

function buildData2() {
    for (var i=0; i < alphabets.length; i++){
    	
    	alphabets[i].entries = [];

    	for (var j=0; j < alphabets[i].count; j++){

    		if (alphabets[i].group == 'E'){
    			start++;
    		}
    		
    		alphabets[i].entries.push(alphabets[i].group + (start++) +  getChar(65 + j))
    	}
    	console.log(alphabets[i]);
    }
}

buildData();
buildData2();


//console.log(alphabets);
