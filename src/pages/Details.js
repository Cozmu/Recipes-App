import React from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const { idDaReceita } = useParams();
  console.log(idDaReceita);
  return (
    <div>Details</div>
  );
}

export default Details;
