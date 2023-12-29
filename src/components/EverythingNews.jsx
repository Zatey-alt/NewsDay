import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Pagination, Form } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';

const EverythingNews = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const articlesPerPage = 6;

  useEffect(() => {
    // Check if news data exists in local storage
    const cachedNews = JSON.parse(localStorage.getItem('everythingNews'));

    if (cachedNews) {
      setNews(cachedNews);
    } else {
      fetchEverythingNews();
    }
  }, [searchQuery]);

  const fetchEverythingNews = async () => {
    try {
      const response = await axios.get('https://api.mediastack.com/v1/news', {
        params: {
          access_key: process.env.REACT_APP_MEDIASTACK_API_KEY,
          keywords: searchQuery,
        },
      });

      setNews(response.data.data);

      // Store news data in local storage
      localStorage.setItem('everythingNews', JSON.stringify(response.data.data));
    } catch (error) {
      console.error('Error fetching everything news:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page when a new search is made
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const shareToWhatsApp = (url) => {
    const message = `Check out this news article: ${url}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">News Stories</h1>
      <Form onSubmit={handleSearchSubmit} className="mb-4">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" id="search-button">
          Search
        </Button>
      </Form>
      <div className="row">
        {currentArticles.map((article) => (
          <div key={article.title} className="col-md-4 mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={article.image || 'https://via.placeholder.com/150'}
              />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Button
                  variant="dark"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
                <Button
                  id='share-button'
                  variant="success"
                  onClick={() => shareToWhatsApp(article.url)}
                  className="ml-2"
                >
                  <FaWhatsapp /> Share 
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Pagination className="mt-4 dark">
        {[...Array(Math.ceil(news.length / articlesPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

export default EverythingNews;
