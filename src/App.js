import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Grid, Card, Icon, Image, Label, Item, Message, Segment, Loader, Dimmer, Progress, Button } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller';

var pagesize=10;

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			hasMoreItems: true,
            nextHref: null,
			pagenumber: 1,
			loading: true
		};
	}

	componentDidMount() {
	  
		
	}

	loadItems(pagenumber) {
		//alert('in loadItems');
        var self = this;

        var url = 'http://localhost:4200/restaurants/searchpagination';
       

		axios.post(url,  {
    pagenumber: this.state.pagenumber,
    pagesize: pagesize
  })
      .then(res => {
		  console.log('response:'+res.data);
		  if(res.data.length<1) {
			  this.setState({ loading: false , hasMoreItems: true});
			  console.log(this.state.restaurants);
		  } else {
			  var valueArray = this.state.restaurants;
			  res.data.forEach(element => {
				valueArray.push(element);
			  });
			this.setState({ restaurants: valueArray, loading: false , hasMoreItems: true, pagenumber: this.state.pagenumber+1 });
			console.log(this.state.restaurants);
		  }
		})
	   .catch(error => {
	   console.log('error:'+error);
	 });
	 
       
    }

    render() {
        const loader = <div className="loader">Loading ...</div>;

        var items = [];
		
		{this.state.restaurants.length > 0 && 
        
		
		this.state.restaurants.map((restaurant, i) => {
            items.push(
					
					<div className="container">
                    <Segment color='teal'>
				
				
							
	
							<div>
								<div className="floatLeft">
									<Image src='http://www.clker.com/cliparts/E/y/s/j/w/U/home-icon-md.png' size="tiny" className="image"/>
								</div>
								<div className="name">
									<span>{restaurant.name}</span>
								</div>
							</div>
	
							<div className="row">
								<div className="fieldTitle">Food:</div><div className="fieldValue">{restaurant.title}</div>
							</div>
							<div className="row">
								<div className="fieldTitle">Speciality:</div><div className="fieldValue">{restaurant.highlight}</div>
							</div>
							<div className="row">
								<div className="fieldTitle">Location:</div>
								<div className="fieldValue">
								{restaurant.address.address1} {restaurant.address.address2} {restaurant.address.city}
								{restaurant.address.state} {restaurant.address.zip} {restaurant.address.country}
								</div>
							</div>
					
					</Segment>
                </div>
            );
        });
		
		}

        return (
		    
			<div>
			<div className="jumbotron">
			Restaurants
			</div>
			<div className="restaurantContainer">
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>

                <div className="tracks">
                    {items}
                </div>
            </InfiniteScroll>
			</div>
			</div>
        );
    }
};

export default App;
