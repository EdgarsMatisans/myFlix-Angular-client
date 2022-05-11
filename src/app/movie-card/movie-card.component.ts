import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'




@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any = null;
  constructor(public fetchApiData: FetchApiDataService) { }
  
ngOnInit(): void {
  this.getMovies();
  this.getCurrentUser();
}


//Get all movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
 
  

  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
       
     console.log(resp)
      const currentUser=resp.Username
      console.log(currentUser)
      const currentFavs=resp.FavouriteMovies
      console.log(currentFavs)

    });
  }
  addToUserFavs(id: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavMovie(id).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();
    });
        }
    DeleteFavs(id: string): void {
      console.log(id);
        this.fetchApiData.deleteFavMovie(id).subscribe((response: any) => {
        console.log(response);
      });
      
      }
   

}