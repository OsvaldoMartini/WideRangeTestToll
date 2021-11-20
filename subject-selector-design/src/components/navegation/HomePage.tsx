import React from "react";
import { CardMain} from "../../components/cards/CardMain";
import { Navbar } from "./Navbar";
import { cardMains } from "../../data";
import { ICardMain } from "../../@interfaces";
import { Grid, } from 'semantic-ui-react';
//import { Field } from 'react-final-form';

export const HomePage =() => {

 return ( 
    <div className="Desktop-HD-1440-Landing-Page">
      <Navbar open={true} toggleOpen={() => {}}/>
      <div className="Desktop-Bar-Space"/>
      <div className="grid grid-cols-10 gap-3 ">
        <div className="col-span-2"/>
        {cardMains.map((card:ICardMain) => (
                  <div>
                        <CardMain
                        key={card.id} title={card.title} onClick={card.onClick}/>
                  </div>   
                ))}
        <div className="col-span-2"/>
      </div>
    </div>

//   <div className="Desktop-HD-1440-Landing-Page"> 
//       <div className="container z-10 max-auto">
//         <Navbar open={true} toggleOpen={() => {}}/>
//         <div className="grid ui center aligned">
//           <div className="row ">
//               <div className="two wide column">ABC</div>
//               <div className="two wide column">DEF</div>
//               <div className="two wide column">GHI</div>
//               <div className="two wide column">JKL</div>
//               <div className="two wide column">MNO</div>
//               <div className="four wide column">PQR</div>
//             </div>
//         </div>
//         <Grid columns={6} divided>
//                   <Grid.Row>
//                   <Grid.Column>
//                       <label>Data do Pedido</label>
//                       {/* <Field
//                           component={DateInput}
//                           name='date'
//                           date={true}
//                           placeholder='Data-Pedido'
//                           value={marca.date}
//                         /> */}
//                     </Grid.Column>    
//                     <Grid.Column className="five wide column">
//                       <label>BCSS Select Finder Searche</label>
//                     </Grid.Column>
//                    </Grid.Row>
//                 </Grid>
//                 <Grid columns={6} divided>
//                   <Grid.Row>
//                   {cardMains.map((card:ICardMain) => (
//                       <Grid.Column>
//                         <CardMain
//                         key={card.id} title={card.title} onClick={card.onClick}/>
//                       </Grid.Column>   
//                   ))}
//                    </Grid.Row>
//                 </Grid>
      
//       <div className="z-20 divide-y-4 divide-black divide-opacity-25">
//       <div className="z-10 p-4 max-h-13 bg-blue_core_005_eb_8"></div>
//       <div className="grid grid-flow-col grid-cols-7 grid-rows-1 gap-4">
//       {cardMains.map((card:ICardMain) => (
//           <CardMain
//             key={card.id} title={card.title} onClick={card.onClick}/>
    
//         ))}
//       </div>
//       <div className="z-10 h-13 bg-grey_pale_e_8_edee dark:bg-gray-900 px-9">
//         {" "}
//     </div>
//     <div className="h-screen p-4 bg-grey_pale_e_8_edee"></div>
//     <div className="h-screen p-4 bg-grey_pale_e_8_edee"></div>
//     <div className="h-screen p-4 bg-grey_pale_e_8_edee"></div>
      
//     </div>
//     <div className="p-4">

//       <div className="h-screen p-4 bg-blue_core_005_eb_8"></div>
//       <div className="h-screen p-4 my-4 bg-gray-600 js-show-on-scroll"></div>

//       <div className="grid grid-cols-2 gap-4 my-4">
//         <div className="h-64 p-4 text-white bg-red-500 js-show-on-scroll">
//           <h1>Hello world</h1>
//         </div>

//         <div className="h-64 p-4 text-white bg-green-500 js-show-on-scroll">
//           <h1>Hello world</h1>
//         </div>
//       </div>

//       <div className="h-screen p-4 my-4 bg-gray-300 js-show-on-scroll"></div>
//       <div className="h-screen p-4 bg-gray-300 js-show-on-scroll"></div>

//     </div>
//     </div>
// </div>
 )
};
