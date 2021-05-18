import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API"
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import Details from "../components/Details";
import "./style.css"


class Search extends Component {
    state = {
        books : [],
        title: ""
    };

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        API.searchBooks(this.state.title)
            .then(res => {
                this.setState({
                    books : res.data.items ,
                    title : ""
                });
                
                console.log(this.state.books);
                
            })
            .catch(err => console.log(err)) ;               
    }

    handleSave = bookData => {
        API.saveBook(bookData)
            .then(res => console.log(res))
            .catch(err => console.log(err));

    }

    render(){
        return(
            <Container >
            <Row fluid>
                <Col size="12">
                    <Jumbotron>
                        <h1>Google Books Search</h1>
                        <p>Find your book today!</p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row fluid>
                <Col size="12">                    
                <Card heading="Google Books Search">
                    <SearchForm
                        value={this.state.title}
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                    />
                </Card>                   
                </Col>
            </Row>
            <Row fluid>
                <Col size="md-12">
                    {this.state.books.length ? (
                    <Card heading="Search Results">
                        {this.state.books.map(book => (
                        <Details
                            key={book.id}
                            title = {book.volumeInfo.title}
                            authors = {book.volumeInfo.authors}
                            image = {book.volumeInfo.imageLinks.thumbnail}
                            description = {book.volumeInfo.description}
                            link = {book.volumeInfo.infoLink}
                            handleSave = {()=> this.handleSave({
                                title: book.volumeInfo.title,
                                authors : book.volumeInfo.authors,
                                image : book.volumeInfo.imageLinks.thumbnail,
                                description : book.volumeInfo.description,
                                link : book.volumeInfo.infoLink
                            })}
                        />
                        ))}
                    </Card>
                    ) : (
                    <Card heading="Search Results"></Card>
                    )}
                </Col>
            </Row>
                
        </Container>
        );
    }
}

export default Search;