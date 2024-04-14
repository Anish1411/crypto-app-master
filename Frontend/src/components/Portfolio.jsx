import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
    const [portfolioData, setPortfolioData] = useState(null);

    const fetchPortfolioData = async () => {
        try {
            const response = await axios.get('/portfolio');
            return response.data;
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchPortfolio = async () => {
            const data = await fetchPortfolioData();
            setPortfolioData(data);
        };
        fetchPortfolio();
    }, []);

    return (
        <div>
            {portfolioData ? (
                <div>
                    <h2>Welcome, {portfolioData.name}!</h2>
                    <p>Profit: ${portfolioData.profit}</p>
                    <p>Loss: ${portfolioData.loss}</p>
                    {/* Other portfolio details */}
                </div>
            ) : (
                <p>Loading portfolio data...</p>
            )}
        </div>
    );
};

export default Portfolio;
