import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Pagination } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines',
          {
            params: {
              country: 'us',
              apiKey: '018856741e374777b96c86ce211500a2',
            },
          }
        );

        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

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
      <h1 className="mb-4">Top Headlines</h1>
      <div className="row">
        {currentArticles.map((article) => (
          <div key={article.title} className="col-md-4 mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={article.urlToImage || 'https://via.placeholder.com/150'}
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
                <Button id='share-button'
                  variant="success"
                  onClick={() => shareToWhatsApp(article.url)}
                  className="ml-5"
                >
                  <FaWhatsapp /> Share
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Pagination className="mt-4">
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

export default News;