var alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

var prizes = [
    '$100,000 Cash or Luxury Car (15)',
    '$50,000 Home Makeover (25)',
    '$35,000 of Vehicle (25)',
    '$20,000 College Tuition (40)',
    '$10,000 Jet Ski (50)',
    '$10,000 Family Vacation (50)',
    '$25 Gift Card (10,000)',
    '$15 Grocery Gift Card (15,000)',
    '$10 Grocery Gift Card (35,000)',
    '$5 Grocery Gift Card (200,000)',
    '$25 Grocery Gift Card (10,000)',
    '$25 Cash (10,000)',
    '$50 Grocery Gift Card (5,000)',
    '$78 Redbox Movies for a Year (1,750)',
    '$100 Grocery Gift Card (1,500)',
    '$100 Cash (1,500)',
    '$200 Family Picnic (750)',
    '$200 Cash (750)',
    '$500 Spa Treatment (350)',
    '$1,000 Weekend Getaway (100)',
    '$1,000 Grocery Gift (100)',
    '$1,000 Cash (100)',
    '$1,500 LED HD TV (75)',
    '$2,500 BigJoe Grill & Grocery (75)',
    '$5,000 Groceries (50)',
    '$5,000 Cash (50)',
    '$1,000,000 Cash (3)',
    '$500,000 Vacation Home (3)'
];

var colors = [
    { blue: '#30A9DE' },
    { green: '#3ac569' },
    { yellow: '#fbd14b' },
    { pink: '#ed317f' },
    { lightblue: '#a5dff9' },
    { brown: '#cb7575' },
    { red: '#E71D36' },
    { orange: '#F17F42' }
]


var alphabets = [];

//String.fromCharCode(65, 66, 67);  // "ABC"
function getChar(number) {
    return String.fromCharCode(number);
}

var start = 500;
var startingChar = 65;

function addData(num, count) {
    var char = null;
    if (num == '?' || num == '$'){
        char =  num;
    } else {
        char = getChar(num);
    }

    var obj = {
        group: char,
        count: count,
        entries: []
    };
    alphabets.push(obj)
}

function buildData() {
    //group with 4 count
    var i = 0;
    for (; i < 6; i++) {
        addData(startingChar++, 5);
    }

    //group with 4 count
    for (; i < 26; i++) {
        addData(startingChar++, 4);
    }
}

function buildData2() {
    var flag = false;

    for (var i = 0; i < alphabets.length; i++) {
        for (var j = 0; j < alphabets[i].count; j++) {   
            if (alphabets[i].group == 'E' && !flag) {
                start++;
                flag = true;
            }
            alphabets[i].entries.push(alphabets[i].group + (start++) + getChar(65 + j))
        }
        
    }

   addData('$', 8);
    for (var j = 0; j < alphabets[26].count; j++) {
            alphabets[26].entries.push(alphabets[26].group + (start++) + getChar(65 + j))
        }

   addData('?', 8);
   for (var j = 0; j < alphabets[27].count; j++) {
            alphabets[27].entries.push(alphabets[27].group + (start++) + getChar(65 + j))
        }

   console.log(alphabets);
}

buildData();
buildData2();


//console.log(alphabets);
