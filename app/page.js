"use client"
import Image from 'next/image'
import axios from 'axios'
import {useState , useEffect} from 'react'
import PokemonCard from '@/components/PokemonCard';
import PokemonNotification from '../components/PokemonNotification';



export default function Home() {

  const [pokemon,setPokemon] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false); 
  const [score, setScore] = useState(0); 
  const [guess,setGuess] = useState(''); 
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNotification, setShowNotification] = useState(false);


  const showWrongAnswerNotification = () => {
    setShowNotification(true);
  };

  const getPokemon = async () => {
    setLoading(true)

    try{
      const data = await axios.get("/api/pokemon")
      console.log(data)
      setPokemon(data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setIsError(true)
      setLoading(false)
    }

  }

  useEffect(() => {
    getPokemon();
  }, []); 

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!guess) ; 
    if (guess.toLowerCase() === currentPokemon.name) {
      setScore(score +1);
      setGuess(""); 
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
        getPokemon();
      }, 2000)
    } else {
      setGuess("");
      showWrongAnswerNotification();
    }
  }

  useEffect(() => {
    if (pokemon && !isError && !loading && pokemon.results) {
      console.log(pokemon.results);
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      setCurrentPokemon(pokemon.results[randomPokemon]); 
    }
  }, [pokemon]);

  useEffect(() => {
    console.log(currentPokemon);
  }, [currentPokemon])

  if (loading) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <img src="/images/loading_screen.gif" alt="Loading..." />
      </main>
    );
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"
  
    >

      {isError && (
        <div 
        className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
        role='alert'
        >
          <strong className='font-bold'>Error!</strong>
          <span className='block sm:inline'>
            Something went wrong. Please try again later.
          </span>
        </div>
      )}

      <h1 className='text-4xl font-bold'><b>WHO'S THAT POKEMON?</b> </h1>
      <h2 className='text-3xl font-bold'><b>SCORE: {score} </b></h2>
      <PokemonCard pokemon={currentPokemon} isCorrect={isCorrect} />
      <form
      className="w-full max-w-sm"
      onSubmit={handlesubmit} 
      style = {{ marginTop: "2rem" }}
      >

        <div className='flex items-center border-b py-2'>
        <input
  className="appearance-none bg-transparent border-none w-full text-white placeholder-white mr-3 py-1 px-2 leading-tight"
  type="text"
  placeholder="Enter here"
  aria-label="Full name"
  onChange={(e) => setGuess(e.target.value)}
  value={guess}
/>
          <button
          className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-800 rounded-full transition duration-300 ease-in-out'
          type="submit"
          >
            Submit
          </button>
          <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 mx-3 border border-red-800 rounded-full transition duration-300 ease-in-out"
          type="button"
          onClick={() => {
            setGuess(""); 
            getPokemon();
          }}
          >
            Skip
          </button>
        </div>

      </form>
      <PokemonNotification
  showNotification={showNotification}
  onClose={() => setShowNotification(false)} // Close the notification when needed
/>
    </main>
  )
}
