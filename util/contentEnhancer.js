// Content enhancement utility for adding rich HTML content to articles
import { getAllArticles } from './articleUtils';

// Sample images for different categories
const categoryImages = {
  Gaming: ['/assets/img/blog/blog01.jpg', '/assets/img/blog/blog02.jpg', '/assets/img/blog/blog03.jpg'],
  Tech: ['/assets/img/blog/blog04.jpg', '/assets/img/blog/blog05.jpg', '/assets/img/blog/blog06.jpg'],
  Movie: ['/assets/img/blog/blog07.jpg', '/assets/img/blog/blog08.jpg', '/assets/img/blog/blog09.jpg'],
  Sports: ['/assets/img/blog/blog10.jpg', '/assets/img/blog/blog11.jpg', '/assets/img/blog/blog12.jpg'],
  Lifestyle: ['/assets/img/blog/blog13.jpg', '/assets/img/blog/blog14.jpg', '/assets/img/blog/blog15.jpg'],
  Travel: ['/assets/img/blog/blog16.jpg', '/assets/img/blog/blog17.jpg', '/assets/img/blog/blog18.jpg'],
  Interior: ['/assets/img/blog/blog19.jpg', '/assets/img/blog/blog20.jpg', '/assets/img/blog/blog21.jpg'],
  Technology: ['/assets/img/blog/blog22.jpg', '/assets/img/blog/blog23.jpg', '/assets/img/blog/blog24.jpg'],
  NFT: ['/assets/img/blog/blog25.jpg', '/assets/img/blog/blog26.jpg', '/assets/img/blog/blog27.jpg'],
  Minimal: ['/assets/img/blog/blog28.jpg', '/assets/img/blog/blog29.jpg', '/assets/img/blog/blog30.jpg']
};

// Sample data for tables
const sampleTables = {
  Gaming: {
    title: "Gaming Industry Statistics 2024",
    headers: ["Platform", "Market Share", "Revenue (Billions)", "Growth Rate"],
    rows: [
      ["Mobile Gaming", "45%", "$92.2", "+12%"],
      ["PC Gaming", "30%", "$40.5", "+8%"],
      ["Console Gaming", "25%", "$52.1", "+5%"]
    ]
  },
  Tech: {
    title: "Technology Trends Analysis",
    headers: ["Technology", "Adoption Rate", "Investment (Billions)", "Market Impact"],
    rows: [
      ["Artificial Intelligence", "78%", "$180.5", "High"],
      ["Cloud Computing", "85%", "$95.2", "Very High"],
      ["Blockchain", "45%", "$12.8", "Medium"],
      ["IoT", "62%", "$28.9", "High"]
    ]
  },
  Movie: {
    title: "Box Office Performance 2024",
    headers: ["Genre", "Average Revenue", "Top Performer", "Market Share"],
    rows: [
      ["Action", "$450M", "Superhero Blockbuster", "35%"],
      ["Comedy", "$280M", "Family Comedy", "22%"],
      ["Drama", "$320M", "Award Winner", "25%"],
      ["Horror", "$180M", "Psychological Thriller", "18%"]
    ]
  },
  Sports: {
    title: "Sports Industry Revenue",
    headers: ["Sport", "Global Revenue", "Top League", "Fan Base"],
    rows: [
      ["Football", "$4.6B", "Premier League", "3.5B"],
      ["Basketball", "$8.8B", "NBA", "2.2B"],
      ["Tennis", "$2.1B", "Wimbledon", "1.0B"],
      ["Cricket", "$1.6B", "IPL", "2.5B"]
    ]
  }
};

// Sample quotes for different categories
const categoryQuotes = {
  Gaming: [
    { text: "The future of gaming lies not in better graphics, but in creating more meaningful experiences that connect players across the globe.", author: "Dr. Sarah Chen, Gaming Technology Researcher" },
    { text: "Gaming is the only medium that allows for true interactivity and player agency in storytelling.", author: "Marcus Johnson, Game Designer" }
  ],
  Tech: [
    { text: "Technology is best when it brings people together and makes complex things simple.", author: "Alex Thompson, Tech Innovator" },
    { text: "The future belongs to those who understand that technology is not just about devices, but about human connection.", author: "Dr. Emily Rodriguez, AI Researcher" }
  ],
  Movie: [
    { text: "Cinema is a mirror that reflects our society, our dreams, and our fears.", author: "Martin Scorsese, Director" },
    { text: "Movies have the power to transport us to different worlds and make us feel emotions we never knew existed.", author: "Steven Spielberg, Director" }
  ],
  Sports: [
    { text: "Sports have the power to change the world. It has the power to inspire, it has the power to unite people.", author: "Nelson Mandela" },
    { text: "The difference between the impossible and the possible lies in a person's determination.", author: "Tommy Lasorda, Baseball Manager" }
  ]
};

// Generate rich HTML content for an article
export const generateRichContent = (article) => {
  const category = article.category || 'Tech';
  const images = categoryImages[category] || categoryImages.Tech;
  const table = sampleTables[category] || sampleTables.Tech;
  const quotes = categoryQuotes[category] || categoryQuotes.Tech;
  
  // Randomly select elements
  const selectedImages = images.slice(0, Math.floor(Math.random() * 3) + 1);
  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  let content = `<h2>${article.title}</h2>`;
  
  // Introduction paragraph
  content += `<p>${article.excerpt || 'This comprehensive article explores the latest developments and trends in this fascinating field. Our analysis provides valuable insights and expert perspectives on current market conditions and future prospects.'}</p>`;
  
  // First image
  if (selectedImages[0]) {
    content += `<img src="${selectedImages[0]}" alt="${article.title}" style="width: 100%; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">`;
  }
  
  // Main content section
  content += `<h3>Key Developments and Insights</h3>`;
  content += `<p>The industry has witnessed unprecedented growth and transformation in recent years. This evolution has been driven by several key factors that are reshaping the landscape and creating new opportunities for innovation and growth.</p>`;
  
  // List of key points
  content += `<h4>Major Trends Shaping the Industry:</h4>`;
  content += `<ul>`;
  content += `<li><strong>Digital Transformation:</strong> Companies are rapidly adopting new technologies to stay competitive</li>`;
  content += `<li><strong>Consumer Behavior Changes:</strong> Shifting preferences are driving market evolution</li>`;
  content += `<li><strong>Regulatory Updates:</strong> New policies are creating both challenges and opportunities</li>`;
  content += `<li><strong>Sustainability Focus:</strong> Environmental considerations are becoming central to business strategies</li>`;
  content += `<li><strong>Global Market Expansion:</strong> Emerging markets are driving significant growth</li>`;
  content += `</ul>`;
  
  // Second image
  if (selectedImages[1]) {
    content += `<img src="${selectedImages[1]}" alt="Industry Analysis" style="width: 100%; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">`;
  }
  
  // Data table
  content += `<h3>${table.title}</h3>`;
  content += `<table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); border-radius: 8px; overflow: hidden;">`;
  content += `<thead><tr style="background-color: #f8f9fa;">`;
  table.headers.forEach(header => {
    content += `<th style="padding: 12px 15px; border: 1px solid #ddd; text-align: left; font-weight: 600; color: #333;">${header}</th>`;
  });
  content += `</tr></thead><tbody>`;
  table.rows.forEach((row, index) => {
    const bgColor = index % 2 === 0 ? '#fff' : '#f8f9fa';
    content += `<tr style="background-color: ${bgColor};">`;
    row.forEach(cell => {
      content += `<td style="padding: 12px 15px; border: 1px solid #ddd; color: #333;">${cell}</td>`;
    });
    content += `</tr>`;
  });
  content += `</tbody></table>`;
  
  // Quote section
  content += `<blockquote style="border-left: 4px solid #007bff; padding: 20px; background: #f8f9fa; margin: 20px 0; border-radius: 0 8px 8px 0;">`;
  content += `<p style="margin: 0; font-style: italic; font-size: 1.1em; color: #333;">"${selectedQuote.text}"</p>`;
  content += `<footer style="margin-top: 10px; font-size: 0.9em; color: #666; font-weight: 600;">— ${selectedQuote.author}</footer>`;
  content += `</blockquote>`;
  
  // Third image
  if (selectedImages[2]) {
    content += `<img src="${selectedImages[2]}" alt="Future Outlook" style="width: 100%; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">`;
  }
  
  // Future outlook section
  content += `<h3>Future Outlook and Predictions</h3>`;
  content += `<p>Looking ahead, the industry is poised for continued growth and innovation. Several emerging trends are expected to shape the landscape in the coming years, presenting both opportunities and challenges for stakeholders.</p>`;
  
  // Numbered list for predictions
  content += `<h4>Key Predictions for the Next Decade:</h4>`;
  content += `<ol>`;
  content += `<li><strong>Technology Integration:</strong> Advanced technologies will become more seamlessly integrated into everyday operations</li>`;
  content += `<li><strong>Market Consolidation:</strong> We expect to see increased merger and acquisition activity as companies seek competitive advantages</li>`;
  content += `<li><strong>Consumer Empowerment:</strong> Users will have more control and customization options than ever before</li>`;
  content += `<li><strong>Global Connectivity:</strong> Cross-border collaboration and partnerships will become increasingly important</li>`;
  content += `<li><strong>Sustainable Practices:</strong> Environmental responsibility will become a core business requirement</li>`;
  content += `</ol>`;
  
  // Conclusion
  content += `<h3>Conclusion</h3>`;
  content += `<p>As we navigate through these exciting times of change and innovation, it's clear that the industry is evolving at an unprecedented pace. The opportunities for growth and development are immense, but they come with the responsibility to adapt and innovate continuously.</p>`;
  content += `<p>The key to success lies in understanding these trends, embracing change, and positioning oneself to take advantage of emerging opportunities. By staying informed and proactive, stakeholders can not only survive but thrive in this dynamic environment.</p>`;
  
  return content;
};

// Enhance all articles with rich content
export const enhanceAllArticles = () => {
  const articles = getAllArticles();
  return articles.map(article => ({
    ...article,
    content: generateRichContent(article)
  }));
};

// Enhance specific articles by IDs
export const enhanceArticlesByIds = (articleIds) => {
  const articles = getAllArticles();
  return articles.map(article => {
    if (articleIds.includes(article.id)) {
      return {
        ...article,
        content: generateRichContent(article)
      };
    }
    return article;
  });
};

// Enhance articles by category
export const enhanceArticlesByCategory = (category) => {
  const articles = getAllArticles();
  return articles.map(article => {
    if (article.category === category) {
      return {
        ...article,
        content: generateRichContent(article)
      };
    }
    return article;
  });
};

// Randomly enhance a percentage of articles
export const randomlyEnhanceArticles = (percentage = 0.3) => {
  const articles = getAllArticles();
  const enhancedCount = Math.floor(articles.length * percentage);
  const randomIndices = new Set();
  
  // Generate random indices
  while (randomIndices.size < enhancedCount) {
    randomIndices.add(Math.floor(Math.random() * articles.length));
  }
  
  return articles.map((article, index) => {
    if (randomIndices.has(index)) {
      return {
        ...article,
        content: generateRichContent(article)
      };
    }
    return article;
  });
};

