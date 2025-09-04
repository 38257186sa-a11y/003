/* 
  Default question bank.
  - Structure: topics -> array of question objects
  - Each question: { q: "text", opts: ["a","b","c"], ans: index, explanation: "optional" }
  Edit this file to add topics and questions.
*/
const QUESTION_BANK = {
  "Political Theory": [
    {
      q: "Who is often regarded as the father of Political Science?",
      opts: ["Plato","Aristotle","Rousseau","Hobbes"],
      ans: 1,
      explanation: "Aristotle's systematic study of constitutions and politics earned him this title."
    },
    {
      q: "Which thinker developed the idea of the 'general will'?",
      opts: ["John Locke","Jean-Jacques Rousseau","Jeremy Bentham","John Stuart Mill"],
      ans: 1,
      explanation: "Rousseau wrote about the 'general will' in 'The Social Contract'."
    }
  ],

  "Indian Politics": [
    {
      q: "Which Article of the Indian Constitution lists the Fundamental Duties?",
      opts: ["Article 19","Article 21A","Article 51A","Article 368"],
      ans: 2,
      explanation: "Article 51A (added by the 42nd Amendment) lists Fundamental Duties."
    },
    {
      q: "Who chaired the Drafting Committee of the Indian Constitution?",
      opts: ["Jawaharlal Nehru","Dr. B.R. Ambedkar","Rajendra Prasad","Sardar Patel"],
      ans: 1,
      explanation: "Dr. B. R. Ambedkar was the chairman of the Drafting Committee."
    }
  ],

  "International Relations": [
    {
      q: "Which scholar is associated with the classical realism tradition in IR?",
      opts: ["Immanuel Kant","Hans Morgenthau","Karl Marx","Alexander Wendt"],
      ans: 1,
      explanation: "Hans Morgenthau is a central figure in classical realism."
    },
    {
      q: "Which organization replaced the League of Nations after WWII?",
      opts: ["World Trade Organization","United Nations","International Monetary Fund","World Bank"],
      ans: 1,
      explanation: "The United Nations was established in 1945, replacing the League of Nations."
    }
  ]
};

// Export for script.js (browser global)
window.QUESTION_BANK = QUESTION_BANK;
