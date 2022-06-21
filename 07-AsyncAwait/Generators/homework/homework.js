function* fizzBuzzGenerator(max) {
  // Tu código acá:
  if(max){
    for(let i = 1; i <= max; i++){
      if(i % 3 === 0 && i % 5 === 0)yield 'Fizz Buzz';
      else if(i % 5 === 0)yield 'Buzz';
      else if(i % 3 === 0)yield 'Fizz';
      else{
        yield i;
      }
    }
  }else{
    let i = 1;
    while(true){
      if(i % 3 === 0 && i % 5 === 0)yield 'Fizz Buzz';
      else if(i % 5 === 0)yield 'Buzz';
      else if(i % 3 === 0)yield 'Fizz';
      else{
        yield i;
      }
      i++;
    }
  }
}

module.exports = fizzBuzzGenerator;
