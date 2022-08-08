

export const name = 'Ausias';
export const age: number = 25;
export const isValid: boolean = true;

export const templateString = ` Esto es un string 
multilinea
que puede tener
" dobles
' simple
inyectar valores ${name}
expresiones: ${ 1 + 1 }
números: ${age}
booleanos: ${isValid}
`;


console.log(templateString);