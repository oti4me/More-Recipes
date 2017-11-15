import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Data from '../../../../server/mockapi/data';
import { getAllRecipe } from '../../actions/RecipeAction';

const header = ({ 
  headers: { 
    'x-access-token' : window.localStorage.userToken,
    authorization : window.localStorage.userToken 
  } 
});

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes : [],
      pages : 1,
      page : 1,
    };
  }

  componentDidMount(){
    this.getRecipes();
  }

  handleAddFavourite(e){
    e.preventDefault();
    console.log("handling adding favourite for recipe id ", e.target.dataset['id'], "for user with id ", this.props.user.userId );
    const userId = this.props.user.userId;
    const recipeId = e.target.dataset['id'];
    axios.post('/api/v1/users/'+userId+'/recipes', { recipeId : recipeId}, header)
    .then(res => {
      Materialize.toast("Added to favourite list", 3000, 'green');
    });
  }


  getRecipes(data={}){
    console.log(data);
    axios.get('/api/v1/recipes', data, header)
      .then(res => {
        console.log(res);
        this.setState({
          recipes : res.data.data,
          pages : res.data.pages
        });
      });
      //  .catch(error => {
      //    console.log(error.message);
        //  if(error.response.status === 400){
        //    console.log(error);
        //  }else if(error.response.status === 401){
        //    console.log(error);
        //  }else{
        //    console.log(error);
        //  }
  }

  handlePagination(e){
    e.preventDefault()
    let page = e.target.dataset['page'];
    this.setState({
      page : page
    });
    this.getRecipes({ page : page});
  }

  pagination(){
    let pages = [];
    for(let i = 1; i <= this.state.pages; i++){
      pages.push(
        <li className="" key={i}>
          <a href="" data-page={i} onClick={ this.handlePagination.bind(this)} className={this.state.page === i ? "color-green" : ''}>{i}</a>
        </li>
      ) 
    }
    return (
      pages.map( list =>{
        return list;
      })
    )
  }

  recipeList(){
    let recipeChunk = [];
    let chunkSize = 3;
    for(let i = 0; i < this.state.recipes.length; i+=chunkSize){
      recipeChunk.push(this.state.recipes.slice(i, i+chunkSize));
    }
    const i = 1;
     const Row = recipeChunk.map( chunk => {
      return (
      <div className="row" key={i+1}>
        { chunk.map(recipe => {
          return (
            <div className="col s12 m4 l4" key={recipe.id}>
              <div className="card">
                <div className="card-image">
                  <Link to={`/recipe/${recipe.id}`}>
                    <img src=""/>
                  </Link>
                  {
                      this.props.loggedIn.loggedIn ? <a href="" onClick={this.handleAddFavourite.bind(this)}  className="btn-floating halfway-fab waves-effect waves-light red">
                        <i data-id={recipe.id} className="material-icons color-green">favorite</i>
                      </a> : ""
                  }
                </div>
                <div className="card-content">
                <Link to={`/recipe/${recipe.id}`}>
                   <span className="card_title">{recipe.title}</span>
                </Link>
                 <p className="card-p">{ recipe.description}</p>
                 <hr/>
                 <span className="bold text-gray">By: { recipe.userId}</span>
               </div>
             </div>
           </div>
          );
        }) }
      </div>
      )
    });

    return Row;
  }

  render() {   
    return (
      <div className = "col s12 m10 l10" > <div className="row">
        <div className="col s12 m8 l8">
          <h3 className="h-title">Recent Recipes</h3>
        </div>
        <div className="col s12 m4 l4 top-margin-30">
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <input id="search" type="text"/>
            <label htmlFor="search">Enter Keyword</label>
          </div>
        </div>
      </div> < hr style = {{ borderTop: "1px solid #26a69a" }}/>

      

      < div className = "row" >
        { this.recipeList() }
      </div>

      <ul className="pagination" style={{ textAlign:"center"}}>
        <li className="disabled">
          <a href="#!">
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
          { this.pagination() }
        <li className="waves-effect disabled">
          <a href="#!">
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    recipes : state.recipes,
    loggedIn : state.auth.loggedIn,
    user : state.auth.user
 };
}


export default connect(mapStateToProps, {getAllRecipe})(RecipeList);
