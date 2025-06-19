
// src/pages/CliqCareTopicPage.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CliqCarePage.css';
import { topicList, helpQuestions } from '../data/helpTopics.js';

export default function CliqCareTopicPage() {
  const { topic } = useParams();
  const selectedQuestions = helpQuestions[topic] || [];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="cliqcare-container">
      <aside className="cliqcare-sidebar">
        <h3>All Help Topics</h3>
        <ul>
          {topicList.map((item, index) => (
            <li key={index}>
              <span className="icon">{item.icon}</span>
              <div>
                <Link
                  to={`/cliqcare/topic/${encodeURIComponent(item.title)}`}
                  className={`topic-link ${item.title === topic ? 'active' : ''}`}
                >
                  <strong>{item.title}</strong>
                </Link>
                <div className="desc">{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="cliqcare-content">
        <div className="faq-header">
          <h3>All Help Topics</h3>
          <Link to="/cliqcare" className="back-link">
            Go Back to Previous Page
          </Link>
        </div>

        <div className="faq-topic-block">
          <h4>
            <strong>{topic}</strong>{" "}
            <span className="sub">(Browse all help topics related to {topic})</span>
          </h4>

          <ul className="faq-list">
            {selectedQuestions.map((faq, i) => (
              <li key={i} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(i)}
                >
                  {faq.question}
                </div>
                {openIndex === i && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}





// // src/pages/CliqCareTopicPage.js
// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import './CliqCarePage.css';

// const helpTopics = {
//   Shopping: [
//     "Why do I see different prices for the same product?",
//     "What does the term pre-order mean?",
//     "Can I cancel a pre-ordered item?",
//     "How do I know if a product will fit me?",
//     "Can you notify me once a product is back in stock?",
//     "My shipping address and billing address may be different. Will that be a problem?",
//     "What are the modes of delivery available?",
//     "How do I find out if Tata CLiQ delivers to my location?",
//     "How do I find out about delivery charges?",
//     "Will all brand/sellers on Tata CLiQ ship to the area I live in?",
//     "Why does the delivery time vary from brand/seller to brand/seller?",
//     "Do you deliver internationally?",
//     "Can I request different items from my bag to be delivered separately?",
//     "My schedule is fully booked. Can I choose a specific date and time for delivery?",
//     "Can I choose a specific date and time to collect a Tata CLiQ order from the store?",
//     "Why is the Cash on Delivery (COD) payment option not available at my location?"
//   ],
//   // Add other topics when needed, like:
//   // Payments: [...],
//   // Returns: [...],
// };

// export default function CliqCareTopicPage() {
//   const { topic } = useParams();
  

//   return (
//     <div className="cliqcare-content">
//       <section className="faq-section">
//         <div className="faq-header">
//           <h3>All Help Topics</h3>
//           <Link to="/cliqcare" className="back-link">Go Back to Previous Page</Link>
//         </div>

//         {Object.keys(helpTopics).map((section) => (
//           <div key={section} className="faq-topic-block">
//             <h4>
//               <strong>{section}</strong>{" "}
//               <span className="sub">(Browse all help topics related to {section})</span>
//             </h4>
//             <ul className="faq-list">
//               {helpTopics[section].map((question, index) => (
//                 <li
//                   key={index}
//                   className={section === topic ? 'highlighted' : ''}
//                 >
//                   {question}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }
