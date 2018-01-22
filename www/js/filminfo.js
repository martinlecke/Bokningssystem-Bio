class FilmInfo {

  constructor() {

    // this.showFilmInfo();
    // this.renderFilmInfo();
    //  $(window).resize(() => this.moveFilmDetails());


  }



  // // Change the order of items (only mobile) モバイルの時に、詳細の順番を変える   
  // moveFilmDetails() {
  //   let small = $(window).width() < 768;
  //   if(small) {
  //     $('.item1').insertAfter('.item3'); 
  //   }
  // }




  // // Modal　モダルを出現させる (filmクラスにこのメソッドを作ったら、breakpointでエラーがでた　→　filmクラスに書く？)
  // showFilmInfo() {
  //   let that = this;
  //   // this が　ボタンの場所（.modal-test)になってる？
  //   $(document).on('click', '.modal-test', function () {
  //     that.renderFilmInfo();
  //   });

  // }



  
//   findIndexNumber() {
//     $(document).on('click', '.modal-test', function () {
//       let text = $(this).parent().data('text');

//       for (let i = 0; i < app.movie.length; i++){
//    //     let removedItem = text.splice(i, 1 [0]);
//         if(app.movie[i].title === text) {
//      //     app.movie[i].splice(i-1, 0 removedItem  )
          
          
//         }
//       }
 
  
// 	renderFilmInfo();

// });
//   }





//   // !!!!!!!! 後で入れ替える
//   // !!!!!!!! id="film-info"の番号を増やさないといけない(data-taget大事)


//   renderFilmInfo() {

//     $('main #film-info').remove();
//     $('main').append(`
		
// 		<!-- test modal -start -->


// <!-- !!!!!!!!  Byta text till property -->
// <!-- !!!!!!!!  Modal länkas till films bilder -->


// <!-- Modal -->
// <div class="modal fade text-dark" id="film-info" tabindex="-1" role="dialog" aria-labelledby="film-infoLabel" aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">

//       <!-- Youtube trailer -->
//       <div class="modal-header d-flex justify-content-end">
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>

//       <div class="row">

//         <!-- !!!!!!!!!! Länken starwars bytas i films.json-->

//         <iframe class="col-12" id="trailer" width="560" height="315" src="https://www.youtube.com/embed/${app.movie[0].youtubeTrailers}"
//           frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

//         <!-- Image and films details -->
//         <div class="modal-body">
//           <div class="row mx-1 item-parent">
//             <div class="col-12 col-md-4 mb-5 item1">

//               <!-- !!!!!!!!!! skriv text i alt -->
//               <img src="/imgs/${app.movie[0].images}" alt="${app.movie[0].title}">

//               <div class="film-details mt-3">
//                 <div>
//                   <span class="font-weight-bold">Productionsår: </span>
//                   <span>${app.movie[0].productionYear}</span>
//                 </div>
//                 <div>
//                   <span class="font-weight-bold">Längd: </span>
//                   <span>${app.movie[0].length}</span>
//                 </div>
//                 <div>
//                   <span class="font-weight-bold">Genre: </span>
//                   <span>${app.movie[0].genre}</span>
//                 </div>
//                 <div>
//                   <span class="font-weight-bold">Språk: </span>
//                   <span>${app.movie[0].language}</span>
//                 </div>
//                 <div>
//                   <span class="font-weight-bold">Regissör: </span>
//                   <span>${app.movie[0].director}</span>
//                 </div>
//                 <div>
//                   <span class="font-weight-bold">Skådespelare: </span>
//                   <span>${app.movie[0].actors}</span>
//                 </div>
//               </div>
//             </div>

//             <!-- Discription & performances  -->
//             <div class="col-12 col-md-8 mb-3 item2">

//               <h1>${app.movie[0].title}</h1>
//               <p>${app.movie[0].description}</p>

//               <div class="mt-5 item3">
//                 <h3>Visningstider</h3>
//                 <ul class="pl-0">
//                   <hr>
//                   <!-- !!!!!!!!!  Länka <a href="#"> till boknings sida -->
//                   <li>
//                     <a href="#" class="text-dark">
//                       <div>
//                         <i class="fa fa-calendar" aria-hidden="true"></i>
//                         <span class="ml-2 font-weight-bold">Jan 19, 2018</span>
//                       </div>
//                       <div>
//                         <i class="fa fa-clock-o" aria-hidden="true"></i>
//                         <span>(Salong 2)</span>
//                         <span class="font-weight-bold ml-2">14:00</span>
//                         <span class="ml-5 float-right">
//                           <button type="button" class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="">
//                             Boka
//                           </button>
//                         </span>
//                       </div>
//                     </a>
//                   </li>
//                   <hr>
//                   <li>
//                     <!-- !!!!!!!!!  Länka <a href="#"> till boknings sida -->
//                     <a href="#" class="text-dark">
//                       <div>
//                         <i class="fa fa-calendar" aria-hidden="true"></i>
//                         <span class="ml-2 font-weight-bold">Jan 19, 2018</span>
//                       </div>
//                       <div>
//                         <i class="fa fa-clock-o" aria-hidden="true"></i>
//                         <span class="ml-2 font-weight-bold">14:00</span>
//                         <span>(Salong 2)</span>
//                         <span class="ml-5">
//                           <button type="button" class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="">
//                             Boka
//                           </button>
//                         </span>
//                       </div>
//                     </a>
//                   </li>
//                 </ul>

//               </div>

//             </div>
        
//           </div>
//         </div>
//       </div>
// 		</div>
// 		</div>
// 		</div>

//     <!-- test modal -end -->
		
		
		
// 	 	`);


//     // Show the modal
//     $('#film-info').modal();
//   }




}