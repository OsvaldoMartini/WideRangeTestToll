import React from 'react';
import {IMarca, IPatente} from '../../app/models/searchINPI';


interface Props{
    busca: IMarca| IPatente
}

export default function MarcasDetails({busca}: Props){
    return ( 
    <div key={busca.number}>
        <span>{busca.number}</span>
        <br/>
        <span>{busca.agent}</span>
        <button onClick={() => busca.searchColidences('Martini')}>Click</button>
      </div>
      )

}