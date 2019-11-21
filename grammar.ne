prgm -> statement | statement  optionalWhiteSpace ";" optionalWhiteSpace statement  optionalWhiteSpace
statement -> function | definition

definition -> function ":=" function

function -> arg "(" args ")"
args -> arg | arg optionalWhiteSpace ","  optionalWhiteSpace args

arg -> var | number | function

expr -> boolExpr

boolExpr -> notExpr optionalWhiteSpace | boolExpr "AND" boolExpr | boolExpr "OR" boolExpr
notExpr -> compare optionalWhiteSpace | "NOT" notExpr
compare -> sum optionalWhiteSpace | compare "=" compare | compare "!=" compare | compare "<" compare | compare ">" compare | compare "<=" compare | compare ">=" compare
sum -> factor | stringLiteral | sum "+" sum | sum "-" sum
factor -> power optionalWhiteSpace | factor "*" factor | factor "/" factor
power -> number optionalWhiteSpace | power "^" power

var -> string | string number | string symbol | string var
stringLiteral -> "'" string "'"
optionalWhiteSpace -> null | whiteSpace optionalWhiteSpace
whiteSpace -> " " | "\t" | "\n"
string -> ascii | ascii string {%
    function(data) {
        return data.join("");
    }
%}
ascii -> symbol | lowerCaseChar | upperCaseChar {%
    function(data) {
        return data.join("");
    }
%}
symbol -> "!" | "@" | "#" | "$" | "%" | "^" | "&" | "?" | ">" | "<" | "_"
lowerCaseChar -> "a" | "b" | "c" | "d" |"e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
upperCaseChar -> "A" | "B" | "C" | "D" |"E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
number -> int | int "." int | "." int | "-" number {%
    function(data) {
        return data.join("");
    }
%}
int -> digit | digit int {%
    function(data) {
        return data.join("");
    }
%}
digit -> "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
