import { useState } from 'react';

export function Jumbotron() {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      }
    });
    const data = await response.json();
    setJoke(data.joke);
  };

  const onFetchJoke = async () => {
    await fetchJoke();
  };

  return (
    <div className="p-3 mb-2 bg-body-tertiary rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Cartology</h1>
        <p className="col-md-8 fs-4">
          Meet {"'Cartology'"} - your virtual companion for a delightful digital
          shopping spree. This cart not only holds your items but also cracks
          jokes to keep you entertained while you shop.
        </p>
        <button
          onClick={onFetchJoke}
          className="btn btn-primary btn-lg"
          type="button"
        >
          {joke ? 'Another one!' : 'Make me laugh!'}
        </button>
        {joke && <p className="mt-3 fs-5">{joke}</p>}
      </div>
    </div>
  );
}
