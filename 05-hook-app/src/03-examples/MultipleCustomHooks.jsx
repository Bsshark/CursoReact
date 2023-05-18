import { useFetch, useCounter } from "../hooks";
import { LoadingQuote, Quote } from "./index";

export const MultipleCustomHooks = () => {

    const {counter, increment, decrement, reset} = useCounter(0);

    const { data, isLoading, hasError } = useFetch('https://api.breakingbadquotes.xyz/v1/quotes/10');

    const { author, quote } = !!data && data[counter];
  return (
    <>
        <h1>Breaking Bad Quotes</h1>
        <hr/>

        {
          isLoading ? 
          <LoadingQuote /> :
          <Quote author={author} quote={quote} />
        }

        <button 
          className='btn btn-primary' 
          disabled={isLoading}
          onClick={() => increment()}>
          Next quote
        </button>

    </>
  )
}

//La api original no iba